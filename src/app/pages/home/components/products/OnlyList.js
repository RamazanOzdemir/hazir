import React,{useState, useContext, useEffect} from 'react';
import {Portlet,PortletBody,PortletHeader} from "../../../../partials/content/Portlet";
import Table from 'react-bootstrap/Table'
import {Form,Button,Modal,Row,Col,Alert,Toast, Collapse, Fade} from 'react-bootstrap'
import {ProductContext} from '../../../../../_metronic/my_context/ProductContext'
import  {Formik} from "formik";
import GroupCode from './GroupCode';
import ProductTable from './ProductTable';
import { maxHeight } from '@material-ui/system';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';
import $ from "jquery";
import DataGrid, {
    Column,
    Grouping,
    GroupPanel,
    Pager,
    Paging,
    SearchPanel,
    FilterRow,
    HeaderFilter
  } from "devextreme-react/data-grid";
import { isConditionalExpression } from 'typescript';

const OnlyList = (props) => {
    const {porletName,nameList,idList,tableName,options,db,initialValues} = props
    const [items,setItem] = useState([]); 
    const [data,setData] = useState({});
    const [show,setShow] = useState({show:false,id:0,method:()=>{}});
    const [showToast,setShowToast] = useState(false);
    const [addModal,setSetAddModal] = useState(false);
    const {screenMenuCategories,menuItems,menuItemPortion,MenuItemPrices,addItem,deleteDbItem,getAllList} = useContext(ProductContext);
    const [open, setOpen] = useState(false);
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
    const ref = React.createRef();
    const groups = [];
    db.forEach(item=>{
      if(groups.every(g=>g!==item.GroupCode))
        groups.push(item.GroupCode);
    });
    const onSelectionChanged = ({selectedRowsData})=>{
      console.log(selectedRowsData,"selected rows data");
    };
    const handleOptionChanged = (e) => {
      const {name,fullName,value,previousValue} = e;
      if(fullName.indexOf("groupIndex")!==-1){
        console.log($("#cl").dxList(Column));
      }
        

    }
    return (
        <Portlet className='border ' style={{overflow:"auto",height:"84vh"}}>
            <PortletHeader title={porletName} />
                <PortletBody className='border' style={{height:"85vh",overflow:"auto"}}>
                  <DataGrid 
                      
                      dataSource= {menuItems}
                      selection={{ mode: 'single' }}
                      allowColumnReordering={true}
                      onOptionChanged={handleOptionChanged.bind(this)}
                      showBorders = {true}                      
                      hoverStateEnabled={true}
                      keyExpr="Id"
                      id = "cl"
                      onSelectionChanged={onSelectionChanged}

                    >
                      <GroupPanel visible={true} 
                        
                      />
                      <SearchPanel visible={true} highlightCaseSensitive={false} />
                      <FilterRow visible={true} />
                      <HeaderFilter visible={true}  />
                      <Grouping autoExpandAll={true} 
                        contextMenuEnabled ={true}
                      />
                      <Column dataField="Name" className="cl"/>
                      <Column dataField="GroupCode" 
                          groupIndex={0}
                          sortIndex = {-1}
                          sortOrder = "dcs"
                          className="cl"
                          
                          showInColumnChooser = {s=>alert(s)}
                          
                      />
                      <Column dataField="Barcode"
                      className="cl"
                      onSelectionChanged={((e)=>alert(e))}
                      />
                      <Column dataField="Tag" 
                      
                      className="cl"/>
                  </DataGrid> 
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
                  id = 'toast'
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                  }}
                >
                    <Toast show={showToast} onClose={toggleShow} autohide={true} delay={2000} >
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

export default OnlyList;
