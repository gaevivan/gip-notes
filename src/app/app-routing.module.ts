import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MainComponent } from "./components/main-page/main.component";
import { NotFoundComponent } from "./components/not-found-page/not-found.component";
import { AuthService } from "./services/auth.service";
import { LoginComponent } from "./components/login-page/login.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: "",
                component: MainComponent,
                canActivate: [AuthService]
            },
            {
                path: "main",
                redirectTo: ""
            },
            {
                path: "login",
                component: LoginComponent,
                canActivate: [AuthService]
            },
            {
                path: "**",
                component: NotFoundComponent,
                canActivate: [AuthService]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
