import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NgZorroAntdModule } from '../ng-zorro-antd.module';
import { DrawerComponent } from './drawer/drawer.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { ModalProductComponent } from './modal-product/modal-product.component';
import { AppRoutingModule } from '../app-routing.module';
import { MenuReponsiveComponent } from './menu-reponsive/menu-reponsive.component';



@NgModule({
  declarations: [NavbarComponent, DrawerComponent, LoginComponent, RegisterComponent, LoaderComponent, ModalProductComponent, MenuReponsiveComponent],
  exports: [NavbarComponent, DrawerComponent, LoginComponent, RegisterComponent, LoaderComponent, ModalProductComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ]
})
export class SharedModule { }
