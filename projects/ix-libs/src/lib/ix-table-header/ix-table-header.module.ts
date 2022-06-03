import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { IxTableHeaderComponent } from './ix-table-header.component';

export class TableHeaderColumn {
  title: string;
  prop: string;
  class: string;
  sortable: boolean;
}

@NgModule({
  declarations: [IxTableHeaderComponent],
  imports: [CommonModule, FormsModule, MatIconModule],
  exports: [IxTableHeaderComponent]
})
export class IxTableHeaderModule {}
