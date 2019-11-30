import React,{useContext} from 'react'
import MyTable from '../components/MyTable';
import {MenuContext} from '../../../../_metronic/my_context/MenuContext';


const AddProductPortion = () => {
    const {menuItems} = useContext(MenuContext)
    return (
        <MyTable 
        porletName={"Add Product Portion"} 
        nameList={["Name","Multiplier"]} 
        idList={["name","multiplier"]}
        option={{name:'Name',ops:menuItems}} />
    )
}

export default AddProductPortion;
