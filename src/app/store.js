import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import  sampleSearchReducer from '../features/sampleSearch/sampleSearchSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    sampleSearch: sampleSearchReducer
  },
});
