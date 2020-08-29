import { Injectable } from "@angular/core";
import { Entity, Entities } from "../models/types";
import { DbService } from "./db.service";
import { AuthService } from "./auth.service";
import { BehaviorSubject } from 'rxjs';

const LEFT_BAR_WIDTH: number = 70;
const TOP_BAR_HEIGHT: number = 70;

@Injectable()
export class StorageService {
    public isFullWidth$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public notes$: BehaviorSubject<Entities.Note[]> = new BehaviorSubject([]);
    public leftBarWidth$: BehaviorSubject<string> = new BehaviorSubject(`${LEFT_BAR_WIDTH}px`);
    public topBarHeight$: BehaviorSubject<string> = new BehaviorSubject(`${TOP_BAR_HEIGHT}px`);

    constructor(public db: DbService, public authService: AuthService) {}

    public refresh(): void {
        this.db
            .readAll<Entities.Note>(Entity.note, this.authService.currentUser.login)
            .subscribe(data => (this.notes$.next(data)));
    }

    public toggleFullWidthMode(): void {
        this.isFullWidth$.next(!this.isFullWidth$.value);
    }
}
