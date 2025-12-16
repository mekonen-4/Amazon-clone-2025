import { Type } from "./action.type"
export const initialState = {
    cart:[]
}
export const reducer= (state,action)=>{
    switch (action.type) {
        case Type.ADD_TO_CART:
            return  {
        ...state,
        cart:[...state.cart,action.item]
    }
            
    
        default:
            return state;
            
    }
    // if (action.type===Type.ADD_TO_CART)
    //   return  {
    //     ...state,
    //     cart:[...state.cart,action.item]
    // }
    // return state;
} 