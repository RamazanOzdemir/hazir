import React,{useState,useContext,useEffect} from 'react'
import {Table, TableHead, TableRow, TableCell, TableBody,createMuiTheme,withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import "../../../../../_metronic/_assets/css/my_table.css"
import { ProductContext } from '../../../../../_metronic/my_context/ProductContext';

const styles = theme => ({
  tableRow: {
    "&$hover:hover": {
      backgroundColor: "red"
    },
    "&$selected":{
      backgroundColor : "#80cbc4"
    },
    "&$selected:hover":{
      backgroundColor : "#80cbc4"
    }
  },
  tableCell: {
    "$hover:hover &": {
      color: "pink"
    }
  },
  
  selected:{}

});


const ProductTable = ({nameList,db,idList,groupCode,classes}) => {
  const [selected, setSelected] = React.useState([]);
  const {selectedItems,setSelectedItems} = useContext(ProductContext);
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    //if (selectedIndex === -1) {
    //  newSelected = newSelected.concat(selected, name);
    //} else if (selectedIndex === 0) {
    //  newSelected = newSelected.concat(selected.slice(1));
    //} else if (selectedIndex === selected.length - 1) {
    //  newSelected = newSelected.concat(selected.slice(0, -1));
    //} else if (selectedIndex > 0) {
    //  newSelected = newSelected.concat(
    //    selected.slice(0, selectedIndex),
    //    selected.slice(selectedIndex + 1),
    //  );
    //}

    //setSelected(newSelected);
    //setSelectedItems(selectedItems.concat(newSelected));
    setSelected([name]);
    setSelectedItems([name]);
  };
  const isSelected = name => selectedItems.indexOf(name) !== -1;
  const theme = createMuiTheme({
    overrides: {
      MuiTableRow: {
        "&$selected": {
          backgroundColor: 'red'
        }
      },
   }
  })
  useEffect(() => {
    
    return () => {
    };
  }, [setSelectedItems])
    return (
    
        <Table striped bordered hover size="small" striped >
             <colgroup>
      <col style={{width:'10%'}}/>
      <col style={{width:'30%'}}/>
      <col style={{width:'30%'}}/>
      <col style={{width:'30%'}}/>
   </colgroup>
          <TableHead>
            <TableRow>
              <TableCell  padding="none">#</TableCell>
              {
                  nameList.map(it=>(
                      <TableCell >{it}</TableCell>
                  ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
              {
                db.filter(x=>x.GroupCode===groupCode).map((item,index)=>(
                    <TableRow 
                    hover
                    key={`${item} key ${index}`}
                    role ='checkbox'
                    name = {`${groupCode}-${index}`}
                    onClick = {event => handleClick(event, item.Id)}
                    selected ={isSelected(item.Id)}
                    classes={{ hover: classes.hover ,selected:classes.selected}}
                    className={classes.tableRow}
                    tabIndex = {-1}
                    >
                        <TableCell component="th" scope="row" padding="none">{index}</TableCell>
                        {
                            idList.map(header=>(
                               <TableCell >{item[`${header}`]}</TableCell> 
                            ))
                        }
                       
                    </TableRow>
                ))
              }
          </TableBody>
        </Table>
       
    )
}
ProductTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductTable);
