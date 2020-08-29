import { Component, ElementRef, HostBinding } from "@angular/core";
import { StorageService } from '@services/storage.service';
import { tap } from 'rxjs/operators';

@Component({
    selector: "note-list",
    templateUrl: "./note-list.component.html"
})
export class NoteListComponent {
    constructor(
        public storageService: StorageService,
        private elementRef: ElementRef<HTMLElement>
    ) {
        this.elementRef.nativeElement.classList.add(
            "d-flex",
            "flex-column"
        );
    }
}