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
import {ModalCreateOrderComponent} from '../modal-create-order/modal-create-order.component';
import {ModalUpdateOrderComponent} from '../modal-update-order/modal-update-order.component';
import {NzNotificationService} from 'ng-zorro-antd/notification';

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

  constructor(private cakeService: CakeService, private orderService: OrderService, private modalService: NzModalService, private notification: NzNotificationService) {
    this.orderColumns = OrderService.GRID_COLUMNS;
    this.cakeColumns = CakeService.GRID_COLUMNS;
    this.orderActions = OrderService.GRID_ACTIONS;
    this.cakeActions = CakeService.GRID_ACTIONS;
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
        this.showViewModal(event.row.id);
        break;
      case 'update':
        const id = (tabType === 'cake') ? event.row.id : event.row.orderId;
        this.showUpdateModal(tabType, id);
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
      `<i>Vuoi rimuovere il dolce ${item?.name}? </i>` :
      `<i>Vuoi rimuovere la disponibilità del dolce ${item?.cakeName} dalla vetrina? </i>`;

    this.modalService.confirm({
      nzTitle: title,
      nzOnOk: () => {
        if (tabType === 'cake') {
          this.subscription.add(this.cakeService.removeCake(item.id).subscribe((result) => {
            if (result) {
              this.cakes$ = this.cakeService.loadCakes();
              this.notification.create(
                'success',
                'Rimozione dolce',
                `La rimozione del dolce ${item?.name} è avvenuta con successo.`
              );
            }
          }, () => {
            this.notification.create(
              'error',
              'Rimozione dolce',
              `Errore in fase di rimozione del dolce ${item?.name}.`
            );
          }));
        } else {
          this.subscription.add(this.orderService.removeOrder(item.orderId).subscribe((result) => {
            if (result) {
              this.notification.create(
                'success',
                'Rimozione dolce in vetrina',
                `La rimozione del dolce ${item?.cakeName} dalla vetrina è avvenuta con successo.`
              );
              this.orders$ = this.orderService.loadOrders();
            }
          }, () => {
            this.notification.create(
              'error',
              'Rimozione dolce in vetrina',
              `Errore in fase di rimozione del dolce ${item?.cakeName} dalla vetrina.`
            );
          }));
        }
      }
    });
  }

  private showCreateModal(tabType: 'cake' | 'order'): void {
    const title = (tabType === 'cake') ? 'Aggiungi Dolce' : 'Aggiungi Ordine';
    const modalComponent = (tabType === 'cake') ? ModalCreateCakeComponent : ModalCreateOrderComponent;
    const modalRef = this.modalService.create({
      nzTitle: title,
      nzContent: modalComponent as any
    });
    modalRef.afterClose.asObservable().subscribe(res => {
      if (res && res !== 'error') {
        let notificationTitle = '';
        let notificationMessage = '';

        if (tabType === 'cake') {
          notificationTitle = 'Aggiunta dolce';
          notificationMessage = `Il dolce ${res.name} è stato aggiunto con successo.`;
          this.cakes$ = this.cakeService.loadCakes();
        } else {
          notificationTitle = 'Aggiunta dolce in vetrina';
          notificationMessage = `Il dolce ${res.name} è stato aggiunto in vetrina con successo.`;
          this.orders$ = this.orderService.loadOrders();
        }

        this.notification.create('success', notificationTitle, notificationMessage);
      } else if (res === 'error') {
        // error
        this.notification.create(
          'error',
          (tabType === 'cake') ? 'Aggiunta dolce' : 'Aggiunta dolce alla vetrina',
          (tabType === 'cake') ? `Errore in fase di aggiunta del dolce.` : `Errore in fase di aggiunta del dolce alla vetrina.`
        );
      }
    });
  }

  private showUpdateModal(tabType: 'cake' | 'order', id: string): void {
    const title = (tabType === 'cake') ? 'Modifica Dolce' : 'Modifica Ordine';
    const modalComponent = (tabType === 'cake') ? ModalUpdateCakeComponent : ModalUpdateOrderComponent;
    const modalRef = this.modalService.create({
      nzTitle: title,
      nzContent: modalComponent as any,
      nzComponentParams: {
        id
      }
    });
    modalRef.afterClose.asObservable().subscribe(res => {
      if (res && res !== 'error') {
        let notificationTitle = '';
        let notificationMessage = '';

        if (tabType === 'cake') {
          notificationTitle = 'Modifica dolce';
          notificationMessage = `Il dolce ${res.name} è stato modificato con successo.`;
          this.cakes$ = this.cakeService.loadCakes();
        } else {
          notificationTitle = 'Modifica dolce in vetrina';
          notificationMessage = `La disponibilità del dolce ${res.cakeName} in vetrina è stata modificata con successo.`;
          this.orders$ = this.orderService.loadOrders();
        }

        this.notification.create('success', notificationTitle, notificationMessage);
      } else if (res === 'error') {
        // error
        this.notification.create(
          'error',
          (tabType === 'cake') ? 'Modifica dolce' : 'Modifica disponibilità dolce',
          (tabType === 'cake') ? `Errore in fase di modifica del dolce ${res?.name}.` :
            `Errore in fase di modifica della disponibilità del dolce ${res?.cakeName} in vetrina.`
        );
      }
    });
  }

  private showViewModal(id: string): void {
    const title = 'Visualizza Dolce';
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
