import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // You can choose your storage solution
import userReducer from './userSlice'
import taskReducer from './taskSlice'
import searchReducer from './searchSlice'


const rootReducer = combineReducers({
  user: userReducer,
  task: taskReducer,
  search: searchReducer,
});

const persistConfig = {
  key: 'root', // Change this key if you have multiple storage configurations
  storage, // This is where you choose your storage solution
  
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor }; // Export both store and persistor
