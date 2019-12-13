import React,{useContext,useEffect} from 'react';
import AddProduct from "./AddProduct";
import {ProductContext} from '../../../../../_metronic/my_context/ProductContext';
import { Tabs,Tab } from 'react-bootstrap';
import {Portlet,PortletBody,PortletHeader} from "../../../../partials/content/Portlet";

const UpdateProduct = (props) => {
    const {menuItems,menuItemPortion,MenuItemPrices,selectedItems,setSelectedItems} = useContext(ProductContext);
    const portions= menuItemPortion.filter(por=>selectedItems.some(s=>s===por.MenuItemId))
    .map((por,index)=>(
        {   
            Id:por.Id,
            Name:por.Name,
            Multiplier:por.Multiplier,
            Price:MenuItemPrices.filter(pri=>pri.MenuItemPortionId==por.Id)[0]&&MenuItemPrices.filter(pri=>pri.MenuItemPortionId==por.Id)[0]['Price'],
            Price_Id:MenuItemPrices.filter(pri=>pri.MenuItemPortionId==por.Id)[0]&&MenuItemPrices.filter(pri=>pri.MenuItemPortionId==por.Id)[0]['Id']
        }))
    const selecteds = menuItems.filter(p=>selectedItems.some(s=>s===p.Id))
    .map(p=>(
        {
            GroupCode:p.GroupCode,
            Barcode:p.Barcode,
            Tag:p.Tag,
            Name:p.Name,
            portions: portions,
            Id: p.Id
        }));
    useEffect(() => {
        
        return () => {
            setSelectedItems([])
        };
    }, [setSelectedItems])

    return (
        <Portlet className="h-100 overflow-auto"  >
        <PortletHeader title="Update Products" />
            <PortletBody className=" overflow-auto" >
            <Tabs>
            {
                selecteds.map((item,index)=>(
                    <Tab title={item.Name} eventKey={item.Name} >
                        <AddProduct className="border"
                          porletName={null}
                          nameList={["Group Code","Barcode","Tag","Name",]} 
                          idList={["GroupCode","Barcode","Tag","Name",]}
                          initialValues={item}
                          subForm = {["Name","Multiplier","Price"]}
                          update ={true}
                          Sid= {item.Id}
                          options = {[]}
                        /> 
                    </Tab>
                ))
            }
        </Tabs>
        </PortletBody>
        </Portlet>
    )
}

export default UpdateProduct;

