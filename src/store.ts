import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import todoReducer from './features/TodoSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['todos'],
};

const persistedReducer = persistReducer(persistConfig, todoReducer);

const store = configureStore({
  reducer: {
    todos: persistedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch<AppDispatch>();
