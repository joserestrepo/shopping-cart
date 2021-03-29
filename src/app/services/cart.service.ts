import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  async addProducstCart(productsCart: any) {
    try {
      const batch = this.firestore.firestore.batch()
      const id_user = this.authService.currentUser?.uid;
      const cart = await this.firestore.collection('carts').ref.where("status", "==", "pending").where("user_id", "==", id_user).get()
      productsCart.forEach((item: any) => {
        const data = {
          product_id: item.product.id,
          cart_id: cart.docs[0].id,
          quantity: item.quantity
        }
        let products_ref = this.firestore.collection("product_carts").doc();
        batch.set(products_ref.ref, data);
      });
      let cart_pending_ref = this.firestore.collection("carts").doc(cart.docs[0].id);
      batch.update(cart_pending_ref.ref, { status: 'completed' });
      let cart_ref = this.firestore.collection("carts").doc();
      batch.set(cart_ref.ref, { status: 'pending', user_id: id_user });
      await batch.commit()
      return { success: true, message: 'order created' };
    } catch (error) {
      throw error;
    }
  }

  async getOrdersCreateByUser() {
    try {
      const id_user = this.authService.currentUser?.uid;
      const cart = await this.firestore.collection('carts').ref.where("status", "==", "completed").where("user_id", "==", id_user).get();
      const orderCompletedData = cart.docs.map(async (dataCart) => {
        const dataProductosCart = await this.firestore.collection('product_carts').ref.where("cart_id", "==", dataCart.id).get()
        const listProducts = dataProductosCart.docs.map(async (itemCart) => {
          const dataCart = itemCart.data();
          let objetCart: any;
          if (typeof dataCart === 'object') objetCart = dataCart
          objetCart.product_id
          const productoCart = await this.firestore.collection('products').doc(objetCart.product_id).get().toPromise();
          let product: any
          if (typeof productoCart.data() === 'object') product = productoCart.data()
          return ({
            ...product,
            quantity: objetCart.quantity
          })
        })
        const products = await Promise.all(listProducts);
        return({
          id: dataCart.id,
          products
        })
      }) 
      const orderCompleted = await Promise.all(orderCompletedData);
      return orderCompleted;
    } catch (error) {
      throw error;
    }
  }
}
