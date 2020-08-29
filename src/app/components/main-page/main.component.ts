import { Component } from "@angular/core";
import * as moment from "moment";
import { finalize, switchMapTo, tap, switchMap } from "rxjs/operators";
import { forkJoin } from "rxjs";
import { LoaderService } from "@services/loader.service";
import { AuthService } from "@services/auth.service";
import { StorageService } from "@services/storage.service";
import { DbService } from "@services/db.service";
import { Entity, Entities } from "@models/types";

@Component({
    selector: "main-page",
    templateUrl: "./main.component.html"
})
export class MainComponent {
    public activeItem: Entities.Note = null;
    public newItem: Entities.Note = getEmptyNote();
    public items: any[];
    public isFullWidth: boolean = false;

    constructor(
        public db: DbService,
        public loaderService: LoaderService,
        public authService: AuthService,
        public storageService: StorageService
    ) {}

    public ngOnInit(): void {
        // this.replaceByNew();
        // this.getItems();
        this.storageService.refresh();
    }

    public ngOnDestroy(): void {
        this.storageService.notes$.next([]);
    }

    public setActive(item: Entities.Note): void {
        this.activeItem = item;
    }

    public replaceByNew(): void {
        const newItems: Entities.Note[] = getRandomNotes(this.authService.currentUser.login);
        this.db
            .readAll(Entity.note)
            .pipe(
                switchMapTo(forkJoin(newItems.map(v => this.db.createItem(Entity.note, v)))),
                switchMapTo(this.db.readAll(Entity.note, this.authService.currentUser.login)),
                tap(data => (this.items = data)),
                switchMap(() => {
                    const newValue = { ...this.items[1], text: "Новый текст" };
                    return this.db.updateItem(Entity.note, newValue);
                }),
                switchMapTo(this.db.readAll(Entity.note, this.authService.currentUser.login)),
                tap(data => (this.items = data))
            )
            .subscribe();
    }

    public update(item: Entities.Note): void {
        this.db.updateItem(Entity.note, item).subscribe();
    }

    public delete(item: Entities.Note): void {
        this.db.deleteItem(Entity.note, item["uuid"]).pipe(tap(() => this.storageService.refresh())).subscribe();
    }

    public create(): void {
        const newItem: Entities.Note = {
            text: this.newItem.text,
            title: this.newItem.title,
            u_date: moment().format("YYYY.MM.DDThh:mm:ss"),
            c_date: moment().format("YYYY.MM.DDThh:mm:ss"),
            color: null,
            user: this.authService.currentUser.login
        };
        this.db
            .createItem(Entity.note, newItem)
            .pipe(
                finalize(() => (this.newItem = getEmptyNote())),
                finalize(() => this.storageService.refresh())
            )
            .subscribe();
    }
}

function getRandomNotes(user: string): Entities.Note[] {
    return new Array(10).fill(null).map((v, i) => ({
        title: `Заголовок ${i}`,
        text: `Текст ${i}`,
        u_date: moment(`2020.08.26T11:28:${10 + i}`, "YYYY.MM.DDThh:mm:ss").format(
            "YYYY.MM.DDThh:mm:ss"
        ),
        c_date: moment(`2020.08.26T11:28:${10 + i}`, "YYYY.MM.DDThh:mm:ss").format(
            "YYYY.MM.DDThh:mm:ss"
        ),
        color: null,
        user
    }));
}

function getEmptyNote(): Entities.Note {
    return {
        text: "",
        title: "",
        u_date: "",
        c_date: "",
        color: null,
        user: null
    };
}
