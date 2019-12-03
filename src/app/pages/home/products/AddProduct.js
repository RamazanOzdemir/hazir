import React,{useContext} from 'react';

import MyTable from '../components/MyTable';
import {ProductContext} from '../../../../_metronic/my_context/ProductContext';

const AddProduct = () => {
    const {menuItems} = useContext(ProductContext)
    return (
        <MyTable 
        porletName={"Add Product"}
        nameList={["Group Code","Barcode","Tag","Name"]} 
        idList={["GroupCode","Barcode","Tag","Name"]}
        tableName = 'MenuItems'
        db = {menuItems}
        options = {[]}
        />
    )
}


export default AddProduct
