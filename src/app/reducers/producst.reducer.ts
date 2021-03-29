import { createReducer, on } from '@ngrx/store';
import { ProductActions } from '../actions'

export const initialState: any = {
    isloading: false
};

const _productsReducer = createReducer(
    initialState,
    on(ProductActions.getProducts, (state) => {
        return (
            {
                ...state,
                isloading: true
            }
        )
    }),
    on(ProductActions.getProductsSuccess, (state, actions) => {
        return (
            {
                ...state,
                listproducts: actions.products,
                isloading: false
            }
        )
    }),
    on(ProductActions.getProductsFailed, (state, actions) => {
        return (
            {
                ...state,
                errorProducts: actions.error,
                isloading: false
            }
        )
    })
)

export function productsReducer(state: any, action: any) {
    return _productsReducer(state, action)
}