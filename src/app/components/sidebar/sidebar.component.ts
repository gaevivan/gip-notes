import { Component, HostBinding } from "@angular/core";
import { SidebarService } from "src/app/services/sidebar.service";
import { AuthService } from "src/app/services/auth.service";
import { StorageService } from "src/app/services/storage.service";

@Component({
    selector: "sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent {
    @HostBinding("style.width") public width: string = this.sidebarService.width;

    constructor(
        public sidebarService: SidebarService,
        public authService: AuthService,
        public storageService: StorageService
    ) {}
}
