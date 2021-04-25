import Carousel from "./Carousel";
import Cake from "./Cake";
import axios from "axios";
import { Component } from "react";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      cakes: [],
    };
  }
  componentDidMount = () => {
    var cakes;
    axios({
      url: "https://apibyashu.herokuapp.com/api/allcakes",
      method: "get",
    }).then(
      (response) => {
        cakes = response.data.data;
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
