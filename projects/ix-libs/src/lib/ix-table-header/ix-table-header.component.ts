import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

export class ActiveSort {
  prop: string;
  dir: string;
}

@Component({
    selector: 'ix-table-header',
    templateUrl: './ix-table-header.component.html',
    styleUrls: ['./ix-table-header.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class IxTableHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() prop: string;
  @Input() activeSort: ActiveSort;
  @Input() sortable: boolean;

  constructor() {}

  ngOnInit(): void {}
}
