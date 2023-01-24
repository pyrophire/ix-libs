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
      sortable: true,
      width: '100px'
    },
    {
      title: 'Column',
      prop: 'col',
      sortable: true,
      width: '100px'
    },
    {
      title: 'Column 2',
      prop: 'col2',
      sortable: true,
      width: '100px'
    },
    {
      title: 'Column 3',
      prop: 'col3',
      sortable: true,
      width: '100px'
    },
    {
      title: 'Column 4',
      prop: 'col4',
      sortable: true,
      width: '100px'
    }
  ];

  data = MOCK_DATA;

  constructor() {}

  ngOnInit(): void {}
}
