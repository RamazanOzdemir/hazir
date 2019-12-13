import React,{useState, useContext, useEffect} from 'react';
import {Portlet,PortletBody,PortletHeader} from "../../../../partials/content/Portlet";
import Table from 'react-bootstrap/Table'
import {Form,Button,Modal,Row,Col,Alert,Toast} from 'react-bootstrap'
import {MenuContext} from '../../../../../_metronic/my_context/MenuContext';
import {ProductContext} from '../../../../../_metronic/my_context/ProductContext';
import  {Formik,Field, FieldArray} from "formik";
import { MenuItem } from '@material-ui/core';


const AddProduct = (props) => {
    const {porletName,nameList,idList,tableName,options,db,initialValues,subForm,update,Sid} = props
    const [addItems,setAddItem] = useState([]); 
    const [removeItems,setRemoveItem] = useState([]); 
    const [portions,setPortion] = useState([{}]);
    const [show,setShow] = useState({show:false,id:0,method:()=>{}});
    const [showToast,setShowToast] = useState(false);
    const [addModal,setSetAddModal] = useState(false);
    const {screenMenuCategories,menuItems,menuItemPortion,MenuItemPrices,addItem,deleteDbItem,getAllList,updateItem,setSelectedItems} = useContext(ProductContext);
    //const {screenMenuCategories} = useContext(MenuContext);
    useEffect(() => {
        
      return () => {
          setSelectedItems([])
      };
  }, [setSelectedItems])

    const toggleShow = ()=>{
        setShowToast(false);
      };  
    const handleRemove = (id)=>{
      setRemoveItem(removeItems.concat([id]));
    };
    const handleAdd = ()=>{};
    return (
        <Portlet className="h-100 overflow-auto"  fluidHeight={true}>
            {porletName&&<PortletHeader title={porletName} />}
                <PortletBody className=" overflow-auto" >
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
                                    setSubmitting(false);
                                  
                                  const prices = values.portions.map(por=>({Price:por.Price}));
                                  const newPortions = values.portions.filter(p=>p.Id === undefined).map(nP=>({...nP,MenuItemId:Sid,prices:{Price:nP.Price}}));
                                  const addValue = {...values,ItemType:1}
                                  if(update){
                                  updateItem("MenuItems",addValue,Sid);
                                  addItem("MenuItemPortions",newPortions);
                                  removeItems.forEach(rP=>deleteDbItem("MenuItemPortions",rP));
                                  }
                                  else
                                  addItem("MenuItems",[addValue]);
                                
                              
                              
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
                                  <Form onSubmit={handleSubmit} id='formik_form'>
                                    {
                                        idList.map((item,index)=>(
                                          <>
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
                                            </>
                                        ))
                                    }     
                                    {(touched.Name && errors.Name) && <Alert variant="danger">{touched.Name && errors.Name}</Alert> }
                                    <Row>
                                      <Col xs={9}>
                                        <Form.Group as={Row} >
                                          <FieldArray
                                            name='portions'
                                            render = {arrayHelpers=>(
                                              <Row>
                                                <Col xs={10}>
                                             
                                                <Row>
                                                <Col xs={12}>
                                                <Button variant="outline-primary" className="m-2" onClick={() => arrayHelpers.push("")} >Add Portion Line</Button>
                                                 </Col>
                                                 <Col className="border border-primary rounded overflow-auto" style={{maxHeight:"300px"}}>
                                                 {
                                                    values.portions.map((p,i)=>(
                                                     <Row className="border rounded p-3 ml-2">
                                                     { subForm.map(sub=>(
                                                       
                                                        <Col sm={3} xs={9}>
                                                          <Form.Label>{sub}</Form.Label>
                                                          <Form.Control
                                                            type = "text"
                                                            name = {`portions.${i}.${sub}`}
                                                            onChange = {handleChange}
                                                            onBlur = {handleBlur}
                                                            value = {p[sub]}
                                                            size="sm" 
                                                          />
                                                        </Col>
                                                      ))}
                                                      <Col xs={3} className="d-flex align-items-center">
                                                      <style type="text/css">
                                                         {`
                                                         .btn-flat {
                                                           background-color: red;
                                                           color: white;
                                                         }
                                                       
                                                         .btn-xxl {
                                                           padding: 1rem 1.5rem;
                                                           font-size: 1.5rem;
                                                         }
                                                         `}
                                                       </style>
                                                      <Button
                                                        className="align-self-center mt-3 "
                                                        variant="flat"
                                                        type="button"
                                                        onClick={update?()=>{handleRemove(p.Id); arrayHelpers.remove(i);}:() => arrayHelpers.remove(i)} // remove a friend from the list
                                                      >
                                                        -
                                                      </Button>
                                                    </Col>  
                                                    </Row>
                                                    ))   
                                                  }
                                                 </Col>

                                                </Row>
                                                 </Col>
                                             </Row>
                                            )}
                                            />
                                        </Form.Group>
                                      </Col>
                                      <Col xs={3}> 
                                        <Button variant="success" type='submit' form='formik_form' className='w-100 ' style={{height:"80px"}}>
                                           { update?"Update Product":"Add New Product"}
                                        </Button>
                                      </Col>                                      
                                    </Row>


                                  </Form>
                              )
                          }
                      </Formik>
                    
            </PortletBody>
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

export default AddProduct;
