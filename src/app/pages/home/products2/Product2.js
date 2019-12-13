import React from 'react'
import { Redirect, Route, Switch } from "react-router-dom";
import AddProduct from "./AddProduct";
import AddProduct_other from "./AddProduct_other";
import AddProduct_form from "./AddProduct_form";
import ProductList from "./ProductList";
import AddProductPortion from "./AddProductPortion-1";


const Product = () => {
    return (
        <Switch>
        <Redirect
          exact={true}
          from="/product2"
          to="/product2/add-product"
        />
         <Route exact
          path="/product2/add-product-modal" 
          component={AddProduct} 
        />
        <Route 
          path="/product2/add-product-form" 
          component={AddProduct_form} 
        />
        <Route 
          path="/product2/add-product-other" 
          component={AddProduct_other} 
        />
        <Route 
          path="/product2/product-list" 
          component={ProductList} 
        />
        <Route 
          path="/product2/add-product-portion-modal" 
          component={AddProductPortion} 
        />
  


        </Switch>
    )
}

export default Product
