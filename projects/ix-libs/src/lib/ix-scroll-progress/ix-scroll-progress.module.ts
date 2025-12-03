import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScrollBarProgressComponent } from './ix-scroll-progress.component';

@NgModule({
    imports: [CommonModule, MatButtonModule, MatIconModule, ScrollBarProgressComponent],
    exports: [ScrollBarProgressComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IxScrollProgressModule {}
