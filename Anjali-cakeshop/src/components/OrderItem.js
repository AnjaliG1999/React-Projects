import { Component } from "react";
import { withRouter } from "react-router";

class OrderItem extends Component {
  constructor() {
    super()
  }
  showCake = () => {
    var url = "/showcake/" + this.props.item.cakeid
    this.props.history.push(url)
    // console.log(this.props.item.cakeid);
  }
  render() {
    return (
      <div className="orderItem container">
        <div className="row"  style={{backgroundColor: "#2b1d0e", color:"white", padding: "5px", margin:"5px", borderRadius: "5px"}}>
          <div className="col-3"><img src={this.props.item.image} style={{cursor:"pointer"}} width="70px" height="70px"  onClick={this.showCake} /></div>
          <div className="col-3" style={{textAlign:"left"}}><h4>{this.props.item.name}</h4></div>
          <div className="col-1">Rs. {this.props.item.price}</div>
          <div className="col-2">Quantity: {this.props.item.quantity}</div>
          <div className="col-1">{this.props.item.weight} pounds</div>
        </div>
      </div>
    )
  }
}

export default withRouter(OrderItem);