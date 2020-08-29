import { Component } from "@angular/core";
import { AuthService } from "@services/auth.service";
import { StorageService } from "@services/storage.service";

@Component({
    selector: "top-bar",
    templateUrl: "topbar.component.html"
})
export class TopbarComponent {
    constructor(public authService: AuthService, public storageService: StorageService) {}
}