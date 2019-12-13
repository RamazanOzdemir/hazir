import React,{useContext,useState} from 'react'
import { Nav, Collapse,Modal,Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { ProductContext } from '../../../../../_metronic/my_context/ProductContext';
import { useHistory } from "react-router-dom";


import {Portlet,PortletBody,PortletHeader} from "../../../../partials/content/Portlet";
const RightMenu = React.forwardRef((props,ref) => {
  const {selectedItems,setSelectedItems,deleteDbItem} = useContext(ProductContext);
  const [show,setShow] = useState(false);
  let history = useHistory();
  const hanleDelete = ( )=>{
    selectedItems.forEach(s=>deleteDbItem("MenuItems",s));
    setSelectedItems([]);
    setShow(false);
    
    history.push("/product3/products/product-list");
  };
  const closeModal = ()=>{
    setShow(false);
  }
     return (
        <Portlet className='h-100 border' style={{height:'100%'}}>
            <PortletBody className='h-100 border'>
                <div ref={ref} >
                  {props.children}
                </div>
                <Nav variant="pills" defaultActiveKey="product-list" className="flex-column">
                  <Nav.Item>
                    <Nav.Link to="/product3/products/product-list" as={Link} eventKey="product-list" >Product List</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link to="/product3/products/add-product-form" as={Link} eventKey="add-product-form" >Add New Product</Nav.Link>
                  </Nav.Item>
                  <Collapse in={selectedItems.length>0}>
                    <div>
                    <Nav.Item>
                      <Nav.Link to="/product3/products/update-products" as={Link} eventKey="add-product-rm" >Update Selected Products</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link  eventKey="add-product-orm" onClick={()=>setShow(true)} >Delete Selected Products</Nav.Link>
                    </Nav.Item>
                    </div>
                  </Collapse>
                </Nav>
            </PortletBody>
            <Modal show={show} onHide = {closeModal}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>Are you sure you want to delete?</Modal.Body>
              <Modal.Footer>
                  <Button variant="secondary" onClick={closeModal} >
                    Close
                  </Button>
                  <Button variant="danger" onClick={hanleDelete}>
                    Delete
                  </Button>
              </Modal.Footer>
            </Modal>
        </Portlet>
    )
});

export default RightMenu;
