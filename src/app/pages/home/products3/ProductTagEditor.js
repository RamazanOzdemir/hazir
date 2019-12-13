import React,{useContext,useState} from 'react'
import {Portlet,PortletHeader,PortletBody, PortletHeaderIcon} from "../../../partials/content/Portlet";
import { ProductContext } from '../../../../_metronic/my_context/ProductContext';
import { Formik ,FieldArray} from 'formik';
import {Form,Button,Modal,Row,Col,Alert,Toast, InputGroup,FormControl} from 'react-bootstrap'
const ProductTagEditor = () => {
    const {menuItems,updateItem} = useContext(ProductContext)
    const [updatedItems,setUpdatedItems] = useState([]);
    const [db,setDb] = useState([]);
    const [showToast,setShowToast] = useState(false);
    const [search,setSearch] = useState("");

    const handleUpdateItems = (productId)=>{
        if(updatedItems.indexOf(productId)===-1)
            setUpdatedItems(updatedItems.concat(productId));
    }
    const initialValues = {menuItems:(db.length === 0&&search==="")?menuItems:db};
    const toggleShow = ()=>{
        setShowToast(false);
      }; 
    const handleChange = (e)=>{
      const value = e.target.value;
      setSearch(value);
        const newDb = menuItems.filter(m=>m.Name.toUpperCase().indexOf(value.toUpperCase())>-1)
        setDb(newDb);
      

    };
    return (
        <Portlet className='border ' >
            <PortletHeader title="Product Tag Editor" />
            <PortletBody >
              {menuItems.length?
              <>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text  id="basic-addon1">
                            <i className="flaticon-search-magnifier-interface-symbol"></i>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="Search ..."
                      aria-describedby="basic-addon1"
                      onChange={handleChange}
                      value={search}
                    />
                </InputGroup>
                <Formik
                     enableReinitialize 
                     initialValues = {initialValues}
                     onSubmit = {
                        (values,{setSubmitting,resetForm})=>{
                            setTimeout(()=>{
                                setShowToast(false);
                            },1500)
                          
                                setSubmitting(false);
                            const willUpdateProducts = values.menuItems.filter(p=>updatedItems.some(s=>s===p.Id));
                            willUpdateProducts.forEach(w=>{
                                updateItem("MenuItems",w,w.Id);
                                document.getElementById(`product-label-${w.Id}`).className="";
                            });
                            setShowToast(true);
                            
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
                        <Form onSubmit={handleSubmit} >
                            <FieldArray 
                                name="menuItems"
                                render = {arrayHelpers=>(
                                    <>
                                    {values.menuItems.map((product,index)=>(
                                        <Form.Group as={Row}>
                                         
                                            <Form.Label column sm={2} >
                                                <span  id={`product-label-${product.Id}`} >{product.Name}</span>
                                            </Form.Label>
                                            <Col>
                                            <Form.Control
                                                column 
                                                sm={2}
                                                type = "text"
                                                name = {`menuItems.${index}.Barcode`}
                                                onChange = {e=>{
                                                    handleChange(e);
                                                    handleUpdateItems(product.Id);
                                                    document.getElementById(`product-label-${product.Id}`).className="font-weight-bold"
                                                    }
                                                }
                                                onBlur = {handleBlur}
                                                value = { values.menuItems[index].Barcode}
                                                size="sm" 
                                            />
                                            </Col>
                                            <Col>
                                            <Form.Control
                                                column 
                                                sm={2}
                                                type = "text"
                                                name = {`menuItems.${index}.Tag`}
                                                onChange = {e=>{
                                                    handleChange(e);
                                                    handleUpdateItems(product.Id);
                                                    document.getElementById(`product-label-${product.Id}`).className="font-weight-bold"
                                                    }
                                                    
                                                }
                                                onBlur = {handleBlur}
                                                value = {values.menuItems[index].Tag}
                                                size="sm" 
                                            />
                                            </Col>
                                        </Form.Group>

                                    ))
                                    }
                                    <Button type="submit">Save</Button>
                                    </>
                                )}
                            />
                        </Form>
                    )
                }
                </Formik>
                </>
                :
                <h1>Loading...</h1>
            }
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
                        Changes successfully saved!
                      </Toast.Body>
                    </Toast>

                </div>
        </Portlet>
    )
}

export default ProductTagEditor;
