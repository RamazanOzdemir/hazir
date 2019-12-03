import React,{useState, useContext, useEffect} from 'react';
import {Portlet,PortletBody,PortletHeader} from "../../../partials/content/Portlet";
import Table from 'react-bootstrap/Table'
import {Form,Button,Modal} from 'react-bootstrap'
import {MenuContext} from '../../../../_metronic/my_context/MenuContext';
import {ProductContext} from '../../../../_metronic/my_context/ProductContext';


const MyTable = (props) => {
    const {porletName,nameList,idList,tableName,options,db} = props
    const [items,setItem] = useState([]); 
    const [data,setData] = useState({});
    const [show,setShow] = useState({show:false,id:0,method:()=>{}});
    const {screenMenuCategories,menuItems,menuItemPortion,MenuItemPrices,addItem,deleteDbItem,getAllList} = useContext(ProductContext);
    //const {screenMenuCategories} = useContext(MenuContext);
    useEffect(()=>{
      getAllList();
      
    },[]);

    const addItemList = (e)=>{
      setItem([...items,data]);
      setData({});
      const inputs = document.getElementsByClassName('input-form');
      for(let i=0 ; i<inputs.length ; i++){
            inputs[i].value='';
      }    
  };

    const handleChange = (e)=>{
        if(e.target.name === 'select'&&e.target.id==='MenuItem'){
          setData({...data,
                  [e.target.id]:menuItems.filter(x=>x.Id == e.target.value)[0]['Name'],
                  [`${e.target.id}Id`]:menuItems.filter(x=>x.Id==e.target.value)[0]['Id']
                  })
          const op2 = options.filter(op=>op.name==='Portion Name')
          if(op2[0] !== undefined){
          op2[0].ops=menuItemPortion.filter(portion=>portion.MenuItemId == e.target.value);
          }
        }
        else if(e.target.name === 'select'&&e.target.id==='MenuItemPortion'){
          setData({...data,
                  [e.target.id]:menuItemPortion.filter(x=>x.Id==e.target.value)[0]['Name'],
                  [`${e.target.id}Id`]:menuItemPortion.filter(x=>x.Id==e.target.value)[0]['Id']})
        }
        else if(e.target.name === 'select'&&e.target.id==='ScreenMenuCategory'){
          setData({...data,
                  [e.target.id]:screenMenuCategories.filter(x=>x.Id==e.target.value)[0]['Name'],
                  [`${e.target.id}Id`]:screenMenuCategories.filter(x=>x.Id==e.target.value)[0]['Id']})
        }
        else
        setData({...data,[e.target.id]:e.target.value})
        if ( tableName === 'MenuItemPortions'){
          options.forEach(element => {
            if(element.name === 'Portion Name'){

            }

          });
        }
    };
    

    const deleteItem = (index,e)=>{
      setItem(items.filter((item,indx)=>indx !== index));
      closeModal();
    };
    const deleteDB = (dbId,e)=>{
      deleteDbItem(tableName,dbId);
      closeModal();
    }

    const handleSubmit = (e)=>{
      
      const v_items = items.map(item=>{
        idList.forEach(id=>{
          if(item[`${id}`]===undefined)
              item[`${id}`]=''
        })
      })
      if(tableName==='MenuItems'){
        addItem(tableName,items.map(item=>({...item,ItemType:1})));
        
      }
      else
      addItem(tableName,items);
      
      setItem([]);
    
    };
    const closeModal = ()=>{
      setShow({show:false,id:0,method:deleteDB});
    }
    const openModal = (id,method,e)=>{
      setShow({show:true,id:id,method:method});
    };  
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
                            db.map((item,index)=>(
                                <tr key={`${item} key ${index}`}>
                                    <td className='text-center'>{index}</td>
                                    {
                                        idList.map(header=>(
                                           <td className='text-center'>{item[`${header}`]}</td> 
                                        ))
                                    }
                                    <td className='text-center'><i className='flaticon-close' onClick={openModal.bind(this,item.Id,deleteDB)}></i></td>
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
                                    <td className='text-center'><i className='flaticon-close' onClick={openModal.bind(this,index,deleteItem)}></i></td>
                                </tr>
                            ))
                          }
                        <tr>
                          <td></td>
                          {
                              nameList.map((name,index)=>{
                                const ops = options.filter(option =>option.name === name )
                                if (ops.length > 0)
                                return(
                                  <td>
                                    <Form.Control as="select" className='input-form ' onChange={handleChange} id={idList[index]} name='select'>
                                      <option value={null}> ... </option>
                                    {ops[0].ops.map(menuItem=>(
                                      <option value={menuItem.Id}>{menuItem.Name}</option>
                                    ))
                                  
                                  }
                                </Form.Control></td>
                                )
                                else
                                return(
                                  <td>{ <Form.Control className='input-form ' onChange={handleChange} size="sm" id={idList[index]} type="text" placeholder={name} />}</td>
                                )
                              })
                          }
                          <td>{<Button className='col align-self-center' variant="outline-success" size='sm' onClick={addItemList}>Add</Button>}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <div className='col-12 d-flex justify-content-end'>
                      <button className='col-3 btn btn-primary' onClick={handleSubmit}>Save</button>
                    </div>
                    
                </PortletBody>
                <Modal show={show.show} onHide={closeModal}>
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body>Are you sure you want to delete?</Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={closeModal}>
                        Close
                      </Button>
                      <Button variant="danger" onClick={show.method.bind(this,show.id)}>
                        Delete
                      </Button>
                  </Modal.Footer>
                </Modal>
        </Portlet>

    )
}


export default MyTable;
