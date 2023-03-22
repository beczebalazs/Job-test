import ReduxStoreProvider from "./providers/storeProvider";
import CustomThemeProvider from "./providers/themeProvider";

import AppRoutes from "./router";

const App = () => {
    return (
        <ReduxStoreProvider>
            <CustomThemeProvider>
                <main className="mt-16">
                    <AppRoutes />
                </main>
            </CustomThemeProvider>
        </ReduxStoreProvider>
    );
};

export default App;
