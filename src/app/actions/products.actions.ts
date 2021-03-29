import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';

const getProducts = createAction('GET_PRODUCTS');
const getProductsSuccess = createAction('GET_PRODUCTS_SUCCESS', props<{products: Product[]}>());
const getProductsFailed = createAction('GET_PRODUCTS_FAILED', props<{error: any}>());

export default {
    getProducts,
    getProductsSuccess,
    getProductsFailed
}