import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer'
import productReducer from './reducers/ProductReducer'

const rootReducer = combineReducers({
  cart: cartReducer,
  product: productReducer
});

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
