



export const actions = {
    changePage: page => ({ type: "CHANGE PAGE", payload: { page } })
  };




// Reducer

const initialState = {
    curentPage : 'Dashboard'
}

export const reducer = (state=initialState,action) =>{
    switch(action.type){
        case 'CHANGE PAGE':
            console.log(action.payload)
            return {
                ...state,
                curentPage:action.payload
            }
        default:
            return state
    }
};