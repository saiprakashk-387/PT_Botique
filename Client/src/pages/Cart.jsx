import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../API/Api";
import { cartSelector } from "../redux/slice";
import CartInfo from "./CartInfo";

export default function Cart() {
  const dispatch = useDispatch();
  const { cart, isLoading, error } = useSelector(cartSelector);
  const [cartt, setCart] = useState();

  useEffect(() => {
    dispatch(getCart());
   }, []);

  useEffect(() => {
    setCart(cart?.data);
  }, [cart]);

  const increaseQuantity = {
    inCarrt: (i) => {
      setCart((state) =>
        state.map((item, o) => {
          if (i === o && item.qty < 10) {
            return { ...item, qty: item.qty + 1 };
          }
          return item;
        })
      );
    },
  };

  const decreaseQuantity = {
    inCarrt: (i) => {
      setCart((prevCart) =>
        prevCart.map((item, o) => {
          if (i === o && item.qty > 1) {
            return { ...item, qty: item.qty - 1 };
          }
          return item;
        })
      );
    },
  };
  const cartCountTotal =
    cartt && cartt.reduce((acc, item) => acc + item.qty, 0);

    const cartPriceTotal =
    cartt && cartt.reduce((acc, item) => acc + item.price * item.qty, 0);
  return (
    <CartInfo
      item={cartt}
      isLoading={isLoading}
      error={error}
      increaseQ={increaseQuantity.inCarrt}
      decreaseQ={decreaseQuantity.inCarrt}
      cartCountTotal={cartCountTotal}
      cartPriceTotal={cartPriceTotal}
    />
  );
}
