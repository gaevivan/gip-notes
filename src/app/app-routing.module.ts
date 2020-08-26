import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MainComponent } from './components/main-page/main.component';
import { NotFoundComponent } from './components/not-found-page/not-found.component';

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
