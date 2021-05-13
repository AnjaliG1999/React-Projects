import { useState } from "react";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import data from "../../data";
import addToCart from "../../Addtocart";
import axios from "../../axios";

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
    <div className="container cakeInfo">
      <div className="row" style={{ padding: "20px" }}>
        <h1>{cake.name}</h1>
        <StarRatings
          rating={cake.ratings}
          starRatedColor="brown"
          numberOfStars={5}
          name="rating"
          starDimension="20px"
          starSpacing="5px"
        />
      </div>
      <div className="row">
        <div className="col-4">
          <img
            onError={(e) => {
              e.target.onError = null;
              e.target.src =
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png";
            }}
            src={cake.image}
            alt="Error loading cake"
            style={{
              border: "3px solid black",
              borderRadius: "2%",
              width: "100%",
              height: "380px",
            }}
          />
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
      </div>
    </div>
  );
}

export default Cakedetails;
