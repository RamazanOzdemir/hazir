import React from 'react'
import MyTable from '../components/MyTable';

const AddProductPortionPrice = () => {
    return (
        <div>
            <MyTable porletName={"Add Product Portion Price"} nameList={["Price Tag","Price"]} idList={["priceTag","price"]} />

        </div>
    )
}

export default AddProductPortionPrice;
