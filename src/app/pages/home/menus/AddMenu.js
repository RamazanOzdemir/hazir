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
const data = [{
    arg: 1990,
    val: 5320816667
}, {
    arg: 2000,
    val: 6127700428
}, {
    arg: 2010,
    val: 6916183482
}];
const AddMenu = () => {
    const {menuItems} = useContext(ProductContext);
    const Json_menuItems = JSON.stringify(menuItems);
    const columns = ["Name","GroupCode","Barcode","Tag"];
    console.log(Json_menuItems);
    return (
         <DataGrid 
            dataSource= {customers}
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
     
    )
}

export default AddMenu;
