import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ScrollTopButtonComponent } from './ix-scroll.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ScrollTopButtonComponent],
  imports: [MatButtonModule, MatIconModule, CommonModule],
  exports: [ScrollTopButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IxScrollModule {}
