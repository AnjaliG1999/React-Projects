import { useEffect, useState } from "react";

import CartItem from "./CartItem";
import "../../css/Cart.css";
import axios from "../../axios";

function Cart(props) {
  var [cartList, setCartList] = useState([]);
  var totalPrice = 0;
  var totalItems = 0;

  if (!localStorage.token) {
    props.history.push("/login");
  }

  const removeCartItem = (cakeid) => {
    // console.log("from cart", cakeid);
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
        console.log(response);
        if (response.data.message === "Removed item from cart") {
          var id = cartList.findIndex((item) => {
            return item.cakeid === cakeid;
          });

          if (id !== -1) {
            cartList.splice(id, 1);
            setCartList([...cartList]);
          }
          console.log(id);
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
        if (response.data.length !== 0) setCartList(response.data[0].cakes);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div className="Cart">
      <div className="container" id="Cart">
        {cartList && cartList.length > 0 && (
          <div className="row">
            <div className="col-8">
              <h1 style={{ textAlign: "center" }}>Your Cart</h1>
              {cartList.map((item) => {
                totalPrice += item.price;
                totalItems += 1;
                return (
                  <CartItem
                    cakesData={item}
                    removeCartItem={removeCartItem}
                    fromLocation={"cart"}
                  />
                );
              })}
            </div>

            <div className="checkoutContainer col-4">
              <h4>Total Items: {totalItems}</h4>
              <h4>Grand Total: Rs.{totalPrice}</h4>
              <button onClick={addAddress} className="btn btn-primary checkout">
                Checkout
              </button>
            </div>
          </div>
        )}
        <div>
          {(!cartList || !cartList.length > 0) && <h2>Your Cart is empty</h2>}
        </div>
      </div>
    </div>
  );
}
export default Cart;
