import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Product } from './../models/product.model'
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore: AngularFirestore) { }

  async getProducts() {

    try {
      const data = await this.firestore.collection('products').get().toPromise()
      return data.docs.map((item: any) => {
        return ({
          id: item.id,
          ...item.data()
        } as Product)
      })
    } catch (error) {
      throw error;
    }
  }
}
