import axios from "../../axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import Order from "./Order";

class OrderSuccess extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
    };
  }
  componentDidMount() {
    axios({
      url: "/api/cakeorders",
      method: "post",
      data: {
        email: localStorage.email,
      },
      headers: {
        authtoken: localStorage.token,
      },
    }).then(
      (response) => {
        this.setState({ orders: response.data });
        console.log("Orders", response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  render() {
    return (
      <div>
        <h1>Your Orders</h1>

        {this.state.orders && this.state.orders.length > 0 && (
          <div className="container">
            {this.state.orders.map((order) => {
              return <Order order={order} />;
            })}
          </div>
        )}

        {!this.state.orders && (
          <div>
            <h3>Uh-oh!! You don't have any previous orders with us :(</h3>
            <h4>
              <Link to="/">Order now!!</Link>
            </h4>
          </div>
        )}
      </div>
    );
  }
}

export default OrderSuccess;
