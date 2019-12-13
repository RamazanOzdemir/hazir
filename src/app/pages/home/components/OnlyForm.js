import React,{useState, useContext, useEffect} from 'react';
import {Portlet,PortletBody,PortletHeader} from "../../../partials/content/Portlet";
import Table from 'react-bootstrap/Table'
import {Form,Button,Modal,Row,Col,Alert,Toast} from 'react-bootstrap'
import {MenuContext} from '../../../../_metronic/my_context/MenuContext';
import {ProductContext} from '../../../../_metronic/my_context/ProductContext';
import  {Formik} from "formik";


const OnlyForm = (props) => {
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

    const toggleShow = ()=>{
        setShowToast(false);
      };  
    return (
        <Portlet>
            <PortletHeader title={porletName} />
                <PortletBody>
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

export default OnlyForm;
