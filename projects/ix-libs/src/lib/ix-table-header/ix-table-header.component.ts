import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export class ActiveSort {
    prop: string;
    dir: string;
}

@Component({
    selector: 'ix-table-header',
    templateUrl: './ix-table-header.component.html',
    styleUrls: ['./ix-table-header.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CommonModule, MatIconModule]
})
export class IxTableHeaderComponent {
    @Input() title: string;
    @Input() prop: string;
    @Input() activeSort: ActiveSort;
    @Input() sortable: boolean;

    constructor() {}
}
