import React, { useState } from "react";

import { toast } from "react-toastify";
import axios from "../../axios";

import { useHistory } from "react-router";

import "../../css/AddCake.css";

const AddCake = () => {
  const history = useHistory();
  if (!localStorage.token) {
    alert("Sorry, you need to login to add cakes");
    history.push("/login");
  }

  const [cakeImg, setCakeImg] = useState("");
  const [cake, setCake] = useState({});

  const uploadImage = (event) => {
    var formdata = new FormData();
    formdata.append("file", event.target.files[0]);

    const headers = {
      authtoken: localStorage.token,
    };

    axios
      .post("/api/upload", formdata, {
        headers,
      })
      .then(
        (response) => {
          console.log(response.data);
          setCakeImg(response.data.imageUrl);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const saveDetails = () => {
    axios({
      url: "/api/addcake",
      method: "post",
      data: cake,
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
  const getObject = (event, cakeDetails) => {
    for (const el of event.target.elements) {
      if (el.id === "") {
        continue;
      }
      cakeDetails[el.id] = el.value;
    }

    cakeDetails.image = cakeImg;

    console.log("cake details", cakeDetails);

    setCake(cakeDetails);
    saveDetails();
  };
  const validateInfo = (event) => {
    event.preventDefault();
    let cakeDetails = {};
    // this.setState({ errors: {} });

    /* Add backend validations */

    // const elements = event.target.elements;
    // if (!elements.cakeName.value) {
    //   errors.cakeName = "Name is required";
    // }
    // if (elements.flavour.value === "--None--") {
    //   errors.flavour = "flavour is required";
    // }
    // if (!elements.description.value) {
    //   errors.description = "Description is required";
    // }
    // if (!elements.ingredients.value) {
    //   errors.ingredients = "Ingredients are required";
    // }
    // if (!elements.weight.value) {
    //   errors.weight = "Weight is required";
    // }
    // if (!elements.price.value) {
    //   errors.price = "Price is required";
    // }
    // if (!elements.cakeImage.files[0]) {
    //   errors.cakeImage = "Cake image is required";
    // }
    // console.log(errors);

    // this.setState({ errors: errors }, () => {
    //   if (Object.keys(errors).length === 0) {
    //     toast.success("Cake added successfully!!");
    //     setTimeout(() => {
    //       this.props.history.push("/");
    //     }, 2000);
    //   } else {
    //     toast.error("Enter valid data");
    //   }
    // });

    getObject(event, cakeDetails);
  };
  return (
    <div className="container addcake">
      <h2>Add New Cake</h2>
      <form className="g-3 addcake__form" method="POST" onSubmit={validateInfo}>
        <div>
          <label htmlFor="name">Enter Cake Name</label>
          <input type="text" className="form-control" id="name" name="name" />
          {/* {state.errors && (
            <div className="text-danger">{state.errors.name}</div>
          )} */}
        </div>
        <div>
          <label htmlFor="flavour">Flavour</label>
          <select id="flavour" className="form-control">
            <option defaultValue="none">--None--</option>
            <option value="chocolate">Chocolate</option>
            <option value="strawberry">Strawberry</option>
            <option value="fruit">Fruit</option>
            <option value="raspberry">Raspberry</option>
            <option value="black forest">Black Forest</option>
          </select>
          {/* {state.errors && (
            <div className="text-danger">{state.errors.flavour}</div>
          )} */}
        </div>
        <div>
          <label htmlFor="description" className="form-label">
            Cake Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
          ></textarea>
          {/* {state.errors && (
            <div className="text-danger">{state.errors.description}</div>
          )} */}
        </div>
        <div>
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
          {/* {state.errors && (
            <div className="text-danger">{state.errors.weight}</div>
          )} */}
        </div>
        <div>
          <label htmlFor="type">Cake Type</label>
          <select id="type" className="form-control">
            <option selected>General</option>
            <option>Birthday</option>
            <option>Anniversary</option>
            <option>Photo Cakes</option>
          </select>
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            className="form-control"
            placeholder="Price in Rupees"
          />
          {/* {state.errors && (
            <div className="text-danger">{state.errors.price}</div>
          )} */}
        </div>
        <div className="addcake__imgContainer mt-4">
          <div className="mb-3 addcake__upload">
            <input
              className="form-control"
              type="file"
              id="image"
              onChange={uploadImage}
            />
            {!cakeImg && (
              <div className="text-danger">{"no image selected"}</div>
            )}
          </div>
          <div className="mb-3 addcake__image">
            {cakeImg && <img src={cakeImg} alt="choosen cake" width="150px" />}
            {!cakeImg && (
              <img
                src="https://previews.123rf.com/images/aquir/aquir1311/aquir131100316/23569861-sample-grunge-red-round-stamp.jpg"
                alt="no cake"
                width="150px"
              />
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          Add Cake
        </button>
      </form>
    </div>
  );
};

export default AddCake;
