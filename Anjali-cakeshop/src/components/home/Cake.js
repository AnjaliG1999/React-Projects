import { withRouter } from "react-router";
import { StarHalf } from "@material-ui/icons";

import "../../css/Cake.css";

function Cake(props) {
  // console.log(props.cakesData);
  const showCake = () => {
    var url = "/showcake/" + props.cakesData.cakeid;
    props.history.push(url);
  };
  return (
    <div className="cake" onClick={showCake}>
      <img
        onError={(e) => {
          e.target.onError = null;
          e.target.src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png";
        }}
        src={props.cakesData.image}
        alt="cake name"
        className="cake__item"
      />
      <div style={{ padding: "0 10%" }}>
        <span className="cake__name">{props.cakesData.name}</span>
        <div className="cake__info">
          <h4>&#8377; {props.cakesData.price}</h4>
          <button>
            {props.cakesData.ratings} <StarHalf />
          </button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Cake);
