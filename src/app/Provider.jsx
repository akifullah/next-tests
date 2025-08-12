"use client"
import { Provider } from "react-redux";
import { store, persistor } from "../../store/store";
import { makeStore } from '../../store/store';
import { PersistGate } from "redux-persist/integration/react";

function ReduxProvider({ children: any, initialState: any  }) {

    const store = makeStore(initialState, { isServer: false });
    const persistor = store.__persistor;
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}

export default ReduxProvider;