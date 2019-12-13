import React,{useContext} from 'react';

import {ProductContext} from '../../../../_metronic/my_context/ProductContext';
import OnlyProductList from '../components/OnlyProductList';

const ProductList = () => {
    const {menuItems} = useContext(ProductContext)
    return (
        <OnlyProductList 
        porletName={"Product List"}
        nameList={["Group Code","Barcode","Tag","Name"]} 
        idList={["GroupCode","Barcode","Tag","Name"]}
        initialValues={{GroupCode:"",Barcode:"",Tag:"",Name:""}}
        tableName = 'MenuItems'
        db = {menuItems}
        options = {[]}
        />
    )
}


export default ProductList;
