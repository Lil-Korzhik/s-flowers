import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../interfaces/IProduct';

interface AuthState {
    products: IProduct[] | []
};

const initialState: AuthState = {
    products: []
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
        state.products = action.payload;
    }
  }
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;