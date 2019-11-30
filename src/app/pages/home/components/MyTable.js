import React,{useState, useContext, useEffect} from 'react';
import {Portlet,PortletBody,PortletHeader} from "../../../partials/content/Portlet";
import Table from 'react-bootstrap/Table'
import {Form,Button} from 'react-bootstrap'
import axios from 'axios';
import {MenuContext} from '../../../../_metronic/my_context/MenuContext';
import { optionalCallExpression } from '@babel/types';

const addItemList = (setItem,data,items,setData,e)=>{
    setItem([...items,data]);
    setData({});
    const inputs = document.getElementsByClassName('input-form');
    for(let i=0 ; i<inputs.length ; i++){
          inputs[i].value='';
    }
        

};

const handleChange = (setData,data,e)=>{
   console.log(e.target.value)
    setData({...data,[e.target.id]:e.target.value})
};

const deleteItem = (items,setItem,index)=>{
   
    setItem(items.filter((item,indx)=>indx !== index));
};
const deleteDB = (table,deleteDbItem,dbId)=>{
  deleteDbItem(table,dbId);
}
const handleSubmit = (items,addItem,tableName,e)=>{
  console.log(items);
 
  addItem(tableName,items.map(item=>({...item,ItemType:1})));

};        



      

const MyTable = (props) => {
    const {porletName,nameList,idList,tableName,option} = props
    const [items,setItem] = useState([]); 
    const [data,setData] = useState({});
    const [dbList,setDbList] = useState([]);
    const {allList,menuItems,menuItemPortion,MenuItemPrices,addItem,deleteDbItem} = useContext(MenuContext);
    useEffect(()=>{
      if( tableName === 'MenuItems' )
        setDbList(menuItems)
      else if( tableName === 'MenuItemPortions' )
        setDbList(menuItemPortion)
      else if( tableName === 'MenuItemPrices' )
        setDbList(MenuItemPrices)
    },[dbList,setDbList]);
    return (
        <Portlet>
            <PortletHeader title={porletName} />
                <PortletBody>
                    <Table striped bordered hover size="sm"  responsive>
                      <thead>
                        <tr>
                          <th className='text-center'>#</th>
                          {
                              nameList.map(it=>(
                                  <th className='text-center'>{it}</th>
                              ))
                          }
                        </tr>
                      </thead>
                      <tbody>
                          {
                            dbList.map((item,index)=>(
                                <tr key={`${item} key ${index}`}>
                                    <td className='text-center'>{index}</td>
                                    {
                                        idList.map(header=>(
                                           <td className='text-center'>{item[`${header}`]}</td> 
                                        ))
                                    }
                                    <td className='text-center'><i className='flaticon-close' onClick={deleteDB.bind(this,tableName,deleteDbItem,item.Id)}></i></td>
                                </tr>
                            ))
                          }
                          {
                            items.map((item,index)=>(
                                <tr key={`${item} key ${index}`}>
                                    <td className='text-center'>{index}</td>
                                    {
                                        idList.map(header=>(
                                           <td className='text-success text-center'>{item[`${header}`]}</td> 
                                        ))
                                    }
                                    <td className='text-center'><i className='flaticon-close' onClick={deleteItem.bind(this,items,setItem,index)}></i></td>
                                </tr>
                            ))
                          }
                        <tr>
                          <td></td>
                          {
                              nameList.map((name,index)=>{
                                if (option.name !== name)
                                return(
                                <td>{ <Form.Control className='input-form ' onChange={handleChange.bind(this,setData,data)} size="sm" id={idList[index]} type="text" placeholder={name}/>}</td>
                                )
                                else
                                return(
                                  <Form.Control as="select" className='input-form ' onChange={handleChange.bind(this,setData,data)} id={idList[index]}>
                                    {option.ops.map(menuItem=>(
                                      <option value={menuItem.Name}>{menuItem.Name}</option>
                                    ))
                                    
                                    }
                                  </Form.Control>
                                )
                              })
                          }
                          <td>{<Button className='col align-self-center' variant="outline-success" size='sm' onClick={addItemList.bind(this,setItem,data,items,setData)}>Add</Button>}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <button onClick={handleSubmit.bind(this,items,addItem,tableName )}>fff</button>
                </PortletBody>
        </Portlet>

    )
}


export default MyTable;
