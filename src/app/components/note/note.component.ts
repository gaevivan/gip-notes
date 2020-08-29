import { Component, Input, HostBinding, ElementRef } from "@angular/core";
import { Entities } from "@models/types";
import { StorageService } from "@services/storage.service";
import { tap } from "rxjs/operators";

@Component({
    selector: "note-item",
    templateUrl: "note.component.html"
})
export class NoteComponent {
    /** Данные заметки. */
    @Input() public item: Entities.Note = null;
    @HostBinding("style.min-width") public minWidth: string = "250px";

    constructor(
        public storageService: StorageService,
        private elementRef: ElementRef<HTMLElement>
    ) {
        this.elementRef.nativeElement.classList.add(
            "cursor-pointer",
            "d-flex",
            "align-items-end",
            "justify-content-between"
        );
    }
}
