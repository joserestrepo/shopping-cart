import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { exhaustMap} from 'rxjs/operators';
import { CartService } from '../services/cart.service';

import { ProductsCartActions } from './../actions'

@Injectable()
export class ProductsCartEffects {
    createOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsCartActions.createOrder),
            exhaustMap((actions: any) => this.cartService.addProducstCart(actions.productsCart)
                .then((orderCreate: any) => ProductsCartActions.createOrderSuccess({ orderCreate }))
                .catch(error => ProductsCartActions.createOrderFailed({ error }))
            )
        )
    )

    getOrdersByUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsCartActions.getOrderByUser),
            exhaustMap((actions: any) => this.cartService.getOrdersCreateByUser()
                .then((listOrders: any) => ProductsCartActions.getOrderByUserSuccess({ listOrders }))
                .catch(error => ProductsCartActions.getOrderByUserFailed({ error }))
            )
        )
    )

    constructor(
        private actions$: Actions,
        private cartService: CartService,
    ) { }
}