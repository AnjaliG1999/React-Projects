import { withRouter } from "react-router";

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
      <h3>{props.cakesData.name}</h3>
    </div>
  );
}

export default withRouter(Cake);
