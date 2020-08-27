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
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { MomentDatePipe } from "./pipes/date.pipe";
import { LoaderComponent } from "./components/loader/loader.component";
import { LoginComponent } from "./components/login-page/login.component";
import { LoaderService } from "./services/loader.service";
import { AuthService } from "./services/auth.service";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { SidebarService } from "./services/sidebar.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StorageService } from "./services/storage.service";

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        NotFoundComponent,
        MomentDatePipe,
        LoaderComponent,
        LoginComponent,
        SidebarComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(FIREBASE_CONFIG),
        AngularFirestoreModule,
        BrowserAnimationsModule
    ],
    providers: [
        DbService,
        LoaderService,
        AuthService,
        SidebarService,
        StorageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
