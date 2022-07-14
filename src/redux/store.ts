import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './slices/productsSlice';
import categorySlice from './slices/categorySlice';

const store = configureStore({
  reducer: {
    productsSlice,
    categorySlice
  },
  devTools: true,
  middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false})
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;