import React,{createContext,useState} from 'react';

export const MenuContext = createContext();

const MenuContextProvider = (props) =>{
    const [menu,setMenu] = useState('Dashboard');
   

    return (
        <MenuContext.Provider value={{menu,setMenu}}>
            {props.children}
        </MenuContext.Provider>
    )
}

export default MenuContextProvider;