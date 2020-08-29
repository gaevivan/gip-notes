import { Component } from "@angular/core";
import { LoaderService } from "@services/loader.service";

@Component({
    selector: "loader",
    templateUrl: "loader.component.html"
})
export class LoaderComponent {
    constructor(public loaderService: LoaderService) {}
}
