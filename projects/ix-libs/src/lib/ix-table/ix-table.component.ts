import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import * as _ from 'lodash';
import { ActiveSort } from '../../public_api';
import { IxTableColumn } from './ix-table-column.model';

@Component({
    selector: 'ix-table',
    templateUrl: './ix-table.component.html',
    styleUrls: ['./ix-table.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class IxTableComponent implements OnInit {
  @Input() columns: IxTableColumn[];
  @Input() data: any[];
  @Input() loading: boolean;
  @Input() virtual: boolean = false;
  @Input() virtualViewportHeight: any;
  @Input() virtualItemSize: number;
  @Input() customSort: Function;
  @Input() activeSort: ActiveSort;
  columnSizes: string;

  constructor() {}

  onColumnSort(prop: string, sortable: boolean) {
    if (!sortable) return;

    if (this.activeSort?.prop === prop && this.activeSort.dir === 'asc') {
      this.activeSort.dir = 'desc';
    } else {
      this.activeSort = { prop, dir: 'asc' };
    }
    this._sortData();
  }

  private _sortData() {
    if (this.customSort) {
      this.data = this.customSort(this.data, this.activeSort);
    } else {
      this.data = _.orderBy(this.data, this.activeSort.prop, this.activeSort.dir);
    }
  }

  ngOnInit(): void {}
}
