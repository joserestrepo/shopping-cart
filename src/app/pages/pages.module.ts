import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from '../ng-zorro-antd.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [HomeComponent, OrdersComponent],
  exports: [HomeComponent, OrdersComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class PagesModule { }
