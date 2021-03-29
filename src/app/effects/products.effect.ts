import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { ProductActions } from './../actions'

import { ProductsService } from './../services/products.service'

@Injectable()
export class ProductsEffects {
    getProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.getProducts),
            exhaustMap((actions: any) => this.productService.getProducts()
                .then((products: any) => ProductActions.getProductsSuccess({ products }))
                .catch(error => ProductActions.getProductsFailed({ error }))
            )
        )
    )

    constructor(
        private actions$: Actions,
        private productService: ProductsService,
    ) { }
}