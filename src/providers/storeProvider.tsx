import { FC, ReactNode } from "react";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "../store";

const ReduxStoreProvider: FC<{ children: ReactNode }> = (props) => {
    return (
        <StoreProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {props.children}
            </PersistGate>
        </StoreProvider>
    );
};

export default ReduxStoreProvider;
