import { Component } from "@angular/core";
import { AuthService } from "./services/auth.service";

@Component({
    selector: "app-root",
    template: `<router-outlet></router-outlet><loader></loader>`,
    styles: []
})
export class AppComponent {
    title = "gip-notes";

    constructor(public authService: AuthService) {}

    public ngOnInit(): void {
        const user = window.localStorage.getItem("user");
        if (user) {
            this.authService.signIn(JSON.parse(user));
        }
    }
}
