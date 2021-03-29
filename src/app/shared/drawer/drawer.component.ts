import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductActions, ProductsCartActions } from './../../actions';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CartProduct } from 'src/app/models/carProduct.model';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() width: string = '';
  @Output() closeDrawer = new EventEmitter<boolean>();
  cartProducts: CartProduct[];
  cartProducts$: Observable<CartProduct[]> = this.store.select(state => state.productsCart.cartProducts);
  orderCreate: any;
  orderCreate$: Observable<any> = this.store.select(state => state.productsCart.orderCreate);
  isLoading: boolean = false;
  isLoading$: Observable<boolean> = this.store.select(state => state.productsCart.isLoadingCreateOrder);
  errorProductsCart: any;
  errorProductsCart$: Observable<any> = this.store.select(state => state.productsCart.errorProductsCart);

  constructor(private store: Store<{ productsCart: any }>, private modal: NzModalService, private authService: AuthService, private message: NzMessageService) {
    this.cartProducts = []
  }

  ngOnInit(): void {
    this.cartProducts$.subscribe((data: CartProduct[]) => {
      if (data != null && data != undefined) {
        this.cartProducts = data
      }
    })
    this.isLoading$.subscribe((data: any) => {
      this.isLoading = data
    })
    this.orderCreate$.subscribe((data: any) => {
      if (data != null && data != undefined) {
        this.orderCreate = data
        if (data.success) {
          this.store.dispatch(ProductsCartActions.cleanProductsCart())
          this.close();
          this.message.create("success", "Tu orden fue creada con éxito!")
        }
      }
    })
    this.errorProductsCart$.subscribe((data: any) => {
      if (data != null && data != undefined) {
        this.message.create('error', `Ah ocurrido un error inesperado al registrar, por favor inténtalo mas tarde`);
        this.errorProductsCart = data
      }
    })
  }

  close(): void {
    this.closeDrawer.emit(false);
  }

  addProduct(item: Product) {
    const itemCart = {
      product: item,
      quantity: 1
    }
    this.store.dispatch(ProductsCartActions.addProductCart({ itemCart }))
  }

  deleteProduct(item: Product) {
    this.modal.confirm({
      nzTitle: 'Desea eliminar este producto?',
      nzOkText: 'Si',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        const index = this.cartProducts.findIndex(itemCart => itemCart.product.id === item.id)
        this.store.dispatch(ProductsCartActions.deleteProductCart({ index }))
      },
      nzCancelText: 'No',
    });

  }

  editProduct(item: Product, quantity: number) {
    if (quantity == 0) {
      this.deleteProduct(item);
    } else {
      const itemCart = {
        product: item,
        quantity: quantity
      }
      const index = this.cartProducts.findIndex(itemCart => itemCart.product.id === item.id)
      this.store.dispatch(ProductsCartActions.editProductCart({ itemCart, index }))
    }

  }
  cleanCart() {
    this.modal.confirm({
      nzTitle: 'Seguro quieres vaciar el carrito?',
      nzContent: '<b>Esta operación no se podrá revertir</b>',
      nzOkText: 'Si',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.store.dispatch(ProductsCartActions.cleanProductsCart())
        this.close()
      },
      nzCancelText: 'No',
    });
  }

  createdOrder() {
    if (!this.authService.authenticated) {
      this.message.create("warning", "Debes iniciar sesión para poder crear la orden")
      return;
    }
    this.modal.confirm({
      nzTitle: 'Seguro quieres crear la orden?. Verifique que no le falten productos',
      nzOkText: 'Si',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.store.dispatch(ProductsCartActions.createOrder({ productsCart: this.cartProducts }));
      },
      nzCancelText: 'No',
    });
  }
}
