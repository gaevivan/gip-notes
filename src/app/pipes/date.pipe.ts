import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
    name: "momentDate"
})
export class MomentDatePipe implements PipeTransform {
    transform(value: string): any {
        return moment(value, "YYYY.MM.DDThh:mm:ss").format("hh:mm DD.MM");
    }
}
