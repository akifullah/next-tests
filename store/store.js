import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { api } from "./api";
import counterReducer from "./slices/counterSlice";

const rootReducer = combineReducers({
    counter: counterReducer,
    [api.reducerPath]: api.reducer,
});

const persistedConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistedConfig, rootReducer);

export const makeStore = (preloadedState = {}, { isServer = false } = {}) => {
    const reducer = isServer
        ? rootReducer // ✅ no persist on server
        : persistReducer(persistedConfig, rootReducer);

    const store = configureStore({
        reducer, // ✅ use the correct one
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false
            }).concat(api.middleware),
        preloadedState,
    });

    setupListeners(store.dispatch);

    if (!isServer) {
        store.__persistor = persistStore(store); // only for client
    }

    return store;
};



export const store = makeStore();
export const persistor = persistStore(store);