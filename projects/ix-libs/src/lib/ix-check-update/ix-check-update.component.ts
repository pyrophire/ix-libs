import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ix-check-update',
  templateUrl: './ix-check-update.component.html',
  styleUrls: ['./ix-check-update.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CheckUpdateComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<CheckUpdateComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  public close() {
    this.dialogRef.close(null);
  }
  public refresh() {
    this.dialogRef.close(true);
  }
  ngOnInit() {}
}
