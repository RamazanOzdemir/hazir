import React from 'react'
import { Redirect, Route, Switch } from "react-router-dom";



const Product = () => {
    return (
        <Switch>
        <Redirect
          exact={true}
          from="/product"
          to="/product/add-product"
        />
  


        </Switch>
    )
}

export default Product
