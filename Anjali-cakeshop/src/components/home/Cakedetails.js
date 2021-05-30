import React, { Fragment, useState } from "react";

import { Link, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";

import data from "../../data";
import addToCart from "../../Addtocart";
import axios from "../../axios";

import "../../css/Cakedetails.css";
import { Breadcrumbs, TextField, Typography } from "@material-ui/core";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import {
  NavigateNext,
  VerifiedUser,
  InsertEmoticon,
  Security,
  LocalOffer,
  KeyboardArrowDown,
} from "@material-ui/icons";

function Cakedetails(props) {
  const [selectedDate, handleDateChange] = useState(new Date());
  const cakeToCart = () => {
    var cake = {
      email: localStorage.email,
      name: data.cake.name,
      cakeid: data.cake.cakeid,
      price: data.cake.price,
      weight: data.cake.weight,
      image: data.cake.image,
    };
    addToCart(props, cake);
  };

  var { cakeid } = useParams();
  var [cake, setCake] = useState(data.cake);
  // var [ratings, setRatings] = useState(data.cake.ratings);
  var url = "/api/cake/" + cakeid;

  if (data.cake && data.cake.cakeid !== cakeid) {
    console.log(data.cake);
    axios.get(url).then(
      (response) => {
        data.cake = response.data[0];
        setCake(response.data[0]);
        // console.log("this cake", response.data[0]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  return (
    <div className="container cakedata">
      <div className="cakedata__left">
        <div className="cakedata__breadcrumb">
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link color="inherit" to="/">
              Home
            </Link>
            <Typography color="textPrimary">{cake.name}</Typography>
          </Breadcrumbs>
        </div>
        <div className="cakedata__imgContainer">
          <img
            className="cakedata__img"
            onError={(e) => {
              e.target.onError = null;
              e.target.src =
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png";
            }}
            src={cake.image}
            alt="Error loading cake"
          />
        </div>
        <div className="cakedata__zoom">
          <p style={{ color: "gray" }}>{cake.cakeid}</p>
          <p>Click on the image to zoom in</p>
        </div>

        <div className="cakedata__cart">
          <input
            type="text"
            className="cakedata__message"
            placeholder="Message On Cake"
          />
          <TextField
            id="datetime-local"
            label="Delivery Date"
            type="datetime-local"
            defaultValue={new Date().toISOString().substr(0, 16)}
            className="cakedata__date"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ min: new Date().toISOString().substr(0, 16) }}
          />
          <button type="button" onClick={cakeToCart} className="btn">
            Add to Cart
          </button>
        </div>
      </div>
      <div className="cakedata__right">
        <div className="cakedata__header">
          <h1>{cake.name}</h1>

          <div className="cakedata__popularity">
            <p>{cake.ratings}</p>
            <StarRatings
              rating={cake.ratings}
              starRatedColor="brown"
              numberOfStars={5}
              name="rating"
              starDimension="20px"
              starSpacing="5px"
            />
            <p>{cake.reviews} Reviews</p>
          </div>
          <div className="cakedata__priceContainer">
            <div className="cakedata__price">
              <span>&#8377;</span> 599
            </div>
            <div className="cakedata__offer">
              <p>
                &#8377; <del>{cake.price}</del> <span>(14% OFF)</span>
              </p>
              <button className="cakedata__offerBtn" type="button">
                <LocalOffer />
                Offers Available <KeyboardArrowDown />
              </button>
            </div>
          </div>
          <small style={{ paddingLeft: "10%" }}>Inclusive of all prices</small>
        </div>

        <ul
          className="nav nav-tabs nav-justified"
          id="myTab"
          role="tablist"
          style={{ marginTop: "5%" }}
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="description-tab"
              data-bs-toggle="tab"
              data-bs-target="#description"
              type="button"
              role="tab"
              aria-controls="description"
              aria-selected="true"
            >
              Description
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="delivery-tab"
              data-bs-toggle="tab"
              data-bs-target="#delivery"
              type="button"
              role="tab"
              aria-controls="delivery"
              aria-selected="false"
            >
              Delivery Information
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="care-tab"
              data-bs-toggle="tab"
              data-bs-target="#care"
              type="button"
              role="tab"
              aria-controls="care"
              aria-selected="false"
            >
              Care Instructions
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="description"
            role="tabpanel"
            aria-labelledby="description-tab"
          >
            <div className="cake__description">
              <div className="cakedata__details">
                <h5>Cake Details:</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Flavour:</strong> {cake.flavour}
                  </li>
                  <li className="list-group-item">
                    <strong>Weight:</strong> {cake.weight} pounds
                  </li>
                  <li className="list-group-item">
                    <strong>Shape:</strong> Circle
                  </li>
                  <li className="list-group-item">
                    <strong>Serves:</strong> 4-6 People
                  </li>
                  <li className="list-group-item">
                    <strong>Type:</strong> {cake.type} Cake
                  </li>
                </ul>
              </div>

              <div className="cakedata__about" style={{ flex: 2 }}>
                <h5>About the Cake:</h5>
                {/* truncate description as well? */}
                <p style={{ overflowWrap: "anywhere" }}>{cake.description}</p>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="delivery"
            role="tabpanel"
            aria-labelledby="delivery-tab"
          >
            <ul className="list-group list-group-flush cake__description">
              <li className="list-group-item">
                Every cake we offer is handcrafted and since each chef has
                his/her own way of baking and designing a cake, there might be
                slight variation in the product in terms of design and shape.
              </li>
              <li className="list-group-item">
                The chosen delivery time is an estimate and depends on the
                availability of the product and the destination to which you
                want the product to be delivered.{" "}
              </li>
              <li className="list-group-item">
                Since cakes are perishable in nature, we attempt delivery of
                your order only once. The delivery cannot be redirected to any
                other address.
              </li>
              <li className="list-group-item">
                This product is hand delivered and will not be delivered along
                with courier products.
              </li>
              <li className="list-group-item">
                Occasionally, substitutions of flavours/designs is necessary due
                to temporary and/or regional unavailability issues.
              </li>
            </ul>
          </div>
          <div
            className="tab-pane fade"
            id="care"
            role="tabpanel"
            aria-labelledby="care-tab"
          >
            <ul className="list-group list-group-flush cake__description">
              <li className="list-group-item">
                Store cream cakes in a refrigerator. Fondant cakes should be
                stored in an air conditioned environment.
              </li>
              <li className="list-group-item">
                Slice and serve the cake at room temperature and make sure it is
                not exposed to heat.
              </li>
              <li className="list-group-item">
                Use a serrated knife to cut a fondant cake.
              </li>
              <li className="list-group-item">
                Sculptural elements and figurines may contain wire supports or
                toothpicks or wooden skewers for support.
              </li>
              <li className="list-group-item">
                Sculptural elements and figurines may contain wire supports or
                toothpicks or wooden skewers for support.
              </li>
              <li className="list-group-item">
                The cake should be consumed within 24 hours.
              </li>
              <li className="list-group-item">Enjoy your cake!</li>
            </ul>
          </div>
        </div>

        <div className="cakedata__safety">
          <p className="cakedata__safe">
            <VerifiedUser /> 100% Safe and Secure Payments.
          </p>
          <p className="cakedata__safe">
            <InsertEmoticon /> 6 Million People Trust Us.
          </p>
          <div className="cakedata__okay">
            <Security />
            <div>
              100% Smile Gauranteed
              <p>Unique Products On Time Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cakedetails;
