import { Injectable } from "@angular/core";
import { DbService } from "./db.service";
import { Entity, Entities } from "../models/types";
import { tap, map, finalize } from "rxjs/operators";
import { Router, RouterStateSnapshot, CanActivate } from "@angular/router";
import { Page } from "../models/pages";

interface ILoginData {
    login?: string;
    password?: string;
}

@Injectable()
export class AuthService implements CanActivate {
    public loginData: ILoginData = {};
    public currentUser: any = null;

    constructor(private dbService: DbService, private router: Router) {}

    /** Валидация страниц. */
    public canActivate(route: unknown, state: RouterStateSnapshot): Promise<boolean> | boolean {
        const url: string = state.url.split("/")[1];
        if (url !== Page.login) {
            return this.currentUser ? true : this.router.navigate([Page.login]);
        } else {
            return this.currentUser ? this.router.navigate([Page.main]) : true;
        } 
    }

    public trySignIn(): void {
        this.dbService
            .readAll<Entities.User>(Entity.user)
            .pipe(
                map((items: Entities.User[]) =>
                    items.find(
                        user =>
                            user.login === this.loginData.login &&
                            user.password === this.loginData.password
                    )
                ),
                tap(user => (user ? this.signIn(user) : this.notifySignInError()))
            )
            .subscribe();
    }

    public trySignUp(): void {
        this.dbService
            .readAll<Entities.User>(Entity.user)
            .pipe(
                map((items: Entities.User[]) =>
                    items.find(user => user.login === this.loginData.login)
                ),
                tap(user => (!user ? this.signUp() : this.notifySignUpError()))
            )
            .subscribe();
    }

    public signUp(): void {
        this.dbService
            .createItem<Entities.User>(Entity.user, this.loginData)
            .pipe(tap(dataItem => this.signIn(dataItem)))
            .subscribe();
    }

    public signOut(): void {
        this.currentUser = null;
        window.localStorage.setItem("user", null);
        this.router.navigateByUrl(Page.login);
    }

    public signIn(user: Entities.User): void {
        this.currentUser = user;
        window.localStorage.setItem("user", JSON.stringify(user));
        this.loginData = {};
        this.router.navigateByUrl(Page.main);
    }

    private notifySignInError(): void {
        alert("Ошибка авторизации.");
    }

    private notifySignUpError(): void {
        alert("Такой пользователь уже есть.");
    }
}
