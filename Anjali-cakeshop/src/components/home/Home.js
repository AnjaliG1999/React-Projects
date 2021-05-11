import Carousel from "./Carousel";
import Cake from "./Cake";
import { Component } from "react";
import axios from "../../axios";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      cakes: [],
    };
  }
  componentDidMount = () => {
    var cakes;
    axios.get("/api/allcakes").then(
      (response) => {
        cakes = response.data;
        this.setState({ cakes: cakes });
        // console.log("all cakes", response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  render() {
    return (
      <div>
        <Carousel />

        <div className="container-fluid" id="Home">
          <div className="row">
            {this.state.cakes.map((cake) => {
              return <Cake cakesData={cake} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
