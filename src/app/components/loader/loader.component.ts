import { LoaderService } from "src/app/services/loader.service";
import { Component } from "@angular/core";

@Component({
    selector: "loader",
    templateUrl: "loader.component.html"
})
export class LoaderComponent {
    constructor(public loaderService: LoaderService) {}
}
