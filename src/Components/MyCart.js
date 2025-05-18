import CartContext from "./CartContext";
import { useContext } from "react";
import { Link } from "react-router";

export default function MyCart() {
  let { cart } = useContext(CartContext);
  let total = cart.reduce((acc, cv) => acc + cv.price * cv.count, 0);
  console.log(cart);
  return (
    <div className="bg-slate-300 h-min mx-2 px-4 mt-8 rounded-sm">
      <h3 className="flex justify-center items-center">My Cart</h3>
      <div className="flex gap-2 flex-col">
        {cart.length > 0 ? (
          cart.map((item, i) => (
            <p className="bg-red-100 px-2 w-max rounded-sm" key={item.id}>
              {i + 1}. {item.name} <small>x</small> {item.count}| ₹{" "}
              {(item.price * item.count) / 100}
            </p>
          ))
        ) : (
          <div className="relative top-8 flex justify-center">
            <i className="border-b-2 border-black border-dashed">
              Cart is Empty
            </i>
          </div>
        )}
      </div>
      {cart.length > 0 ? (
        <h2 className="mt-4 bg-green-400 w-max px-4 rounded-sm">
          Total : ₹ {total / 100}
        </h2>
      ) : (
        ""
      )}
    </div>
  );
}
