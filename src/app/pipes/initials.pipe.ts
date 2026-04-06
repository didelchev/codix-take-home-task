import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'customInitials',
    standalone: true
})


export class CustomInitialsPipe implements PipeTransform {
    transform(userName: string): string {
        const firstCharacter = userName.split(" ")[0].charAt(0);
        const secondCharacter = userName.split(" ")[1].charAt(0);
        const initials = firstCharacter+secondCharacter;
        
        return initials
    }
}



