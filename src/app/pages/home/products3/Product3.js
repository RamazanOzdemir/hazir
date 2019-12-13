import React from 'react'
import { Redirect, Route, Switch } from "react-router-dom";
import AddProduct from "./AddProduct";
import AddProduct_other from "./AddProduct_other";
import AddProduct_form from "./AddProduct_form";
import Products from "./Products";
import AddProductPortion from "./AddProductPortion-1";
import ProductTagEditor from './ProductTagEditor';


const Product = () => {
    return (
        <Switch>
        <Redirect
          exact={true}
          from="/product3"
          to="/product3/add-product"
        />
         <Route exact
          path="/product3/product-tag-editor" 
          component={ProductTagEditor} 
        />
        <Route 
          path="/product3/add-product-other" 
          component={AddProduct_other} 
        />
        <Route 
          path="/product3/products" 
          component={Products} 
        />
        <Route 
          path="/product3/add-product-portion-modal" 
          component={AddProductPortion} 
        />
  


        </Switch>
    )
}

export default Product
