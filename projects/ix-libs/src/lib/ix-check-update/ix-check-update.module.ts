import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CheckUpdateComponent } from './ix-check-update.component';

@NgModule({
  declarations: [CheckUpdateComponent],
  imports: [CommonModule, HttpClientModule, MatDialogModule, MatButtonModule],
  exports: [CheckUpdateComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IxCheckUpdateModule {}
