import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthActions, ProductsCartActions } from 'src/app/actions';
import { AuthService } from 'src/app/services/auth.service';
import { CartProduct } from 'src/app/models/carProduct.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  visible: boolean = false;
  visibleMenu: boolean = false;
  width: string = '';
  modalVisible = false;
  modalVisibleRegister = false;
  cartProducts: CartProduct[];
  logout: any;
  isloading: boolean;
  error: any;
  logout$: Observable<any> = this.store.select(state => state.auth.logout);
  isLoading$: Observable<boolean> = this.store.select(state => state.auth.isloadingLogOut);
  error$: Observable<any> = this.store.select(state => state.auth.errorLogout);
  cartProducts$: Observable<CartProduct[]> = this.store.select(state => state.productsCart.cartProducts);

  constructor(private store: Store<{ auth: any, productsCart:any }>, private message: NzMessageService, private authService: AuthService) {
    this.cartProducts = [];
    this.isloading = false
   }

  ngOnInit(): void {
    this.store.dispatch(ProductsCartActions.getProductsCart())
    this.logout$.subscribe((data: any) => {
      if (data != null && data != undefined) {
        this.logout = data
        if (data.success) {
          window.location.reload()
        }
      }
    })
    this.isLoading$.subscribe((data: any) => {
      this.isloading = data
    })
    this.cartProducts$.subscribe((data: CartProduct[]) => {
      if (data != null && data != undefined) {
        this.cartProducts = data
      }
    })
    this.error$.subscribe((data: any) => {
      if (data != null && data != undefined) {
        this.message.create('error', `Ah ocurrido un error inesperado al registrar, por favor inténtalo mas tarde`);
        this.error = data
      }
    })
  }

  open(width:string): void {
    this.width = width;
    this.visible = true;
  }

  close(state: boolean): void {
    this.visible = state;
  }

  openMenu(): void {
    this.visibleMenu = true;
  }

  closeMenu(state: boolean): void {
    this.visibleMenu = state;
  }

  showModal(state: boolean): void {
    this.modalVisible = state;
  }

  handleCancel(state: boolean): void {
    this.modalVisible = state;
  }

  showModalRegister(state: boolean): void {
    this.modalVisibleRegister = state;
  }

  handleCancelRegister(state: boolean): void {
    this.modalVisibleRegister = state;
  }

  checkSesion() {
    return this.authService.authenticated;
  }

  getName() {
    return this.authService.currentUser?.displayName;
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}
