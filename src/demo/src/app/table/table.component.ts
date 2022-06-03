import { Component, OnInit } from '@angular/core';
import { ActiveSort, TableHeaderColumn } from 'projects/ix-libs/src/public_api';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  activeSort: ActiveSort = {
    prop: 'test',
    dir: 'desc'
  };

  columns: TableHeaderColumn[] = [
    {
      title: 'Test',
      prop: 'test',
      class: 'test'
    },
    {
      title: 'Column',
      prop: 'col',
      class: 'col'
    },
    {
      title: 'Column 2',
      prop: 'col2',
      class: 'col-2'
    },
    {
      title: 'Column 3',
      prop: 'col3',
      class: 'col-3'
    },
    {
      title: 'Column 4',
      prop: 'col4',
      class: 'col-4'
    }
  ];

  constructor() {}

  onColumnSort(prop: string) {
    if (this.activeSort?.prop === prop && this.activeSort.dir === 'asc') {
      this.activeSort.dir = 'desc';
    } else {
      this.activeSort = { prop, dir: 'asc' };
    }
  }

  ngOnInit(): void {}
}
