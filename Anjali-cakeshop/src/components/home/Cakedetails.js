import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import data from "../../data";
import addToCart from "../../Addtocart";
import axios from "../../axios";

import "../../css/Cakedetails.css";
import { Breadcrumbs, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import {
  NavigateNext,
  VerifiedUser,
  InsertEmoticon,
  Security,
  LocalOffer,
  KeyboardArrowDown,
} from "@material-ui/icons";

function Cakedetails(props) {
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
          <p>Roll over image to zoom in</p>
        </div>
        <div className="cakedata__safety">
          <div className="cakedata__okay">
            <Security />
            <div>
              100% Smile Gauranteed
              <p>Unique Products On Time Delivery</p>
            </div>
          </div>
          <div className="cakedata__safe">
            <p>
              <VerifiedUser /> 100% Safe and Secure Payments.
            </p>
            <p>
              <InsertEmoticon /> 6 Million People Trust Us.
            </p>
          </div>
        </div>
      </div>
      <div className="cakedata__right">
        <h1>{cake.name}</h1>
        <div className="cakedata__popularity">
          <p style={{ color: "#ffa534" }}>{cake.ratings}</p>
          <Rating
            name="half-rating-read"
            value={3.5}
            precision={0.5}
            readOnly
          />
          <p style={{ color: "#3366BB" }}>{cake.reviews} Reviews</p>
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

        <div className="cake__description">
          <h2>Description</h2>

          <hr />
          <h5>Cake Details:</h5>
          <ul className="cakedata__details">
            <li>Flavour: {cake.flavour}</li>
            <li>Weight: {cake.weight}</li>
            <li>Shape: Circle</li>
            <li>Serves: 4-6 People</li>
            <li>Size: 3 Pounds</li>
            <li>Type: {cake.type}</li>
          </ul>

          <h5>About the Cake:</h5>
          <p>{cake.description}</p>
        </div>

        <div className="cake__description">
          <h2>Description</h2>

          <hr />
          <h5>Cake Details:</h5>
          <ul className="cakedata__details">
            <li>Flavour: {cake.flavour}</li>
            <li>Weight: {cake.weight}</li>
            <li>Shape: Circle</li>
            <li>Serves: 4-6 People</li>
            <li>Size: 3 Pounds</li>
            <li>Type: {cake.type}</li>
          </ul>

          <h5>About the Cake:</h5>
          <p>{cake.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Cakedetails;
