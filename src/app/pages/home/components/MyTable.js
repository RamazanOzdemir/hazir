import React,{useState} from 'react';
import {Portlet,PortletBody,PortletHeader} from "../../../partials/content/Portlet";
import Table from 'react-bootstrap/Table'
import {Form,Button} from 'react-bootstrap'
import axios from 'axios';
import { lastDayOfDecade } from 'date-fns';

const addItemList = (setItem,data,items,setData,e)=>{
    setItem([...items,data]);
    setData({});
    const inputs = document.getElementsByClassName('input-form');
    for(let i=0 ; i<inputs.length ; i++)
        inputs[i].value='';

};

const handleChange = (setData,data,e)=>{
    setData({...data,[e.target.id]:e.target.value})
};

const deleteItem = (items,setItem,index)=>{
    setItem(items.filter((item,indx)=>indx !== index));
};

const handleSubmit = ()=>{
  //const instance = axios.create({
  //  baseURL: 'http://167.71.169.236/api/',
  //  timeout: 1000,
  //  headers: {'X-Custom-Header': 'foobar'}
  //});
  //
//
  //  instance.post('', {table:"MenuItems"})
  //  .then(res=>console.log(res))
  //  .catch(err=>console.log(err));

    fetch('http://167.71.169.236/api/',{
      method:'POST',
      body:JSON.stringify({table:"MenuItems",ItemType:1}),
      headers: {'Content-Type': 'application/json'}
    }).then(res=>res.json())
    .then(re=>console.log(re))
    .catch(err=>console.log(err));
    
};        



      

const MyTable = (props) => {
    const {porletName,nameList,idList,dbList} = props
    const [items,setItem] = useState([]); 
    const [data,setData] = useState({});
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
                                           <td className='text-success'>{item[`${header}`]}</td> 
                                        ))
                                    }
                                    <td className='text-center'><i className='flaticon-close' onClick={deleteItem.bind(this,items,setItem,index)}></i></td>
                                </tr>
                            ))
                          }
                          {
                            items.map((item,index)=>(
                                <tr key={`${item} key ${index}`}>
                                    <td className='text-center'>{index}</td>
                                    {
                                        idList.map(header=>(
                                           <td className='text-success'>{item[`${header}`]}</td> 
                                        ))
                                    }
                                    <td className='text-center'><i className='flaticon-close' onClick={deleteItem.bind(this,items,setItem,index)}></i></td>
                                </tr>
                            ))
                          }
                        <tr>
                          <td></td>
                          {
                              nameList.map((name,index)=>(
                                <td>{ <Form.Control className='input-form ' onChange={handleChange.bind(this,setData,data)} size="sm" id={idList[index]} type="text" placeholder={name}/>}</td>
                              ))
                          }
                          <td>{<Button className='col align-self-center' variant="outline-success" size='sm' onClick={addItemList.bind(this,setItem,data,items,setData)}>Add</Button>}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <button onClick={handleSubmit}>fff</button>
                </PortletBody>
        </Portlet>

    )
}


export default MyTable;
