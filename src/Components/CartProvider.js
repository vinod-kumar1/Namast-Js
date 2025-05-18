import { useState, useContext } from "react";
import { Outlet } from "react-router";
import CartContext from "./CartContext";

export default function CartProvider() {
  let [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Outlet />
    </CartContext.Provider>
  );
}
