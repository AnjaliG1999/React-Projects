import Carousel from "./Carousel";
import Footer from "../commonComps/Footer";
import Cake from "./Cake";
import { Component } from "react";
import axios from "../../axios";

import "../../css/Home.css";

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
      <div className="home">
        {/* Carousal */}
        <Carousel />

        {/* Cake List */}
        <div className="home__cakelist" id="Home">
          {this.state.cakes.map((cake) => {
            return <Cake cakesData={cake} />;
          })}
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default Home;
