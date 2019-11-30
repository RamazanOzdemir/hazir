import React from 'react';

import MyTable from '../components/MyTable';

const AddProduct = () => {

    return (
        <MyTable 
        porletName={"Add Product"}
        nameList={["Group Code","Barcode","Tag","Name"]} 
        idList={["GroupCode","Barcode","Tag","Name"]}
        tableName = 'MenuItems'
        option={{}}
        />
    )
}


export default AddProduct
