import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {GridColumn, GridRow} from '../../interfaces/grid';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent<T extends GridRow> implements OnInit {

  /** The array of rows. Each row must have a unique 'id' field. */
  @Input() rows: T[];

  /** Array of columns definition. See {@link GridColumn} interface to specify the column options. */
  @Input() columns: GridColumn[];

  /** Enable/disable every action above the table */
  @Input() hideActions = false;

  /** Callback function executed when a row is selected */
  @Output() onRowSelect = new EventEmitter<T>();

  /** Callback function executed when the predefined View action is clicked. The data emitted is the selected row. */
  @Output() onView = new EventEmitter<T>();

  private selectedRowId: string;

  constructor() { }

  get selectedRow(): T | undefined {
    return this.rows.find(row => row.id === this.selectedRowId);
  }

  ngOnInit(): void {
  }

  onSelectedRow(id: string): void {
    this.selectedRowId = id;
    this.onRowSelect.emit(this.selectedRow);
  }

}
