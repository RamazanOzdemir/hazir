import React,{useContext} from 'react'
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
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
import { ProductContext } from '../../../../_metronic/my_context/ProductContext';
import { customers } from './Data.js';

const AddMenu = () => {
    const {menuItems} = useContext(ProductContext);
    const Json_menuItems = JSON.stringify(menuItems[0]===null?[{}]:menuItems);
    const columns = ["Name","GroupCode","Barcode","Tag"];
    console.log(Json_menuItems);
    console.log(customers);
    console.log( menuItems[0]);
    return (
        menuItems[0]?
         <DataGrid 
            dataSource= {menuItems}
            allowColumnReordering={true}
            showBorders = {true}
        >
            <GroupPanel visible={true} />
            <SearchPanel visible={true} highlightCaseSensitive={false} />
            <FilterRow visible={true} />
            <HeaderFilter visible={true}  />
            <Grouping autoExpandAll={true} />
            <Column dataField="Name"/>
            <Column dataField="GroupCode" 
                groupIndex={0}
                sortIndex = {-1}
            />
            <Column dataField="Barcode"
            />
            <Column dataField="Tag" />
        </DataGrid>
        :<h1>Loading...</h1>
    )
}

export default AddMenu;
