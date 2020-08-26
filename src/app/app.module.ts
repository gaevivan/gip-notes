import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainComponent } from "./components/main-page/main.component";
import { NotFoundComponent } from "./components/not-found-page/not-found.component";
import { CommonModule } from "@angular/common";
import { DbService } from "./services/db.service";
import { AngularFireModule } from "@angular/fire";
import { FIREBASE_CONFIG } from "./firebase-config";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MomentDatePipe } from "./pipes/date.pipe";

@NgModule({
    declarations: [AppComponent, MainComponent, NotFoundComponent, MomentDatePipe],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(FIREBASE_CONFIG),
        AngularFirestoreModule
    ],
    providers: [DbService],
    bootstrap: [AppComponent]
})
export class AppModule {}
