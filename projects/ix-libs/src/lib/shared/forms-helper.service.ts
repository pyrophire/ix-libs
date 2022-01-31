import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class IxFormsHelperService {
  constructor() {}

  getDirtyValues(form): any {
    const dirtyValues = {};

    Object.keys(form.controls).forEach((key) => {
      const currentControl = form.controls[key];

      if (currentControl.dirty) {
        if (currentControl.controls) {
          dirtyValues[key] = this.getDirtyValues(currentControl);
        } else {
          dirtyValues[key] = currentControl.value;
        }
      }
    });

    return dirtyValues;
  }

  public hasValidationError(control: FormControl, errorCode: string): boolean {
    return control.hasError(errorCode) && control.touched;
  }

  public requiredLabel(label: string, control: any): string {
    let validators;
    try {
      validators = control?.validator('');
    } catch (error) {
      return label;
    }
    if (validators?.required) {
      return `${label} *`;
    } else {
      return label;
    }
  }
}
