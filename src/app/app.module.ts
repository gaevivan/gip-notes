import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainComponent } from "./pages/main/main.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { CommonModule } from "@angular/common";
import { StorageService } from "./pages/main/services/storage.service";

@NgModule({
    declarations: [AppComponent, MainComponent, NotFoundComponent],
    imports: [BrowserModule, CommonModule, AppRoutingModule],
    providers: [StorageService],
    bootstrap: [AppComponent]
})
export class AppModule {}
