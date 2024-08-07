import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];
    case "REMOVE":
      // Find the index of the item to remove
      const index = state.findIndex(
        (item) =>
          item.id === action.id &&
          item.name === action.name &&
          item.size === action.size &&
          item.price === action.price &&
          item.img === action.img
      );
      // If the item is found, create a new array without that item
      if (index !== -1) {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
      return state;
    default:
      console.log("Error in reducer");
      return state; // Ensure to return state for default case
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
