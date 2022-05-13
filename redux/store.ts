import { configureStore } from '@reduxjs/toolkit';

import timeReducer from './time';

export const store = configureStore({
  reducer: {
    app: timeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch