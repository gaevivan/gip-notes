import { Injectable } from "@angular/core";

@Injectable()
export class LoaderService {
    public active: boolean = false;

    public setActive(flag: boolean): void {
        this.active = flag;
    }
}
