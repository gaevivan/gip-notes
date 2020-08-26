import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MainComponent } from "./pages/main/main.component";
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: "",
                component: MainComponent
            },
            {
                path: "**",
                component: NotFoundComponent
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
