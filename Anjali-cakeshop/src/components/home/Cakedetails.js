import React, { useState } from "react";

import { Link, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";

import data from "../../data";
import addToCart from "../../Addtocart";
import axios from "../../axios";

import "../../css/CakeDetails.css";
import {
  Breadcrumbs,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import {
  NavigateNext,
  VerifiedUser,
  InsertEmoticon,
  Security,
  LocalOffer,
  KeyboardArrowDown,
  HighlightOff,
} from "@material-ui/icons";
import CakeTabs from "./CakeTabs";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function Cakedetails(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const [selectedDate, handleDateChange] = useState(new Date());
  const cakeToCart = () => {
    var cake = {
      email: localStorage.email,
      name: data.cake.name,
      cakeid: data.cake.cakeid,
      price: data.cake.price,
      weight: data.cake.weight,
      image: data.cake.image,
      // message: document.querySelector("#cakeMsg").value,
      // date: document.querySelector("#cakeDate").value,
    };
    // console.log(cake);
    addToCart(props, cake);
  };

  var { cakeid } = useParams();
  var [cake, setCake] = useState(data.cake);
  // var [ratings, setRatings] = useState(data.cake.ratings);
  var url = "/api/cake/" + cakeid;

  if (data.cake?.cakeid !== cakeid) {
    // console.log(data.cake);
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
            onClick={handleClickOpen}
            onError={(e) => {
              e.target.onError = null;
              e.target.src =
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png";
            }}
            src={cake.image}
            alt="Error loading cake"
          />
          <Dialog
            fullScreen={fullScreen}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {cake.name}{" "}
              <HighlightOff
                onClick={handleClose}
                style={{
                  position: "absolute",
                  right: "20px",
                  cursor: "pointer",
                }}
              />
            </DialogTitle>
            <DialogContent>
              <img
                className="cakedata__img"
                width="500px"
                onClick={handleClickOpen}
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src =
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png";
                }}
                src={cake.image}
                alt="Error loading cake"
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="cakedata__zoom">
          <p style={{ color: "#86623b" }}>{cake.cakeid}</p>
          <p>Click on the image to zoom in</p>
        </div>

        <div className="cakedata__cart">
          <input
            type="text"
            className="cakedata__message"
            id="cakeMsg"
            placeholder="Message On Cake"
          />
          <TextField
            label="Delivery Date"
            id="cakeDate"
            type="datetime-local"
            // defaultValue={new Date().toISOString().substr(0, 16)}
            className="cakedata__date"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ min: new Date().toISOString().substr(0, 16) }}
          />
          <button type="button" onClick={cakeToCart} className="btn">
            Add to Cart
          </button>
          {/* <button type="button" className="btn">
            Order Cake
          </button> */}
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

        <CakeTabs cake={cake} />

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
