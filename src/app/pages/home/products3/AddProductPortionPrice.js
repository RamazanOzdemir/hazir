import React,{useContext} from 'react'
import MyTable from '../components/MyTable';
import {ProductContext} from '../../../../_metronic/my_context/ProductContext';

const AddProductPortionPrice = () => {
    const {menuItems,menuItemPortion,MenuItemPrices} = useContext(ProductContext);
    const db = MenuItemPrices.map(price => {
        const menu_portion = menuItemPortion.filter(portion => portion.Id === price.MenuItemPortionId);
        const menu_item = menuItems.filter(item => item.Id === (menu_portion[0] === undefined ? -1 : menu_portion[0].MenuItemId) );
        return {...price,
                MenuItem : menu_item[0] !== undefined ? menu_item[0]['Name'] : '',
                MenuItemPortion : menu_portion[0] !== undefined ? menu_portion[0]['Name'] : ''};
    } );
    return (
        <div>
            <MyTable 
            porletName={"Add Product Portion Price"} 
            nameList={["Product Name","Portion Name","Price Tag","Price"]} 
            idList={["MenuItem","MenuItemPortion","PriceTag","Price"]} 
            tableName = 'MenuItemPrices'
            db = {db}
            options = {[{name:'Product Name',ops:menuItems},{name: 'Portion Name',ops:[]}]} 
            />
        </div>
    )
}

export default AddProductPortionPrice;
