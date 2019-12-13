import React,{useContext} from 'react';

import MyTable from '../components/MyTable';
import {ProductContext} from '../../../../_metronic/my_context/ProductContext';
import OnlyForm from '../components/OnlyForm';

const AddProduct = () => {
    const {menuItems} = useContext(ProductContext)
    return (
        <OnlyForm 
        porletName={"Add Product"}
        nameList={["Group Code","Barcode","Tag","Name"]} 
        idList={["GroupCode","Barcode","Tag","Name"]}
        initialValues={{GroupCode:"",Barcode:"",Tag:"",Name:""}}
        tableName = 'MenuItems'
        db = {menuItems}
        options = {[]}
        />
    )
}


export default AddProduct
