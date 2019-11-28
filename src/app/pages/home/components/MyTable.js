import React,{useState} from 'react';
import {Portlet,PortletBody,PortletHeader} from "../../../partials/content/Portlet";
import Table from 'react-bootstrap/Table'
import {Form,Button} from 'react-bootstrap'


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
}
const MyTable = (props) => {
    const {porletName,nameList,idList} = props
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
                                  <th>{it}</th>
                              ))
                          }
                        </tr>
                      </thead>
                      <tbody>
                          {
                            items.map((item,index)=>(
                                <tr key={`${item} key ${index}`}>
                                    <td className='text-center'>{index}</td>
                                    {
                                        idList.map(header=>(
                                           <td>{item[`${header}`]}</td> 
                                        ))
                                    }
                                    <td className='text-center'><i className='flaticon-close' onClick={deleteItem.bind(this,items,setItem,index)}></i></td>
                                </tr>
                            ))
                          }
                        <tr>
                          <td>{<Button className='col align-self-center' variant="outline-success" size='sm' onClick={addItemList.bind(this,setItem,data,items,setData)}>Add</Button>}</td>
                          {
                              nameList.map((name,index)=>(
                                <td>{ <Form.Control className='input-form' onChange={handleChange.bind(this,setData,data)} size="sm" id={idList[index]} type="text" placeholder={name}/>}</td>
                              ))
                          }
                        </tr>
                      </tbody>
                    </Table>
                </PortletBody>
        </Portlet>

    )
}


export default MyTable;
