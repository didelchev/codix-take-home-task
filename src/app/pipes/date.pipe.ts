import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "customDate",
    standalone: true
})


export class CustomDatePipe implements PipeTransform {
    transform(date: string | undefined): string { 

        if(!date) {
            return ""
        }
        const [ year, month, day] = date.split("-");

        return `${day}.${month}.${year}`
    }

}