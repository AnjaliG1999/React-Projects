import React, { useEffect, useState } from "react";

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
  const [errors, setErrors] = useState({});

  // useEffect(() => {}, [cake, errors]);

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
        if (response.status === 201) {
          toast.success("Cake added successfully!!");
          setTimeout(() => {
            history.push("/");
          }, 2000);
        } else if (response.status === 212) {
          toast.error("Enter valid data");
          setErrors(response.data.errors);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
  const getObject = (event, cakeDetails) => {
    for (const el of event.target.elements) {
      // ignore button
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

    /* Previous data being displayed!!!!!!!!! Change state after api response */

    getObject(event, cakeDetails);
  };
  return (
    <div className="container addcake">
      <h2>Add New Cake</h2>
      <form className="g-3 addcake__form" method="POST" onSubmit={validateInfo}>
        <div>
          <label htmlFor="name">Enter Cake Name</label>
          <input type="text" className="form-control" id="name" name="name" />
          <small className="text-danger">{errors.name?.message}</small>
        </div>
        <div>
          <label htmlFor="flavour">Flavour</label>
          <select id="flavour" className="form-control">
            <option defaultValue="chocolate">Chocolate</option>
            <option value="strawberry">Strawberry</option>
            <option value="fruit">Fruit</option>
            <option value="raspberry">Raspberry</option>
            <option value="black forest">Black Forest</option>
          </select>
          <small className="text-danger">{errors.flavour?.message}</small>
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
          <small className="text-danger">{errors.description?.message}</small>
        </div>
        <div>
          <label htmlFor="weight">Weight (in pounds)</label>
          <input
            type="number"
            min="1"
            max="5"
            className="form-control"
            id="weight"
            name="weight"
          />
          <small className="text-danger">{errors.weight?.message}</small>
        </div>
        <div>
          <label htmlFor="type">Cake Type</label>
          <select id="type" className="form-control">
            <option defaultValue>General</option>
            <option>Birthday</option>
            <option>Anniversary</option>
            <option>Cartoon</option>
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
          <small className="text-danger">{errors.price?.message}</small>
        </div>
        <div>
          <label htmlFor="shape">Cake Shape</label>
          <select id="shape" className="form-control">
            <option defaultValue>Circle</option>
            <option>Square</option>
            <option>Rectangle</option>
            <option>Heart</option>
            <option>Donut</option>
            <option>Custom</option>
          </select>
        </div>
        <div className="addcake__serves mt-4">
          <div>
            <label htmlFor="servesMin">Serves Minimum</label>
            <input
              type="number"
              id="servesMin"
              name="servesMin"
              className="form-control"
            />
            <small className="text-danger">{errors.servesMin?.message}</small>
          </div>
          <div>
            <label htmlFor="servesMax">Serves Maximum</label>
            <input
              type="number"
              id="servesMax"
              name="servesMax"
              className="form-control"
            />
            <small className="text-danger">{errors.servesMax?.message}</small>
          </div>
        </div>
        <div className="addcake__imgContainer mt-4">
          <div className="mb-3 addcake__upload">
            <div>
              <input
                className="form-control"
                type="file"
                id="image"
                onChange={uploadImage}
              />
              <small className="text-danger">{errors.image?.message}</small>
            </div>

            <button type="submit" className="addcake__submit mt-4">
              Add Cake
            </button>
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
      </form>
    </div>
  );
};

export default AddCake;
