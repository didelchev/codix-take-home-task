import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'customCurrency',
    standalone: true
})


export class CustomCurrencyPipe implements PipeTransform {
    transform(value: number): string{
        const currency = 'BGN';
        const [ integer, decimal ] = value.toFixed(2).split('.');

        const formatedValue = integer.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

        return `${formatedValue}.${decimal} ${currency}`

        
    }
}