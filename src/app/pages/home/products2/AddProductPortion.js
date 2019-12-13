import React,{useContext} from 'react'
import MyTable from '../components/MyTable';
import {ProductContext} from '../../../../_metronic/my_context/ProductContext';


const AddProductPortion = () => {
    const {menuItems,menuItemPortion} = useContext(ProductContext);
    const db = menuItemPortion.map(portion => {
        const menu_item = menuItems.filter(item => item.Id === portion.MenuItemId);
        return {...portion,MenuItem : menu_item[0] != null?menu_item[0]['Name']:''};
    } );
    return (
        <MyTable 
        porletName={"Add Product Portion"} 
        nameList={["Product Name","Portion Name","Multiplier"]} 
        idList={["MenuItem","Name","Multiplier"]}
        db = {db}
        tableName = 'MenuItemPortions'
        options = {[{name:'Product Name',ops:menuItems}]} />
    )
}

export default AddProductPortion;
