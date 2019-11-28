import React from 'react'
import { Redirect, Route, Switch } from "react-router-dom";
import AddMenu from "./AddMenu";
import AddMenuCategory from "./AddMenuCategory";
import SelectProductForMenuCategory from "./SelectProductForMenuCategory";

const Menu = () => {
    return (
        <Switch>
            <Redirect
              exact={true}
              from="/menus"
              to="/menus/add-menu"
            />
    
            <Route 
              path="/menus/add-menu" 
              component={AddMenu} 
            />
            <Route 
              path="/menus/add-menu-category" 
              component={AddMenuCategory} 
            />
            <Route 
              path="/menus/select-product-for-menu-category" 
              component={SelectProductForMenuCategory} 
            />
        </Switch>
    )
}

export default Menu
