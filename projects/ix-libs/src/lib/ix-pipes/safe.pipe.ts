import { Pipe, PipeTransform } from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeStyle,
  SafeScript,
  SafeUrl,
  SafeResourceUrl,
} from '@angular/platform-browser';

@Pipe({
    name: `safe`,
    standalone: false
})
export class SafePipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) {}

  public transform(
    value: any,
    type: string
  ): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case `html`:
        return this.sanitizer.bypassSecurityTrustHtml(value);
      case `style`:
        return this.sanitizer.bypassSecurityTrustStyle(value);
      case `script`:
        return this.sanitizer.bypassSecurityTrustScript(value);
      case `url`:
        return this.sanitizer.bypassSecurityTrustUrl(value);
      case `sms`:
        return this.sanitizer.bypassSecurityTrustUrl(`sms:${value}`);
      case `text`:
        return this.sanitizer.bypassSecurityTrustUrl(`sms:${value}`);
      case `mailto`:
        return this.sanitizer.bypassSecurityTrustUrl(`mailto:${value}`);
      case `email`:
        return this.sanitizer.bypassSecurityTrustUrl(`mailto:${value}`);
      case `tel`:
        return this.sanitizer.bypassSecurityTrustUrl(`tel:${value}`);
      case `resourceUrl`:
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
}
