import React, { useContext } from 'react'
import MyTable from '../components/MyTable'
import {MenuContext} from '../../../../_metronic/my_context/MenuContext'
import {ProductContext} from '../../../../_metronic/my_context/ProductContext'

const SelectProductForMenuCategory = () => {

    //const {screenMenuItems,screenMenuCategories} = useContext(MenuContext)
    const {screenMenuItems,screenMenuCategories,menuItems} = useContext(ProductContext)
    const db = screenMenuItems.map(screenItem => {
        const category = screenMenuCategories.filter(cat => cat.Id === screenItem.ScreenMenuCategoryId);
        const menu_item = menuItems.filter(item => item.Id === screenItem.MenuItemId );
        return {...screenItem,
                MenuItem : menu_item[0] !== undefined ? menu_item[0]['Name'] : '',
                ScreenMenuCategory : category[0] !== undefined ? category[0]['Name'] : ''};
    } );
    return (
        <>
            <MyTable
            porletName={"Add Menu Category"}
            nameList={["Menu Name","Category Name"]} 
            idList={["MenuItem","ScreenMenuCategory"]} 
            db={db}
            tableName='ScreenMenuItems'
            options = {[{name:'Menu Name',ops:menuItems},{name: 'Category Name',ops:screenMenuCategories}]} 
            />
        </>
    )
}

export default SelectProductForMenuCategory
