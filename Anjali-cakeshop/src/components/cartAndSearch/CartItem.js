import FA from "react-fontawesome";
import { withRouter } from "react-router";
import addToCart from "../../Addtocart";

function CartItem(props) {
  const cakeToCart = () => {
    var cake = {
      email: localStorage.email,
      name: props.cakesData.name,
      cakeid: props.cakesData.cakeid,
      price: props.cakesData.price,
      weight: props.cakesData.weight,
      image: props.cakesData.image,
    };
    addToCart(props, cake);
  };

  const removeFromCart = () => {
    console.log(props.cakesData.cakeid);
    props.removeCartItem(props.cakesData.cakeid);
  };

  const showCake = () => {
    var url = "/showcake/" + props.cakesData.cakeid;
    props.history.push(url);
  };

  if (props.fromLocation === "search") {
    return (
      <div className="row cartRow">
        <div className="col-md-3">
          <img
            src={props.cakesData.image}
            style={{ cursor: "pointer", marginRight: "10px" }}
            width="200px"
            height="200px"
            onClick={showCake}
            alt="cake name"
          />
          <p
            style={{
              position: "relative",
              backgroundColor: "brown",
              width: "200px",
              color: "white",
              fontSize: "large",
            }}
          >
            Rs. {props.cakesData.price}
          </p>
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-8 itemName">
              <h3>{props.cakesData.name}</h3>
              {props.cakesData.eggless && (
                <span>
                  {" "}
                  <FA
                    name="circle"
                    style={{ color: "green", paddingLeft: "20px" }}
                  />
                </span>
              )}
              {!props.cakesData.eggless && (
                <span>
                  {" "}
                  <FA
                    name="circle"
                    style={{ color: "red", paddingLeft: "20px" }}
                  />
                </span>
              )}
            </div>
            <div className="col-md-2 itemClose">
              <button className="btn btn-primary" onClick={cakeToCart}>
                <FA name="shopping-cart" />
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 itemName">
              <p>{props.cakesData.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (props.fromLocation === "cart") {
    return (
      <div className="row cartRow" style={{ padding: "5px" }}>
        <div className="col-md-2">
          <img
            src={props.cakesData.image}
            style={{ cursor: "pointer" }}
            width="50px"
            height="50px"
            onClick={showCake}
            alt="cake name"
          />
        </div>
        <div className="col-md-4 itemName">
          <h3>{props.cakesData.name}</h3>
        </div>
        <div className="col-md-3 itemName">
          <p>Rs. {props.cakesData.price}</p>
        </div>
        <div className="col-md-1 itemClose">
          <button className="btn btn-danger" onClick={removeFromCart}>
            <FA name="trash" />
          </button>
        </div>
      </div>
    );
  }
}
export default withRouter(CartItem);
