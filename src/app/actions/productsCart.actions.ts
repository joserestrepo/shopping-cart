import { createAction, props } from '@ngrx/store';
import { CartProduct } from '../models/carProduct.model';

const getProductsCart = createAction('GET_PRODUCTS_CART');
const addProductCart = createAction('ADD_PRODUCT_CART', props<{itemCart: CartProduct}>());
const deleteProductCart = createAction('DELETE_PRODUCT_CART', props<{index: number}>());
const editProductCart = createAction('EDIT_PRODUCT_CART', props<{itemCart: CartProduct, index: number}>());
const cleanProductsCart = createAction('CLEAN_PRODUCTS_CART');

const createOrder = createAction('CREATE_ORDER', props<{productsCart: CartProduct[]}>());
const createOrderSuccess = createAction('CREATE_ORDER_SUCCESS', props<{orderCreate: any}>());
const createOrderFailed = createAction('CREATE_ORDER_FAILED', props<{error: any}>());

const getOrderByUser = createAction('GET_ORDER_BY_USER');
const getOrderByUserSuccess = createAction('GET_ORDER_BY_USER_SUCCESS', props<{listOrders: any}>());
const getOrderByUserFailed = createAction('GET_ORDER_BY_USER_FAILED', props<{error: any}>());

export default {
    getProductsCart,
    deleteProductCart,
    editProductCart,
    cleanProductsCart,
    addProductCart,
    createOrder,
    createOrderSuccess,
    createOrderFailed,
    getOrderByUser,
    getOrderByUserSuccess,
    getOrderByUserFailed
}