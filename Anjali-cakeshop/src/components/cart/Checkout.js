import { Component } from "react";
import queryparser from "query-string";
import { toast } from "react-toastify";
import axios from "../../axios";

const checkPhone = (phone) => {
  var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return regex.test(phone);
};

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      userData: {},
      cakes: [],
      price: null,
    };
  }

  componentDidMount() {
    var query = queryparser.parse(window.location.search).price;
    // console.log(this.props.location.state);
    this.setState({ cakes: this.props.location.state, price: query });
  }
  validateDetails = (event) => {
    var errors = {};
    var userData = {};
    event.preventDefault();
    // console.log(event.target.elements);
    const elements = event.target.elements;
    const name = elements["inputName"].value;
    const phone = elements["inputPhone"].value;
    const address = elements["inputAddress"].value;
    const city = elements["inputCity"].value;
    const pincode = elements["inputPincode"].value;

    if (!name) {
      errors.name = "Name is required";
    }
    if (!phone) {
      errors.phone = "Phone is required";
    } else if (!checkPhone(phone)) {
      errors.phone = "Invalid phone number";
    }
    if (!address) {
      errors.address = "Address is required";
    }
    if (!city) {
      errors.city = "City is required";
    }
    if (!pincode) {
      errors.pincode = "Pincode is required";
    }
    this.setState({ errors: errors }, () => {
      if (Object.keys(this.state.errors).length === 0) {
        toast.success("Details entered correctly");
        userData = {
          name: name,
          phone: phone,
          address: address,
          city: city,
          pincode: pincode,
        };
        this.setState({ userData: userData });
        axios({
          url: "/api/addcakeorder",
          method: "post",
          data: {
            name: userData.name,
            phone: userData.phone,
            address: userData.address,
            city: userData.city,
            pincode: userData.pincode,
            email: localStorage.email,
            cakes: this.state.cakes,
            price: this.state.price,
          },
          headers: {
            authtoken: localStorage.token,
          },
        }).then(
          (response) => {
            console.log(response.data);
            if (response.status === 201) {
              alert("Order placed successfully!!");
              this.props.history.push("/orders", "success");
            }
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        toast.error("Please fill all the details");
      }
    });
  };
  render() {
    return (
      <div className="row" style={{ marginTop: "10px" }}>
        <div className="col-4 checkout">
          <h3>Enter your details</h3>
          <form onSubmit={this.validateDetails}>
            <label for="inputName">Name</label>
            <input
              type="text"
              class="form-control"
              id="inputName"
              placeholder="Name"
            />
            <small className="text-danger">{this.state.errors.name}</small>
            <div class="form-row">
              <div class="form-group">
                <label for="inputPhone">Phone</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputPhone"
                  placeholder="Phone number"
                />
                <small className="text-danger">{this.state.errors.phone}</small>
              </div>
            </div>
            <div className="form-row">
              <div class="form-group">
                <label for="inputAddress">Address</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                />
                <small className="text-danger">
                  {this.state.errors.address}
                </small>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md-6">
                <label for="inputCity">City</label>
                <input type="text" class="form-control" id="inputCity" />
                <small className="text-danger">{this.state.errors.city}</small>
              </div>
              <div class="form-group col-md-6">
                <label for="inputPincode">Pincode</label>
                <input type="text" class="form-control" id="inputPincode" />
                <small className="text-danger">
                  {this.state.errors.pincode}
                </small>
              </div>
            </div>

            <div class="form-group" style={{ paddingTop: "15px" }}>
              <button type="submit" class="btn btn-primary w-100">
                Order Cake
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Checkout;
