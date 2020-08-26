export namespace Entities {
    export interface User {
        name: string;
        login: string;
        password: string;
    }
    
    export interface Note {
        title: string;
        text: string;
        u_date: string;
        c_date: string;
    }
}

export interface IDataItem {
    uuid: string;
}

export enum Entity {
    user = "user",
    note = "note"
}
