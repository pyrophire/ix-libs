import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';

import { IxPipesModule } from '../ix-pipes/ix-pipes.module';
import { IxTableHeaderModule } from '../ix-table-header/ix-table-header.module';
import { IxTableComponent } from './ix-table.component';

@NgModule({
  declarations: [IxTableComponent],
  imports: [CommonModule, MatProgressBarModule, MatIconModule, ScrollingModule, IxPipesModule, IxTableHeaderModule],
  exports: [IxTableComponent]
})
export class IxTableModule {}
