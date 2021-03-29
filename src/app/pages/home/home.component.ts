import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductActions, ProductsCartActions } from './../../actions';
import { NzMessageService } from 'ng-zorro-antd/message';
import { save, get } from './../../utils/sesionStorage';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartProduct } from 'src/app/models/carProduct.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cartProducts: CartProduct[];
  listProductsOriginal: any[];
  listProducts: Product[];
  itemSelect: any;
  isModalProduct: boolean = false;
  isCart: boolean = false;
  quantity: number = 1
  index: number = 0
  isloading: boolean = false;
  error: any;
  products$: Observable<Product[]> = this.store.select(state => state.products.listproducts);
  isLoading$: Observable<boolean> = this.store.select(state => state.products.isloading);
  cartProducts$: Observable<CartProduct[]> = this.store.select(state => state.productsCart.cartProducts);
  error$: Observable<any> = this.store.select(state => state.products.error);

  form!: FormGroup;

  constructor(private store: Store<{ products: any, productsCart: any }>, private message: NzMessageService,
    private modal: NzModalService, private authService: AuthService, private fb: FormBuilder) {
    this.listProducts = []
    this.cartProducts = []
    this.listProductsOriginal = []
  }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.getProducts())
    this.products$.subscribe((data: any) => {
      if (data != null && data != undefined) {
        this.listProducts = data;
        this.listProductsOriginal = data
      }
    })
    this.cartProducts$.subscribe((data: CartProduct[]) => {
      if (data != null && data != undefined) {
        this.cartProducts = data
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
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      search: ['']
    })
  }

  search() {
    if (this.form.get('search')?.value != null && this.form.get('search')?.value != '') {
      const productsSearch = this.listProductsOriginal.filter(item => item.name.toLocaleLowerCase().includes(this.form.get('search')?.value.toLocaleLowerCase()))
      this.listProducts = productsSearch;
    } else {
      this.listProducts = this.listProductsOriginal;
    }
  }

  showModal(item: any): void {
    const index = this.cartProducts.findIndex(itemCart => itemCart.product.id === item.id)
    const itemCart = this.cartProducts.find(itemCart => itemCart.product.id === item.id)
    this.itemSelect = item;
    this.isCart = index > -1;
    this.index = index;
    this.quantity = itemCart != null ? itemCart.quantity : 1;
    this.isModalProduct = true;
  }

  handleCancel(state: boolean): void {
    this.isModalProduct = state;
  }

  checkProductInCart(id_product: string) {
    return this.cartProducts.find(item => item.product.id === id_product) != null;
  }

  quantityForProduct(id_product: string) {
    const item = this.cartProducts.find(item => item.product.id === id_product);
    return item != null ? item.quantity : 0;
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

  loadingAuth() {
    return this.authService.loading
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
}
