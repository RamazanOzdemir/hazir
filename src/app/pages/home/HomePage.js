import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Builder from "./Builder";
import Dashboard from "./Dashboard";
import DocsPage from "./docs/DocsPage";
import { LayoutSplashScreen } from "../../../_metronic";
import Product from "./products/Product";
import Menu from "./menus/Menu";
import AddProduct from "./products/AddProduct";
import AddProductPortion from "./products/AddProductPortion";
import AddProductPortionPrice from "./products/AddProductPortionPrice";
import BatchPriceChange from "./products/BatchPriceChange";
import BatchProductAdd from "./products/BatchProductAdd";

//const GoogleMaterialPage = lazy(() =>
//  import("./google-material/GoogleMaterialPage")
//);
//const ReactBootstrapPage = lazy(() =>
//  import("./react-bootstrap/ReactBootstrapPage")
//);

export default function HomePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard.*/ 
          <Redirect exact from="/" to="/dashboard" />
        }
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/menus/" component={Menu} />
        <Route exact
          path="/product/add-product" 
          component={AddProduct} 
        />
        <Route 
          path="/product/add-roduct-portion" 
          component={AddProductPortion} 
        />
        <Route 
          path="/product/add-product-portion-price" 
          component={AddProductPortionPrice} 
        />
        <Route 
          path="/product/batch-price-change" 
          component={BatchPriceChange} 
        />
        <Route 
          path="/product/batch-product-add" 
          component={BatchProductAdd} 
        />
        <Redirect to="/error/error-v1" />
      </Switch>
    </Suspense>
  );
}
