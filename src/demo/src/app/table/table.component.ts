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
      title: 'First Name',
      prop: 'firstName',
      sortable: true,
      width: '200px'
    },
    {
      title: 'Last Name',
      prop: 'lastName',
      sortable: true,
      width: '1fr'
    }
  ];

  data = MOCK_DATA;

  constructor() {}

  ngOnInit(): void {}
}
