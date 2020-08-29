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
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StorageService } from "./services/storage.service";
import { NoteComponent } from './components/note/note.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { LeftbarComponent } from './components/leftbar/leftbar.component';
import { TopbarComponent } from './components/topbar/topbar.component';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        NotFoundComponent,
        MomentDatePipe,
        LoaderComponent,
        LoginComponent,
        LeftbarComponent,
        NoteComponent,
        NoteListComponent,
        TopbarComponent
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
        StorageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
