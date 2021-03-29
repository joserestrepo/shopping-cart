import { productsReducer } from './producst.reducer'
import { authReducer } from './auth.reducer'
import { productsCartReducer } from './productsCart.reducer'

export default {
    products: productsReducer,
    auth: authReducer,
    productsCart: productsCartReducer
}