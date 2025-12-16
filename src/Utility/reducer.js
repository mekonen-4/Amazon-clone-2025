import { Type } from "./action.type";

export const initialState = {
  cart: []
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_CART: {
      const existingItem = state.cart.find(
        (item) => item.product.id === action.item.product.id
      );

      if (!existingItem) {
        return {
          ...state,
          cart: [
            ...state.cart,
            { product: action.item.product, amount: 1 }
          ]
        };
      }

      const updatedCart = state.cart.map((item) =>
        item.product.id === action.item.product.id
          ? { ...item, amount: item.amount + 1 }
          : item
      );

      return {
        ...state,
        cart: updatedCart
      };
    }

    default:
      return state;
  }
};

