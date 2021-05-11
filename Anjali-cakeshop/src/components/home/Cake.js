import { withRouter } from "react-router";

function Cake(props) {
  // console.log(props.cakesData);
  const showCake = () => {
    var url = "/showcake/" + props.cakesData.cakeid;
    props.history.push(url);
  };
  return (
    <div
      className="col-2 cakeRow"
      style={{
        textAlign: "center",
        borderRadius: "10px",
        border: "1px solid #2b1d0e",
      }}
      onClick={showCake}
    >
      <div>
        <img
          onError={(e) => {
            e.target.onError = null;
            e.target.src =
              "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png";
          }}
          src={props.cakesData.image}
          width="100%"
          height="180px"
          alt="cake name"
        />
      </div>
      <h4>{props.cakesData.name}</h4>
      <p>Rs. {props.cakesData.price}</p>
    </div>
  );
}

export default withRouter(Cake);
