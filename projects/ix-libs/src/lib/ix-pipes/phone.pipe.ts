import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phone',
    standalone: false
})
export class PhonePipe implements PipeTransform {
  transform(val: string) {
    const areaCode = val.substring(0, 3);
    const prefix = val.substring(3, 6);
    const suffix = val.substring(6, 10);
    const ext = `ext: ${val.substring(10, 20)}`;
    if (val.substring(11, 16)) {
      return `(${areaCode}) ${prefix}-${suffix} ${ext}`;
    } else {
      return `(${areaCode}) ${prefix}-${suffix}`;
    }
  }
}
