import React,{useContext} from 'react';

import MyTable from '../components/MyTable';
import OnlyList from '../components/OnlyList';
import {ProductContext} from '../../../../_metronic/my_context/ProductContext';

const AddProduct = () => {
    const {menuItems,menuItemPortion} = useContext(ProductContext);
    const db = menuItemPortion.map(portion => {
        const menu_item = menuItems.filter(item => item.Id === portion.MenuItemId);
        return {...portion,MenuItemId : menu_item[0] != null?menu_item[0]['Name']:''};
    } );
    return (
        <OnlyList 
        porletName={"Add Product Portion"} 
        nameList={["Product Name","Portion Name","Multiplier"]} 
        db={db}
        idList={["MenuItemId","Name","Multiplier"]}
        initialValues={{MenuItemId:"",Name:"",Multiplier:""}}
        tableName = 'MenuItemPortions'
        options = {[{name:'Product Name',ops:menuItems}]}
        />
    )
}


export default AddProduct
