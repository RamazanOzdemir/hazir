import React,{useContext,useState,useEffect} from 'react';
import {BrowserRouter ,Redirect, Route, Switch } from "react-router-dom";
import {ProductContext} from '../../../../_metronic/my_context/ProductContext';
import OnlyProductList from '../components/OnlyProductList';
import OnlyList from "../components/products/OnlyList";
import AddProduct from "../components/products/AddProduct";
import { Row, Col, InputGroup,FormControl } from 'react-bootstrap';
import RightMenu from '../components/products/RightMenu';
import UpdateProduct from '../components/products/UpdateProduct';

const Products = () => {
    const {menuItems} = useContext(ProductContext);
    const [db,setDb] = useState([]);
    const [search,setSearch] = useState("");
    const ref = React.createRef();
    const handleChange = (e)=>{
      const value = e.target.value;
      setSearch(value);
      
        const newDb = menuItems.filter(m=>m.Name.toUpperCase().indexOf(value.toUpperCase())>-1)
        setDb(newDb);
      

    };
    return (
        <BrowserRouter>
        <Row className="h-100" >
            <Col sm={9} >
            <Switch>
                <Redirect
                  exact={true}
                  from="/product3/products"
                  to="/product3/products/product-list"
                />
                 <Route exact path="/product3/products/add-product-form" >
                  <AddProduct
                    porletName={"Add Product"}
                    nameList={["Group Code","Barcode","Tag","Name",]} 
                    idList={["GroupCode","Barcode","Tag","Name",]}
                    initialValues={{GroupCode:"",Barcode:"",Tag:"",dasdas:"sadd",Name:"",portions:[{Name:"",Multiplier:"",Price:0}]}}
                    subForm = {["Name","Multiplier","Price"]}
                    update={false}
                    options = {[]}
                  /> 
                </Route>
                <Route 
                  path="/product3/products/product-list"  > 
                    <OnlyList
                        porletName={"Product List"}
                        nameList={["Name","Barcode","Tag"]} 
                        idList={["Name","Barcode","Tag"]}
                        initialValues={{GroupCode:"",Barcode:"",Tag:"",Name:""}}
                        tableName = 'MenuItems'
                        db = {(db.length === 0&&search==="")?menuItems:db}
                        options = {[]}

                    />
                </Route>
                <Route 
                  path="/product3/products/update-products"  > 
                    <UpdateProduct/>
                </Route>



            </Switch>

            </Col>
            <Col sm={3} >
                <RightMenu ref={ref}>
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
                </RightMenu>
            </Col>
        </Row>
        </BrowserRouter>
    )
}


export default Products;
