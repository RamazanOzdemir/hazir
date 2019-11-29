import React,{createContext,useState} from 'react';

export const MenuContext = createContext();

const MenuContextProvider = (props) =>{
    const [menu,setMenu] = useState([]);
    const deleteItem = (api,id)=>{
        //api ile sil    
    };
    const addItem = (api,item)=>{
        //api ile ekle
    }
    const getAllItems = (api) =>{
        // all items
    } 
    return (
        <MenuContext.Provider value={{menu,setMenu}}>
            {props.children}
        </MenuContext.Provider>
    )
}

export default MenuContextProvider;