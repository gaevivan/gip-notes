import { Injectable } from "@angular/core";
import { IDataItem, Entity } from "../models/types";
import { Observable, defer, throwError } from "rxjs";
import { take, map, tap, switchMapTo } from "rxjs/operators";
import * as uuidLib from "uuid";
import { AngularFireDatabase, AngularFireObject, AngularFireList } from "@angular/fire/database";

@Injectable()
export class DbService {
    constructor(public database: AngularFireDatabase) {}

    public readAll<T = IDataItem>(entity: Entity): Observable<T[]> {
        const listRef: AngularFireList<T> = this.database.list<T>(`${entity}`);
        return listRef.valueChanges().pipe(
            take(1),
            tap(result => console.log("readAll", entity, result))
        );
    }

    public deleteAll<T = IDataItem>(entity: Entity): Observable<T[]> {
        const listRef: AngularFireList<T> = this.database.list<T>(`${entity}`);
        const data$: Observable<T[]> = listRef.valueChanges();
        return data$.pipe(
            take(1),
            tap(() => listRef.remove()),
            tap(result => console.log("deleteAll", entity, result))
        );
    }

    public createItem<T = IDataItem>(entity: Entity, data: any): Observable<T> {
        const uuid: string = uuidLib.v4();
        const dataItemRef: AngularFireObject<T> = this.database.object<T>(`${entity}/${uuid}`);
        data.uuid = uuid;
        return defer(() => dataItemRef.set(data)).pipe(
            map(() => data),
            tap(result => console.log("createItem", entity, uuid, result))
        );
    }

    public readItem<T = IDataItem>(entity: Entity, uuid: string): Observable<T> {
        const dataItemRef: AngularFireObject<T> = this.database.object<T>(`${entity}/${uuid}`);
        return dataItemRef.valueChanges().pipe(
            take(1),
            tap(result => console.log("readItem", entity, uuid, result))
        );
    }

    public updateItem<T = IDataItem>(entity: Entity, data: any): Observable<T> {
        if (!data.hasOwnProperty("uuid")) {
            throwError("В качестве аргумента были поданы данные без идентификатора.");
        }
        const dataItemRef: AngularFireObject<T> = this.database.object<T>(`${entity}/${data.uuid}`);
        return defer(() => dataItemRef.update(data)).pipe(
            switchMapTo(dataItemRef.valueChanges().pipe(take(1))),
            tap(result => console.log("updateItem", entity, data.uuid, result))
        );
    }

    public deleteItem<T = IDataItem>(entity: Entity, uuid: string): Observable<T> {
        const dataItemRef: AngularFireObject<T> = this.database.object<T>(`${entity}/${uuid}`);
        const data$: Observable<T> = dataItemRef.valueChanges();
        return data$.pipe(
            take(1),
            tap(() => dataItemRef.remove()),
            tap(result => console.log("deleteItem", entity, uuid, result))
        );
    }
}
