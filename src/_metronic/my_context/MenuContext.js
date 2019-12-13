import React,{createContext,useState,useEffect} from 'react';
import { get } from 'http';

export const MenuContext = createContext();

const MenuContextProvider = (props) =>{
    const [screenMenuItems,setScreenMenuItems] = useState([]);
    const [screenMenuCategories,setscreenMenuCategories] = useState([]);
    const getAllItems = (tableName,stateSet) =>{ 
        fetch(`http://167.71.169.236/api/menu/${tableName}`,{
            method:'GET',
            headers: {'Content-Type': 'application/json'}
          }).then(res=>res.json())
          .then(re=>stateSet(re))
          .catch(err=>console.log(err));
    } 
    
    return (
        <MenuContext.Provider value={{screenMenuItems,screenMenuCategories}}>
            {props.children}
        </MenuContext.Provider>
    )
}

export default MenuContextProvider;