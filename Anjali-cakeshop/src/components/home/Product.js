import axios from "axios";
import { Component } from "react";
import { toast } from "react-toastify";

class Product extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
      cakeDetails: null,
      errors: null,
    };
  }
  componentDidMount() {
    if (!localStorage.token) {
      alert("Sorry, you need to login to add cakes");
      this.props.history.push("/login");
    }
  }
  uploadImage = (event) => {
    var formdata = new FormData();
    formdata.append("file", event.target.files[0]);
    axios({
      url: "https://apibyashu.herokuapp.com/api/upload",
      method: "post",
      data: formdata,
      headers: {
        authtoken: localStorage.token,
      },
    }).then(
      (response) => {
        console.log(response);
        this.setState({
          file: response.data.imageUrl,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };
  saveDetails = () => {
    axios({
      url: "https://apibyashu.herokuapp.com/api/addcake",
      method: "post",
      data: this.state.cakeDetails,
      headers: {
        authtoken: localStorage.token,
      },
    }).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  getObject = (event, cakeDetails) => {
    for (const el of event.target.elements) {
      if (el.id === "eggless") {
        cakeDetails[el.id] = el.checked;
        continue;
      }
      if (el.id === "") {
        continue;
      }
      cakeDetails[el.id] = el.value;
    }

    cakeDetails.name = cakeDetails.cakeName;
    delete cakeDetails.cakeName;
    cakeDetails.image = cakeDetails.cakeImage;
    delete cakeDetails.cakeImage;
    cakeDetails.type = cakeDetails.cakeType;
    delete cakeDetails.cakeType;
    cakeDetails.ingredients = cakeDetails.ingredients.split(", ");
    cakeDetails.image = this.state.file;

    this.setState({ cakeDetails: cakeDetails }, () => {
      this.saveDetails();
    });
  };
  validateInfo = (event) => {
    event.preventDefault();
    let cakeDetails = {};
    let errors = {};
    this.setState({ errors: {} });

    const elements = event.target.elements;
    if (!elements.cakeName.value) {
      errors.cakeName = "Name is required";
    }
    if (elements.flavour.value === "--None--") {
      errors.flavour = "flavour is required";
    }
    if (!elements.description.value) {
      errors.description = "Description is required";
    }
    if (!elements.ingredients.value) {
      errors.ingredients = "Ingredients are required";
    }
    if (!elements.weight.value) {
      errors.weight = "Weight is required";
    }
    if (!elements.price.value) {
      errors.price = "Price is required";
    }
    if (!elements.cakeImage.files[0]) {
      errors.cakeImage = "Cake image is required";
    }
    this.setState({ errors: errors }, () => {
      if (Object.keys(errors).length === 0) {
        toast.success("Cake added successfully!!");
        setTimeout(() => {
          this.props.history.push("/");
        }, 2000);
      } else {
        toast.error("Enter valid data");
      }
    });

    this.getObject(event, cakeDetails);
  };
  render() {
    return (
      <div className="container">
        <h2>Add Cake</h2>
        <form className="g-3" onSubmit={this.validateInfo}>
          <div className="row">
            <div className="col-6">
              <label htmlFor="cakeName">Have a particular cake in mind?</label>
              <input
                type="text"
                className="form-control"
                id="cakeName"
                name="cakeName"
                placeholder="Enter Cake Name"
              />
              {this.state.errors && (
                <div className="text-danger">{this.state.errors.cakeName}</div>
              )}
            </div>
            <div className="col-6">
              <label htmlFor="flavour">flavour</label>
              <select id="flavour" className="form-control">
                <option selected>--None--</option>
                <option value="chocolate">Chocolate</option>
                <option value="strawberry">Strawberry</option>
                <option value="fruit">Fruit</option>
                <option value="raspberry">Raspberry</option>
                <option value="black forest">Black Forest</option>
              </select>
              {this.state.errors && (
                <div className="text-danger">{this.state.errors.flavour}</div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label htmlFor="description" className="form-label">
                Cake Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
              ></textarea>
              {this.state.errors && (
                <div className="text-danger">
                  {this.state.errors.description}
                </div>
              )}
            </div>
            <div className="col-6">
              <label htmlFor="ingredients" className="form-label">
                Ingredients
              </label>
              <textarea
                className="form-control"
                id="ingredients"
                rows="3"
              ></textarea>
              {this.state.errors && (
                <div className="text-danger">
                  {this.state.errors.ingredients}
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <label htmlFor="weight">Weight (in pounds)</label>
              <input
                type="number"
                min="1"
                max="5"
                className="form-control"
                id="weight"
                placeholder="What cake size are you looking for?"
                name="weight"
              />
              {this.state.errors && (
                <div className="text-danger">{this.state.errors.weight}</div>
              )}
            </div>
            <div className="col-4">
              <label htmlFor="cakeType">Cake Type</label>
              <select id="cakeType" className="form-control">
                <option selected>General</option>
                <option>Birthday</option>
                <option>Anniversary</option>
                <option>Photo Cakes</option>
              </select>
            </div>
            <div className="col-4">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                className="form-control"
                placeholder="Price in Rupees"
              />
              {this.state.errors && (
                <div className="text-danger">{this.state.errors.price}</div>
              )}
            </div>
          </div>
          <br />
          <div className="row">
            <div className="eggless">
              <input
                className="form-check-input"
                type="checkbox"
                id="eggless"
              />
              <label htmlFor="eggless">Eggless?</label>
            </div>
          </div>
          <div className="row imgDiv">
            <div className="mb-3 col-4">
              <label htmlFor="description" className="form-label">
                Additional information
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
              ></textarea>
            </div>
            <div className="mb-3 col-4">
              <input
                className="form-control"
                type="file"
                id="cakeImage"
                onChange={this.uploadImage}
              />
              {this.state.errors && (
                <div className="text-danger">{this.state.errors.cakeImage}</div>
              )}
            </div>
            <div className="mb-3 col-4 imageChoosen">
              {this.state.file && (
                <img src={this.state.file} alt="choosen cake" width="150px" />
              )}
            </div>
          </div>
          <button type="submit" className="btn btn-success">
            Add Cake
          </button>
        </form>
      </div>
    );
  }
}
export default Product;
