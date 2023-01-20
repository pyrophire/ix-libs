import { Component, OnInit } from '@angular/core';
import { ActiveSort, IxTableColumn } from 'projects/ix-libs/src/public_api';
import { MOCK_DATA } from './data.mock';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  activeSort: ActiveSort = {
    prop: 'id',
    dir: 'desc'
  };
  columns: IxTableColumn[] = [
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

  data = MOCK_DATA;

  constructor() {}

  ngOnInit(): void {}
}
