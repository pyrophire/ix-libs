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
      class: 'test',
      sortable: true
    },
    {
      title: 'Column',
      prop: 'col',
      class: 'col',
      sortable: true
    },
    {
      title: 'Column 2',
      prop: 'col2',
      class: 'col-2',
      sortable: true
    },
    {
      title: 'Column 3',
      prop: 'col3',
      class: 'col-3',
      sortable: true
    },
    {
      title: 'Column 4',
      prop: 'col4',
      class: 'col-4',
      sortable: false
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
