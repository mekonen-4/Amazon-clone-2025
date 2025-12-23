import { Type } from "./action.type";

export const initialState = {
  cart: [],
  user:null
};

export const reducer = (state, action) => {
  switch (action.type) {

    case Type.ADD_TO_CART: {
      const existingItem = state.cart.find(
        item => item.product.id === action.product.id
      );

      if (!existingItem) {
        return {
          ...state,
          cart: [...state.cart, { product: action.product, amount: 1 }],
        };
      }

      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.product.id
            ? { ...item, amount: item.amount + 1 }
            : item
        ),
      };
    }

    case Type.REMOVE_FROM_CART: {
      const index = state.cart.findIndex(
        item => item.product.id === action.id
      );

      if (index < 0) return state;

      const newCart = [...state.cart];

      if (newCart[index].amount > 1) {
        newCart[index] = {
          ...newCart[index],
          amount: newCart[index].amount - 1,
        };
      } else {
        newCart.splice(index, 1);
      }
   
      return {
        ...state,
        cart: newCart,
      };
    }
     case Type.REMOVE_PRODUCT_COMPLETELY:
  return {
    ...state,
    cart: state.cart.filter(item => item.product.id !== action.id),
  };
    case Type.EMPTY_CART:
    return{
      ...state,
      cart: []
    }
  case Type.SET_USER:
    return{
      ...state,
      user:action.user
    }


    default:
      return state;
  }
};


