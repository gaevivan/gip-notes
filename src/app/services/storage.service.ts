import { Injectable } from "@angular/core";
import { Entity } from "../models/types";
import { DbService } from "./db.service";
import { AuthService } from "./auth.service";

@Injectable()
export class StorageService {
    public notes: any[];
    public isFullWidth: boolean = false;

    constructor(public db: DbService, public authService: AuthService) {}

    public refresh(): void {
        this.db
            .readAll(Entity.note, this.authService.currentUser.login)
            .subscribe(v => (this.notes = v));
    }

    public toggleMode(): void {
        this.isFullWidth = !this.isFullWidth;
    }
}
