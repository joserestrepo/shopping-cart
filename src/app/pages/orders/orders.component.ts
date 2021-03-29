import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { ProductsCartActions } from 'src/app/actions';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  listOrders: any[];
  isloading: boolean = false;
  error: any;
  listOrders$: Observable<any[]> = this.store.select(state => state.productsCart.listOrders);
  isLoading$: Observable<boolean> = this.store.select(state => state.productsCart.isLoadingGetOrder);
  error$: Observable<any> = this.store.select(state => state.productsCart.errorGetOrders);

  constructor(private store: Store<{ products: any, productsCart: any }>, private message: NzMessageService,
    private modal: NzModalService, private authService: AuthService) {
    this.listOrders = [];
  }

  ngOnInit(): void {
    this.store.dispatch(ProductsCartActions.getOrderByUser());
    this.listOrders$.subscribe((data: any) => {
      if (data != null && data != undefined) {
        this.listOrders = data
      }
    })
    this.isLoading$.subscribe((data: any) => {
      this.isloading = data
    })
    this.error$.subscribe((data: any) => {
      if (data != null && data != undefined) {
        this.message.create('error', `Ah ocurrido un error inesperado al cargar los datos, por favor inténtalo mas tarde`);
        this.error = data
      }
    })
  }

  loadingAuth() {
    return this.authService.loading
  }
}
