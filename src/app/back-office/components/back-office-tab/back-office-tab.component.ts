import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GridColumn} from '../../../shared/interfaces/grid';
import {Action} from '../../../shared/interfaces/action';

@Component({
  selector: 'app-back-office-tab',
  templateUrl: './back-office-tab.component.html',
  styleUrls: ['./back-office-tab.component.scss']
})
export class BackOfficeTabComponent implements OnInit {
  @Input() tabTitle: string;
  @Input() tabType: 'cake' | 'order';
  @Input() createButtonLabel: string;
  @Input() items: any[];
  @Input() columns: GridColumn[];
  @Input() actions: Action[];

  @Output() actionSelect = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onCreateItem(): void {
    this.actionSelect.emit({
      action: {
        type: 'create'
      },
      tabType: this.tabType
    });
  }

  onGridActionSelect(event: any): void {
    this.actionSelect.emit({ ...event, tabType: this.tabType });
  }
}
