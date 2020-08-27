import { Injectable } from "@angular/core";

const EXPAND_WIDTH: number = 250;
const WIDTH: number = 70;

@Injectable()
export class SidebarService {
    public opened: boolean = false;
    public width: string = `${WIDTH}px`;

    public setOpened(flag: boolean): void {
        this.opened = flag;
        this.width = `${flag ? EXPAND_WIDTH : WIDTH}`;
    }
}
