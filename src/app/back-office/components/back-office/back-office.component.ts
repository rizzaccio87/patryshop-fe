import {Component, OnDestroy, OnInit} from '@angular/core';
import {CakeService} from '../../../core/services/cake.service';
import {OrderService} from '../../../core/services/order.service';
import {Cake} from '../../../core/interfaces/cake';
import {Observable, Subscription} from 'rxjs';
import {Order} from '../../../core/interfaces/order';
import {GridColumn} from '../../../shared/interfaces/grid';
import {Action} from '../../../shared/interfaces/action';
import {NzModalService} from 'ng-zorro-antd/modal';
import {ModalCreateCakeComponent} from '../modal-create-cake/modal-create-cake.component';
import {ModalUpdateCakeComponent} from '../modal-update-cake/modal-update-cake.component';

@Component({
  selector: 'app-back-office',
  templateUrl: './back-office.component.html',
  styleUrls: ['./back-office.component.scss']
})
export class BackOfficeComponent implements OnInit, OnDestroy {
  public cakes$: Observable<Cake[]>;
  public orders$: Observable<Order[]>;
  public orderColumns: GridColumn[];
  public cakeColumns: GridColumn[];
  public orderActions: Action[];
  public cakeActions: Action[];

  private subscription: Subscription = new Subscription();

  constructor(private cakeService: CakeService, private orderService: OrderService, private modalService: NzModalService) {
    this.orderColumns = [{
      field: 'creationTimestamp',
      title: 'Data'
    }, {
      field: 'cakeName',
      title: 'Torta'
    }, {
      field: 'amount',
      title: 'Disponibilità'
    }, {
      field: 'price',
      title: 'Prezzo'
    }];

    this.cakeColumns = [{
      field: 'name',
      title: 'Nome Torta'
    }, {
      field: 'price',
      title: 'Prezzo'
    }];

    this.orderActions = [{
      label: 'Aggiorna',
      type: 'update'
    }, {
      label: 'Rimuovi',
      type: 'remove'
    }];

    this.cakeActions = [{
      label: 'Visualizza',
      type: 'view'
    }, {
      label: 'Aggiorna',
      type: 'update'
    }, {
      label: 'Rimuovi',
      type: 'remove'
    }];
  }

  ngOnInit(): void {
    this.cakes$ = this.cakeService.loadCakes();
    this.orders$ = this.orderService.loadOrders();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onItemActionSelect(event: any): void {
    const action: Action = event.action;
    const tabType: 'cake' | 'order' = event.tabType;
    switch (action?.type) {
      case 'create':
        this.showCreateModal(tabType);
        break;
      case 'view':
        this.showViewModal(tabType, event.row.id);
        break;
      case 'update':
        this.showUpdateModal(tabType, event.row.id);
        break;
      case 'remove':
        this.showRemoveConfirmModal(tabType, event.row);
        break;
      default:
        // noop
        break;
    }
  }

  private showRemoveConfirmModal(tabType: 'cake' | 'order', item: any): void {
    const title = (tabType === 'cake') ?
      `<i>Vuoi rimuovere la torta ${item?.name}? </i>` :
      `<i>Vuoi rimuovere l'ordine per la torta ${item?.cakeName}? </i>`;

    this.modalService.confirm({
      nzTitle: title,
      nzOnOk: () => {
        console.log('OK');
        if (tabType === 'cake') {
          this.subscription.add(this.cakeService.removeCake(item.id).subscribe((result) => {
            if (result) {
              this.cakes$ = this.cakeService.loadCakes();
            }
          }));
        } else {
          this.subscription.add(this.orderService.removeOrder(item.id).subscribe((result) => {
            if (result) {
              this.orders$ = this.orderService.loadOrders();
            }
          }));
        }
      }
    });
  }

  private showCreateModal(tabType: 'cake' | 'order'): void {
    const title = (tabType === 'cake') ? 'Aggiungi Torta' : 'Aggiungi Ordine';
    // const modalComponent = (tabType === 'cake') ? ModalCreateCakeComponent : ModalCreateOrderComponent;
    const modalRef = this.modalService.create({
      nzTitle: title,
      nzContent: ModalCreateCakeComponent
    });
    modalRef.afterClose.asObservable().subscribe(res => {
      if (res) {
        if (tabType === 'cake') {
          this.cakes$ = this.cakeService.loadCakes();
        } else {
          this.orders$ = this.orderService.loadOrders();
        }
      }
    });
  }

  private showUpdateModal(tabType: 'cake' | 'order', id: string): void {
    const title = (tabType === 'cake') ? 'Modifica Torta' : 'Modifica Ordine';
    // const modalComponent = (tabType === 'cake') ? ModalCreateCakeComponent : ModalCreateOrderComponent;
    const modalRef = this.modalService.create({
      nzTitle: title,
      nzContent: ModalUpdateCakeComponent,
      nzComponentParams: {
        id
      }
    });
    modalRef.afterClose.asObservable().subscribe(res => {
      if (res) {
        if (tabType === 'cake') {
          this.cakes$ = this.cakeService.loadCakes();
        } else {
          this.orders$ = this.orderService.loadOrders();
        }
      }
    });
  }

  private showViewModal(tabType: 'cake' | 'order', id: string): void {
    const title = (tabType === 'cake') ? 'Visualizza Torta' : 'Visualizza Ordine';
    // const modalComponent = (tabType === 'cake') ? ModalCreateCakeComponent : ModalCreateOrderComponent;
    this.modalService.create({
      nzTitle: title,
      nzContent: ModalUpdateCakeComponent,
      nzComponentParams: {
        id,
        readonly: true
      }
    });
  }
}
