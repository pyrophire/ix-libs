import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScrollTopButtonComponent } from './ix-scroll.component';

@NgModule({
    imports: [CommonModule, MatButtonModule, MatIconModule, ScrollTopButtonComponent],
    exports: [ScrollTopButtonComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IxScrollModule {}
