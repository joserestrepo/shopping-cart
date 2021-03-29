import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { ProductsCartActions } from 'src/app/actions';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css']
})
export class ModalProductComponent implements OnInit {
  @Input() item: any;
  @Input() modalVisible: boolean = false;
  @Input() isCart: boolean = false;
  @Input() quantity: number = 1;
  @Input() index: number = 0;
  @Output() closeModal = new EventEmitter<boolean>();
  constructor(private store: Store<{ products: any, productsCart: any }>, private message: NzMessageService, private modal: NzModalService) { }

  ngOnInit(): void { }

  handleCancel(): void {
    this.quantity = 1;
    this.closeModal.emit(false);
  }

  addProduct() {
    const itemCart = {
      product: this.item,
      quantity:  this.quantity
    }
    this.store.dispatch(ProductsCartActions.addProductCart({ itemCart }))
    this.handleCancel();
  }

  deleteProduct() {
    const index = this.index
    this.store.dispatch(ProductsCartActions.deleteProductCart({ index }))
    this.handleCancel();
  }

  editProduct() {
    if (this.quantity == 0) {
      this.deleteProduct();
    } else {
      const itemCart = {
        product: this.item,
        quantity: this.quantity
      }
      const index = this.index
      this.store.dispatch(ProductsCartActions.editProductCart({ itemCart, index }))
      this.handleCancel();
    }
  }

  editQuatity(quantity:number){
    this.quantity = quantity;
  }

}
