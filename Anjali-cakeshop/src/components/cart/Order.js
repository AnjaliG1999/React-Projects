import { Component } from "react";
import OrderItem from "./OrderItem";
import Moment from "react-moment";

class OrderSuccess extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
    };
  }
  render() {
    return (
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2
            className="accordion-header"
            id={"heading" + this.props.order._id}
          >
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#collapse" + this.props.order._id}
              aria-expanded="false"
              aria-controls={"collapse" + this.props.order._id}
            >
              <span>
                <Moment format="D MMM YYYY" withTitle>
                  {this.props.orderdate}
                </Moment>
              </span>
              <span style={{ paddingLeft: "150px" }}>
                Order ID: {this.props.order._id}
              </span>
              <span style={{ position: "relative", left: "150px" }}>
                Rs. {this.props.order.price}
              </span>
              <span style={{ position: "relative", left: "300px" }}>
                {this.props.order.completed ? "Delivered" : "Pending"}
              </span>
            </button>
          </h2>
          <div
            id={"collapse" + this.props.order._id}
            className="accordion-collapse collapse"
            aria-labelledby={"heading" + this.props.order._id}
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="orderItems">
                {this.props.order.cakes.map((item) => {
                  return <OrderItem item={item} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderSuccess;
