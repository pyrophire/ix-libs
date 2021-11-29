import { Pipe, PipeTransform } from '@angular/core';
import * as filesize_ from 'filesize';

@Pipe({
  name: 'filesize',
})
export class FileSizePipe implements PipeTransform {
  private static transformOne(value: number, options?: any): string {
    if (typeof value === 'number') {
      const filesize = filesize_;
      return filesize(value, options);
    } else {
      return value;
    }
  }

  transform(value: number | number[], options?: any) {
    if (Array.isArray(value)) {
      return value.map((val) => FileSizePipe.transformOne(val, options));
    }

    return FileSizePipe.transformOne(value, options);
  }
}
