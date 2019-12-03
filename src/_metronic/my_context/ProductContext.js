import React,{createContext,useState,useEffect} from 'react';
import { get } from 'http';

export const ProductContext = createContext();

const ProductContextProvider = (props) =>{
    const [menuItems,setMenuItems] = useState([]);
    const [menuItemPortion,setMenuItemPortion] = useState([]);
    const [MenuItemPrices,setMenuItemPrices] = useState([]);
    const [dailySales,setDailySales] = useState([]);
    const [bestSallers,setBestSallers] = useState([]);
    const [allList,setAllList] = useState([]);
    const [screenMenuItems,setScreenMenuItems] = useState([]);
    const [screenMenuCategories,setscreenMenuCategories] = useState([]);

    const deleteDbItem = (table,id)=>{
        fetch(`http://167.71.169.236/api/menu/${id}`,{
            method:'DELETE',
            body:JSON.stringify({table:table}),
            headers: {'Content-Type': 'application/json'}
          }).then(res=>res.json())
          .then(re=>getAllList())
          .catch(err=>console.log(err));  
    };

    useEffect(()=>{
        fetch(`http://167.71.169.236/api/daily`,{
            method:'GET',
            headers: {'Content-Type': 'application/json'}
          }).then(res=>res.json())
          .then(re=>setDailySales(re))
          .catch(err=>console.log(err)); 

          fetch(`http://167.71.169.236/api/bestSeller`,{
            method:'GET',
            headers: {'Content-Type': 'application/json'}
          }).then(res=>res.json())
          .then(re=>setBestSallers(re))
          .catch(err=>console.log(err)); 

    },[]);
    const addItem = (tableName,list)=>{
        const body = {table:tableName} 
        let query = {};
       
        list.forEach(element => {
            for (var property in element) {
                if (element.hasOwnProperty(property) === undefined) {
                    element.property = '';
                }
              }
                
            fetch(`http://167.71.169.236/api/menu/${tableName}`,{
                method:'POST',
                body:JSON.stringify(element),
                headers: {'Content-Type': 'application/json'}
              }).then(res=>res.json())
              .then(re=>{
                  
                  getAllList();
              } )
              .catch(err=>console.log(err));   
        });
        
    }
    const getAllItems = (tableName,stateSet) =>{ 
        fetch(`http://167.71.169.236/api/menu/${tableName}`,{
            method:'GET',
            headers: {'Content-Type': 'application/json'}
          }).then(res=>res.json())
          .then(re=>stateSet(re))
          .catch(err=>console.log(err));
    } 
    const getAllList = ()=>{
        getAllItems('MenuItems',setMenuItems);
        getAllItems('MenuItemPortions',setMenuItemPortion);
        getAllItems('MenuItemPrices',setMenuItemPrices);
        getAllItems("ScreenMenuItems",setScreenMenuItems);
        getAllItems("ScreenMenuCategories",setscreenMenuCategories);
    
    };
    return (
        <ProductContext.Provider 
        value={{bestSallers,
        dailySales,
        getAllList,
         menuItems,
         menuItemPortion,
         MenuItemPrices,
         getAllItems,
         addItem,
         deleteDbItem,
         screenMenuItems,
         screenMenuCategories}}
         >
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider;