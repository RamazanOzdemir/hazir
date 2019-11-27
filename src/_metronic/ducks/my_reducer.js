
const change = (page)=>({
    type :  "CHANGE PAGE",
    page : page
});


export const changePage = (page)=> dispatch =>{
    dispatch(change(page));
};







// Reducer

const initialState = {
    curentPage : 'Dashboard'
}

export const reducer = (state=initialState,action) =>{
    switch(action.type){
        case 'CHANGE PAGE':
            return {
                ...state,
                curentPage:action.page
            }
        default:
            return state
    }
};