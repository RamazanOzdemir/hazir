import React from 'react'
import { Redirect, Route, Switch } from "react-router-dom";
import AddProduct from "./AddProduct";
import AddProductPortion from "./AddProductPortion";
import AddProductPortionPrice from "./AddProductPortionPrice";
import BatchPriceChange from "./BatchPriceChange";
import BatchProductAdd from "./BatchProductAdd";


const Product = () => {
    return (
        <Switch>
        <Redirect
          exact={true}
          from="/product"
          to="/product/add-product"
        />
  
        <Route 
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
        </Switch>
    )
}

export default Product
