"use client";

import useCart from "@/hooks/useCart";
import { createContext } from "react";

export const ShopContext = createContext({
  cartItems: null,
  addToCart: () => {},
  removeFromCart: () => {},
  resetCart: () => {},
});

export const ShopContextProvider = ({ children }) => {
  return (
    <ShopContext.Provider value={useCart()}>{children}</ShopContext.Provider>
  );
};
