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
  var [ratings, setRatings] = useState(data.cake.ratings);
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
          <p>{cake.cakeid}</p>
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
            value={ratings}
            // value={cake.ratings}
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
      </div>
      {/* <div className="row" style={{ padding: "20px" }}>
        
      </div>
      <div className="row">
        <div className="col-4">
          
        </div>
        <div className="col-5" style={{ textAlign: "left", padding: "30px" }}>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <th>Flavour:</th>
                <td>{cake.flavour}</td>
              </tr>
              <tr>
                <th>Weight:</th>
                <td>{cake.weight} pounds</td>
              </tr>
              <tr>
                <th>Eggless?</th>
                {cake.eggless && <td>Yes</td>} {!cake.eggless && <td>No</td>}
              </tr>
              <tr>
                <th>Ingredients</th>
                <td>
                  {cake.ingredients && cake.ingredients.length > 0 && (
                    <ul>
                      {cake.ingredients.map((ingredient) => {
                        return <li>{ingredient}</li>;
                      })}
                    </ul>
                  )}
                </td>
              </tr>
              <tr>
                <th>Occasion:</th>
                <td>{cake.type}</td>
              </tr>
              <br />
              <tr>
                <td colSpan="2">{cake.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className="col-3"
          style={{
            backgroundColor: "#2b1d0e",
            borderRadius: "2%",
            height: "380px",
            textAlign: "center",
          }}
        >
          <div className="row">
            <div
              style={{
                margin: "auto",
                padding: "30px",
                fontSize: "large",
                color: "white",
              }}
            >
              <strong>Price:</strong> Rs. {cake.price}
            </div>
          </div>
          <br />
          <button
            style={{ position: "relative", top: "160px" }}
            type="button"
            onClick={cakeToCart}
            className="btn btn-primary"
          >
            Add to Cart
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default Cakedetails;
