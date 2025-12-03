import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeButtonComponent } from './ix-theme-button.component';

@NgModule({
    imports: [CommonModule, MatButtonModule, MatIconModule, ThemeButtonComponent],
    exports: [ThemeButtonComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IxThemeButtonModule {}
