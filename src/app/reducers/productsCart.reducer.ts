import { createReducer, on } from '@ngrx/store';
import { ProductsCartActions } from '../actions'
import { save, get, remove } from './../utils/sesionStorage';

export const initialState: any = {
    isLoadingCreateOrder: false,
    isLoadingGetOrder: false
};

const _productsCartReducer = createReducer(
    initialState,
    on(ProductsCartActions.getProductsCart, (state) => {
        const sesionCart = get("@cartProducts");
        return ({
            ...state,
            cartProducts: sesionCart != null ? JSON.parse(sesionCart) : []
        })
    }),
    on(ProductsCartActions.addProductCart, (state, actions) => {
        const cartCopy = Object.assign([],state.cartProducts)
        cartCopy.push(actions.itemCart);
        save("@cartProducts", JSON.stringify(cartCopy));
        return ({
            ...state,
            cartProducts: cartCopy
        })
    }),
    on(ProductsCartActions.editProductCart, (state, actions) => {
        const cartCopy = Object.assign([],state.cartProducts)
        cartCopy[actions.index] = actions.itemCart;
        save("@cartProducts", JSON.stringify(cartCopy));
        return ({
            ...state,
            cartProducts: cartCopy
        })
    }),
    on(ProductsCartActions.deleteProductCart, (state, actions) => {
        const cartCopy = Object.assign([],state.cartProducts)
        cartCopy.splice(actions.index, 1);
        save("@cartProducts", JSON.stringify(cartCopy));
        return ({
            ...state,
            cartProducts: cartCopy
        })
    }),
    on(ProductsCartActions.cleanProductsCart, (state, actions) => {
        remove("@cartProducts");
        return ({
            ...state,
            cartProducts: []
        })
    }),

    on(ProductsCartActions.createOrder, (state) => {
        return (
            {
                ...state,
                isLoadingCreateOrder: true
            }
        )
    } ),
    on(ProductsCartActions.createOrderSuccess, (state, actions) => {
        return (
            {
                ...state,
                orderCreate: actions.orderCreate,
                isLoadingCreateOrder: false
            }
        )
    }),
    on(ProductsCartActions.createOrderFailed, (state, actions) => { 
        return (
            {
                ...state,
                errorProductsCart: actions.error,
                isLoadingCreateOrder: false
            }
        )
     }),

     on(ProductsCartActions.getOrderByUser, (state) => {
        return (
            {
                ...state,
                isLoadingGetOrder: true
            }
        )
    } ),
    on(ProductsCartActions.getOrderByUserSuccess, (state, actions) => {
        return (
            {
                ...state,
                listOrders: actions.listOrders,
                isLoadingGetOrder: false
            }
        )
    }),
    on(ProductsCartActions.getOrderByUserFailed, (state, actions) => { 
        return (
            {
                ...state,
                errorGetOrders: actions.error,
                isLoadingGetOrder: false
            }
        )
     })
)

export function productsCartReducer(state: any, action: any) {
    return _productsCartReducer(state, action)
}