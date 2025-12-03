import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { IxPipesModule } from '../ix-pipes/ix-pipes.module';
import { IxTableHeaderModule } from '../ix-table-header/ix-table-header.module';
import { IxTableComponent } from './ix-table.component';

@NgModule({
    imports: [CommonModule, MatProgressBarModule, MatIconModule, ScrollingModule, IxPipesModule, IxTableHeaderModule, IxTableComponent],
    exports: [IxTableComponent]
})
export class IxTableModule {}
