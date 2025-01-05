import { configureStore } from '@reduxjs/toolkit';
import { numbersApi } from '../features/numbers/api';

export const store = configureStore({
  reducer: {
    [numbersApi.reducerPath]: numbersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(numbersApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
