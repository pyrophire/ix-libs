export class IxTableColumn {
  /**
   * @param {string} name -  column header display text
   * @param {string} property -  property for data binding
   * @param {string} width -  can use any valid width unit, required to layout the columns as a row
   * @param {boolean=} truncate -   truncate the text in the column for the column width
   * @param {boolean=} sortable -  disable sorting if set to false, default true
   * @param {string=} type -  type of column to display the formatted value, default string
   * @param {string=} dateFormat -  format the date value using Angular Date Pipe, default MM/dd/yyyy
   */
  name: string;
  property: string;
  width: string;
  truncate?: boolean;
  sortable?: boolean;
  type?: string;
  dateFormat?: string = 'MM/dd/yyyy';
}
