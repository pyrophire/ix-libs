import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'c2t',
    standalone: true
})
export class CamelToTitlePipe implements PipeTransform {
    transform(value: string, ...args: unknown[]): unknown {
        const result = value.replace(/([A-Z0-9])/g, ' $1');
        const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
        return finalResult;
    }
}
