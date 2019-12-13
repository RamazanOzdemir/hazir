import React,{useState, useContext, useEffect} from 'react';
import {Portlet,PortletBody,PortletHeader} from "../../../partials/content/Portlet";
import Table from 'react-bootstrap/Table'
import {Form,Button,Modal,Row,Col,Alert,Toast} from 'react-bootstrap'
import {MenuContext} from '../../../../_metronic/my_context/MenuContext';
import {ProductContext} from '../../../../_metronic/my_context/ProductContext';
import  {Formik} from "formik";
import { timeout } from 'q';


const TopFormList = (props) => {
    const {porletName,nameList,idList,tableName,options,db,initialValues} = props
    const [items,setItem] = useState([]); 
    const [data,setData] = useState({});
    const [show,setShow] = useState({show:false,id:0,method:()=>{}});
    const [showToast,setShowToast] = useState(false);
    const [addModal,setSetAddModal] = useState(false);
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
    const closeAddModal = ()=>{
      setSetAddModal(false);
    }
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
    const openAddModal = ()=>{
      setSetAddModal(true);
    };  
    const toggleShow = ()=>{
      setShowToast(false);
    };  
    console.log(addModal);
    return (
        <Portlet>
            <PortletHeader title={porletName} />
                <PortletBody >
                      <Formik
                        initialValues = {initialValues}
                        validate = {
                            values =>{
                                const errors = {};
                                if(!values.Name)
                                    errors.Name = 'Name Required!';
                                return errors;
                            }
                        }
                        onSubmit = {
                            (values,{setSubmitting,resetForm})=>{

                                setShowToast(true);
                                setTimeout(()=>{
                                    setShowToast(false);
                                },1500)
                                  resetForm();
                                    setSubmitting(false);
                                if(tableName==='MenuItems'){
                                    addItem(tableName,[{...values,ItemType:1}]);
                                    
                                  }
                                  else
                                  addItem(tableName,[values]);  
                              
                            }
                        }
                      >
                          {
                              ({
                                  values,
                                  errors,
                                  touched,
                                  handleChange,
                                  handleBlur,
                                  handleSubmit,
                                  isSubmitting
                              })=>(
                                  <Form onSubmit={handleSubmit} id='formik_from'>
                                    {
                                        idList.map((item,index)=>(
                                            <Form.Group as={Row} >
                                                <Form.Label column sm={2}>{nameList[index]}</Form.Label>
                                                <Col sm={10}>
                                                  <Form.Control
                                                    type = "text"
                                                    name = {item}
                                                    onChange = {handleChange}
                                                    onBlur = {handleBlur}
                                                    value = {values[item]}
                                                    size="sm" 
                                                />  
                                                </Col>
                                                                       
                                            </Form.Group>
                                        ))
                                    }
                                    {(touched.Name && errors.Name) && <Alert variant="danger">{touched.Name && errors.Name}</Alert> }
                                    <div className='row justify-content-end' >
                                        <Button variant="success" type='submit' form='formik_from' className='col-3 '>
                                            Add New
                                        </Button>
                                    </div>
                                  </Form>
                              )
                          }
                      </Formik>
                    <Table striped bordered hover size="sm" className='mt-3'  responsive>
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
                      </tbody>
                    </Table>
                    
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
                <div
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                  }}
                >
                    <Toast show={showToast} onClose={toggleShow}>
                      <Toast.Header>
                        <strong className="mr-auto">SambaPOS</strong>
                      </Toast.Header>
                      <Toast.Body>
                        Product addition completed successfully!
                      </Toast.Body>
                    </Toast>

                </div>
        </Portlet>
    )
}

export default TopFormList;
