import React from 'react'
import MyTable from '../components/MyTable';


const AddProductPortion = () => {
    return (
        <MyTable porletName={"Add Product Portion"} nameList={["Name","Multiplier"]} idList={["name","multiplier"]} />
    )
}

export default AddProductPortion;
