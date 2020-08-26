import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "login-page",
    templateUrl: "./login.component.html"
})
export class LoginComponent {
    constructor(public authService: AuthService) {}
}
