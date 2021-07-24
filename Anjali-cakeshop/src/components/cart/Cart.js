import { useEffect, useState } from "react";

import CartItem from "./CartItem";
import { CircularProgress } from "@material-ui/core";
import "../../css/Cart.css";
import axios from "../../axios";

function Cart(props) {
  var [loading, setLoading] = useState(true);
  var [cartList, setCartList] = useState([]);
  var totalPrice = cartList.reduce((a, b) => +a + +b.price, 0);

  if (!localStorage.token) {
    props.history.push("/login");
  }

  const removeCartItem = (cakeid) => {
    axios({
      url: "/api/removecakefromcart",
      method: "post",
      data: {
        email: localStorage.email,
        cakeid: cakeid,
      },
      headers: {
        authtoken: localStorage.token,
      },
    }).then(
      (response) => {
        if (response.data.message === "Removed item from cart") {
          var id = cartList.findIndex((item) => {
            return item.cakeid === cakeid;
          });

          if (id !== -1) {
            cartList.splice(id, 1);
            setCartList([...cartList]);
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const addAddress = (event) => {
    var url = "/checkout?price=" + totalPrice;
    props.history.push(url, cartList);
  };

  useEffect(() => {
    axios({
      url: "/api/cakecart",
      method: "post",
      data: {
        email: localStorage.email,
      },
      headers: {
        authtoken: localStorage.token,
      },
    }).then(
      (response) => {
        console.log(response);
        if (response.data.length !== 0) {
          setCartList(response.data[0].cakes);
          setLoading(false);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div className="cart">
      <h1 style={{ textAlign: "center" }}>Your Cart</h1>

      <div className="cart__container">
        <div className="cart__info">
          <h4>Total Items: {cartList.length}</h4>
          <h4>Grand Total: Rs. {totalPrice}</h4>
          <button onClick={addAddress} className="cart__checkout">
            Checkout
          </button>
        </div>

        <div className="cart__items">
          {loading && <CircularProgress />}
          {!loading && !cartList?.length > 0 && <h2>Your Cart is empty</h2>}
          {!loading &&
            cartList.map((item) => {
              return (
                <CartItem
                  key={item.cakeids}
                  cakesData={item}
                  removeCartItem={removeCartItem}
                  fromLocation={"cart"}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
export default Cart;
