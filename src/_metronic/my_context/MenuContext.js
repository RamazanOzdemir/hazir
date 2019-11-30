import React,{createContext,useState,useEffect} from 'react';

export const MenuContext = createContext();

const MenuContextProvider = (props) =>{
    const [menu,setMenu] = useState([]);
    const [menuItems,setMenuItems] = useState([]);
    const [menuItemPortion,setMenuItemPortion] = useState([]);
    const [MenuItemPrices,setMenuItemPrices] = useState([]);
    const [allList,setAllList] = useState([]);


    const deleteDbItem = (table,id)=>{
        fetch(`http://167.71.169.236/api/${id}`,{
            method:'DELETE',
            body:JSON.stringify({table:table}),
            headers: {'Content-Type': 'application/json'}
          }).then(res=>res.json())
          .then(re=>console.log(re))
          .catch(err=>console.log(err));  
    };


    const addItem = (tableName,list)=>{
        const body = {table:tableName} 
        let query = {};
       
        console.log(list);
        list.forEach(element => {
            console.log({...element,...body});

            fetch(`http://167.71.169.236/api/${tableName}`,{
                method:'POST',
                body:JSON.stringify(element),
                headers: {'Content-Type': 'application/json'}
              }).then(res=>res.json())
              .then(re=>console.log(re))
              .catch(err=>console.log(err));   
        });
        
    }
    const getAllItems = (tableName,stateSet) =>{ 
        console.log(tableName)
        fetch(`http://167.71.169.236/api/${tableName}`,{
            method:'GET',
            headers: {'Content-Type': 'application/json'}
          }).then(res=>res.json())
          .then(re=>stateSet(re))
          .catch(err=>console.log(err));
    } 
    useEffect(()=>{
        console.log('get all list')
        getAllItems('MenuItems',setMenuItems);
        getAllItems('MenuItemPortions',setMenuItemPortion);
        getAllItems('MenuItemPrices',setMenuItemPrices);
    
    },[allList,setAllList]);
    return (
        <MenuContext.Provider value={{menuItems,menuItemPortion,MenuItemPrices,getAllItems,addItem,deleteDbItem}}>
            {props.children}
        </MenuContext.Provider>
    )
}

export default MenuContextProvider;