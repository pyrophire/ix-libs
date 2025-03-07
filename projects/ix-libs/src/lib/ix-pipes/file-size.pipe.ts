import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filesize',
    standalone: false
})
export class FileSizePipe implements PipeTransform {
  private static transformOne(bytes: number, options?: any): string {
    if (isNaN(bytes) || bytes === 0) return '0 Bytes';

    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
  }

  transform(value: number | number[], options?: any) {
    if (Array.isArray(value)) {
      return value.map((val) => FileSizePipe.transformOne(val, options));
    }

    return FileSizePipe.transformOne(value, options);
  }
}
