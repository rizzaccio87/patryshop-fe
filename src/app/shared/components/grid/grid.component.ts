import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {GridColumn, GridRow} from '../../interfaces/grid';
import {Action} from '../../interfaces/action';

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

  /** Enable/disable every action for the table rows */
  @Input() hideActions = false;

  /** The row actions */
  @Input() actions: Action[];

  /** Callback function executed when a row is selected */
  @Output() rowSelect = new EventEmitter<T>();

  /** Callback function executed when the predefined View action is clicked. The data emitted is the selected row. */
  @Output() onView = new EventEmitter<T>();

  /** Callback function executed when a row action is selected */
  @Output() actionSelect = new EventEmitter<any>();

  private selectedRowId: string;

  constructor() { }

  get selectedRow(): T | undefined {
    return this.rows.find(row => row.id === this.selectedRowId);
  }

  ngOnInit(): void {
  }

  onSelectedRow(id: string): void {
    this.selectedRowId = id;
    this.rowSelect.emit(this.selectedRow);
  }

  onActionSelect(action: Action): void {
    this.actionSelect.emit({
      action,
      row: this.selectedRow
    });
  }
}
