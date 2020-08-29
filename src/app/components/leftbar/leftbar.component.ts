import { Component, HostBinding } from "@angular/core";
import { AuthService } from "@services/auth.service";
import { StorageService } from "@services/storage.service";

@Component({
    selector: "left-bar",
    templateUrl: "./leftbar.component.html",
    styleUrls: ["./leftbar.component.css"]
})
export class LeftbarComponent {
    @HostBinding("style.width") public width: string;
    public isFullWidth: boolean;

    constructor(
        public authService: AuthService,
        public storageService: StorageService
    ) {}

    public ngOnInit(): void {
        this.storageService.leftBarWidth$.subscribe(value => this.width = value);
        this.storageService.isFullWidth$.subscribe(value => this.isFullWidth = value);
    }
}
