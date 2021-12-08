import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { IxTableColumn } from './ix-table-column.model';
import { IxTableSort } from './ix-table-sort.model';

@Component({
  selector: 'ix-table',
  templateUrl: './ix-table.component.html',
  styleUrls: ['./ix-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IxTableComponent implements OnInit {
  /**
   * @param  {boolean=false;} editButton - show edit button
   * @param  {boolean=false;} deleteButton - show delete button
   * @param  {boolean=false;} loading - show loading ui-placeholder
   * @param  {boolean=false;} uiPlaceholder - use ui-placeholder for loader, if false a material bar will be used
   * @param  {boolean=false;} showFilter - show filter input inline
   * @param  {boolean=true;} showCount - show row count on header
   * @param  {boolean=false;} hasClickEvent - allows the row to be clicked, firing off itemEmit
   * @param  {boolean=false;} virtual - use cdk virtual scroll
   * @param  {number=48;} virtualItemSize - size of virtual item, needed to calculate virtual scroll buffers
   * @param  {any[];} data - data of rows to display
   * @param  {IxTableColumn[];} columns - columns to display, will render in order of declaration
   * @param  {IxTableSort;} defaultSort - default sort object to be set at intialization, useful when array is not pre sorted
   * @param  {} itemEmit=newEventEmitter<any> - event emitter for item click
   * @param  {} editEmit=newEventEmitter<any> - event emitter for edit button
   * @param  {} deleteEmit=newEventEmitter<any> - event emitter for delete button
   */
  @Input() editButton: boolean = false;
  @Input() deleteButton: boolean = false;
  @Input() loading: boolean = false;
  @Input() uiPlaceholder: boolean = false;
  @Input() showFilter: boolean = false;
  @Input() showCount: boolean = true;
  @Input() hasClickEvent: boolean = false;
  @Input() virtual: boolean = false;
  @Input() virtualItemSize: number = 48;
  @Input() data: any[];
  @Input() columns: IxTableColumn[];
  @Input() defaultSort: IxTableSort;
  @Output() itemEmit = new EventEmitter<any>();
  @Output() editEmit = new EventEmitter<any>();
  @Output() deleteEmit = new EventEmitter<any>();

  sortedData: any[];
  sortDirection: string;
  currentSortProperty: string;
  nextSortDirection: string;
  showControlColumn: boolean;
  columnCount: number;
  gridColumns: string;
  activeFilter: string;
  headerColumns: string;

  filterForm: FormGroup;
  filter = new FormControl({ value: null, disabled: false }, []);

  constructor(private fb: FormBuilder) {}

  //#region filter form

  buildForm() {
    this.filterForm = this.fb.group({
      filter: this.filter
    });
    this.filter.valueChanges.subscribe((value) => {
      if (value.trim().length > 3) {
        this.filterData(value);
      }  else {
        this.sortedData = this.data;
        this.sortData(this.currentSortProperty, false);
      }
    });
  }
  //#endregion filter form

  //#region data manipulation

  sortData(property: string, toggleDirection: boolean, col?: IxTableColumn) {
    if (col.sortable != false) {
      if (this.currentSortProperty != property) {
        this.sortDirection = 'asc';
      }
      this.sortedData = _.orderBy(this.sortedData, [property], this.sortDirection);
      if (toggleDirection) {
        this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc';
      }

      this.currentSortProperty = property;
    }
  }

  sortDataOnNewData() {
    if (this.currentSortProperty) {
      let sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      this.sortedData = _.orderBy(this.sortedData, [this.currentSortProperty], sortDirection);
    }
  }
  filterData(value: string) {
    this.activeFilter = value;
    this.sortedData = this.data.filter((data) => JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1);

    if (this.currentSortProperty) {
      this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc';
      this.sortData(this.currentSortProperty, true);
    }
  }
  //#endregion data manipulation

  //#region emmiters

  itemClicked(item) {
    this.itemEmit.emit(item);
  }
  editItem(item) {
    this.editEmit.emit(item);
  }
  removeItem(item) {
    this.deleteEmit.emit(item);
  }
  //#endregion emmiters

  //#region helpers

  setColumnWidths() {
    let widths = this.columns.map((column) => column.width);
    let widthString = widths.join(' ');
    if (this.editButton || this.deleteButton) {
      this.headerColumns = `${widthString} 92px`;
      this.gridColumns = `${widthString} 80px`;
    } else {
      this.headerColumns = widthString;
      this.gridColumns = widthString;
    }
  }

  setDefaultSort() {
    if (this.defaultSort) {
      this.sortDirection = this.defaultSort.direction;
      this.sortData(this.defaultSort.property, true);
    } else {
      this.sortDirection = 'asc';
    }
  }

  setControlsColumn() {
    if (this.editButton || this.deleteButton) {
      this.showControlColumn = true;
    }
  }
  //#endregion helpers

  ngOnInit(): void {
    this.buildForm();
    this.setDefaultSort();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.sortedData = this.data;
    this.sortDataOnNewData();
    this.setColumnWidths();
    this.setControlsColumn();
    if (this.activeFilter) {
      this.filterData(this.activeFilter);
    }
  }
}
