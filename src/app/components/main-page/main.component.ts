import { Component } from "@angular/core";
import { DbService } from "../../services/db.service";
import { Entity, Entities } from "../../models/types";
import { forkJoin } from "rxjs";
import { switchMap, switchMapTo, tap } from "rxjs/operators";
import * as moment from "moment";
import { COLORS } from "../../models/colors";

@Component({
    selector: "main-page",
    templateUrl: "./main.component.html"
})
export class MainComponent {
    public newItem: Entities.Note = {
        text: "",
        title: "",
        u_date: null,
        c_date: null
    };
    public items: any[];
    constructor(public db: DbService) {}

    public ngOnInit(): void {
        const newItems: Entities.Note[] = getRandomNotes();
        // this.db
        //     .deleteAll(Entity.note)
        //     .pipe(
        //         switchMapTo(forkJoin(newItems.map(v => this.db.createItem(Entity.note, v)))),
        //         switchMapTo(this.db.readAll(Entity.note)),
        //         tap(data => (this.items = data)),
        //         switchMap(() => {
        //             const newValue = { ...this.items[1], text: "Новый текст" };
        //             return this.db.updateItem(Entity.note, newValue);
        //         }),
        //         switchMapTo(this.db.readAll(Entity.note)),
        //         tap(data => (this.items = data))
        //     )
        //     .subscribe();
        this.db.readAll(Entity.note).subscribe(v => this.items = v);
    }

    public update(item: Entities.Note): void {
        this.db.updateItem(Entity.note, item).subscribe();
    }
}

function getRandomNotes(): Entities.Note[] {
    return new Array(10).fill(null).map((v, i) => ({
        title: `Заголовок ${i}`,
        text: `Текст ${i}`,
        u_date: moment().format("YYYY.MM.DDThh:mm:ss"),
        c_date: moment().format("YYYY.MM.DDThh:mm:ss"),
        color: COLORS[Math.floor(Math.random() * Math.floor(4))]
    }));
}
