import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
/**
 * Entry application component used to compose providers and render Routes.
 * */

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { LastLocationProvider } from "react-router-last-location";
import { Routes } from "./app/router/Routes";
import { I18nProvider, LayoutSplashScreen, ThemeProvider } from "./_metronic";
import MenuContextProvider from "./_metronic/my_context/MenuContext"
import ProductContextProvider from "./_metronic/my_context/ProductContext"

export default function App({ store, Layout, persistor, basename }) {
  const ref = React.createRef();
  return (
    /* Provide Redux store */
    <Provider store={store} loading={<LayoutSplashScreen />}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      <PersistGate persistor={persistor}>
        {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
        <React.Suspense fallback={<LayoutSplashScreen />}>
          {/* Override `basename` (e.g: `homepage` in `package.json`) */}
          <BrowserRouter basename={basename}>
            {/*This library only returns the location that has been active before the recent location change in the current window lifetime.*/}
            <LastLocationProvider>
              {/* Provide Metronic theme overrides. */}
              <ThemeProvider>
                {/* Provide `react-intl` context synchronized with Redux state.  */}
                <I18nProvider>
                  <MenuContextProvider>
                    <ProductContextProvider>
                    {/* Render routes with provided `Layout`. */}
                    <Routes Layout={Layout} ref={ref}/>
                    </ProductContextProvider>
                  </MenuContextProvider>
                </I18nProvider>
              </ThemeProvider>
            </LastLocationProvider>
          </BrowserRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>
  );
}
