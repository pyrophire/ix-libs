import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ThemeButtonComponent } from './ix-theme-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ThemeButtonComponent],
  imports: [MatButtonModule, MatIconModule, CommonModule],
  exports: [ThemeButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IxThemeButtonModule {}
