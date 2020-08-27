import { Component, HostBinding } from "@angular/core";
import { DbService } from "../../services/db.service";
import { Entity, Entities } from "../../models/types";
import * as moment from "moment";
import { LoaderService } from "src/app/services/loader.service";
import { finalize, switchMapTo, tap, switchMap } from "rxjs/operators";
import { forkJoin } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { SidebarService } from "src/app/services/sidebar.service";
import { StorageService } from "src/app/services/storage.service";

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
        public sidebarService: SidebarService,
        public storageService: StorageService
    ) {}

    public ngOnInit(): void {
        // this.replaceByNew();
        this.getItems();
    }

    public setActive(item: Entities.Note): void {
        this.activeItem = item;
    }

    public replaceByNew(): void {
        const newItems: Entities.Note[] = getRandomNotes();
        this.db
            .deleteAll(Entity.note)
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

    public getItems(): void {
        this.db
            .readAll(Entity.note, this.authService.currentUser.login)
            .subscribe(v => (this.items = v));
    }

    public update(item: Entities.Note): void {
        this.db.updateItem(Entity.note, item).subscribe();
    }

    public create(): void {
        const newItem: Entities.Note = {
            text: this.newItem.text,
            title: this.newItem.title,
            u_date: moment().format("YYYY.MM.DDThh:mm:ss"),
            c_date: moment().format("YYYY.MM.DDThh:mm:ss"),
            color: null
        };
        this.db
            .createItem(Entity.note, newItem)
            .pipe(
                finalize(() => (this.newItem = getEmptyNote())),
                finalize(() => this.getItems())
            )
            .subscribe();
    }
}

function getRandomNotes(): Entities.Note[] {
    return new Array(10).fill(null).map((v, i) => ({
        title: `Заголовок ${i}`,
        text: `Текст ${i}`,
        u_date: moment(`2020.08.26T11:28:${10 + i}`, "YYYY.MM.DDThh:mm:ss").format(
            "YYYY.MM.DDThh:mm:ss"
        ),
        c_date: moment(`2020.08.26T11:28:${10 + i}`, "YYYY.MM.DDThh:mm:ss").format(
            "YYYY.MM.DDThh:mm:ss"
        ),
        color: null
    }));
}

function getEmptyNote(): Entities.Note {
    return {
        text: "",
        title: "",
        u_date: "",
        c_date: "",
        color: null
    };
}
