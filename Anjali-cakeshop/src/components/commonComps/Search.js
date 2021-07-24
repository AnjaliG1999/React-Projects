import CartItem from "../cart/CartItem";
import { Component } from "react";
import queryparser from "query-string";
import { withRouter } from "react-router";
import axios from "../../axios";

class Search extends Component {
  text;
  constructor() {
    super();
    this.state = {
      searchResults: [],
      query: "",
    };
  }
  componentDidMount = () => {
    this.text = queryparser.parse(this.props.location.search).cakeQuery;

    var url = "/api/searchcakes?q=" + this.text;
    axios.get(url).then(
      (response) => {
        console.log("response", response.data.data);
        this.setState({
          searchResults: response.data.data,
          query: this.text,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  componentDidUpdate = () => {
    this.text = queryparser.parse(this.props.location.search).cakeQuery;
    if (this.text !== this.state.query) {
      var url = "/api/searchcakes?q=" + encodeURIComponent(this.text);
      axios({
        url: url,
        method: "get",
      }).then(
        (response) => {
          console.log("response", response.data.data);
          this.setState({
            searchResults: response.data.data,
            query: this.text,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };
  sortByPrice = () => {
    var results = this.state.searchResults;
    results.sort(function (a, b) {
      var cakeA = a.price; // ignore upper and lowercase
      var cakeB = b.price; // ignore upper and lowercase
      if (cakeA < cakeB) {
        return -1;
      }
      if (cakeA > cakeB) {
        return 1;
      }
      return null;
    });
    console.log("sorted:", results);
    this.setState({ searchResults: results });
  };
  sortByRatings = () => {
    var results = this.state.searchResults;
    results.sort(function (a, b) {
      var cakeA = a.ratings; // ignore upper and lowercase
      var cakeB = b.ratings; // ignore upper and lowercase
      if (cakeA < cakeB) {
        return -1;
      }
      if (cakeA > cakeB) {
        return 1;
      }
      return null;
    });
    console.log("sorted:", results);
    this.setState({ searchResults: results });
  };
  sortByName = () => {
    var results = this.state.searchResults;
    results.sort(function (a, b) {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return null;
    });
    console.log("sorted:", results);
    this.setState({ searchResults: results });
  };
  sortByDate = () => {
    var results = this.state.searchResults;
    results.sort(function (a, b) {
      console.log("a", a.createdat, "b", b.createdat);
      return new Date(b.createdat * 1000) - new Date(a.createdat * 1000);
    });
  };
  filterByWeight = (event) => {
    const weight = event.target.innerText.split("")[0];
    // console.log("weight", this.state.searchResults[0].weight);
    var results = this.state.searchResults.filter((cake) => {
      return cake.weight === weight;
    });
    console.log(results);
    this.setState({ searchResults: results });
  };
  render() {
    return (
      <div className="search" id="Search">
        <div className="container">
          {this.state.searchResults && this.state.searchResults.length > 0 && (
            <div>
              <h1 style={{ textAlign: "center" }}>
                Results based on your Search
              </h1>
              <div className="row">
                <div className="col-3">
                  <div className="searchCategory">
                    <h3>Sort cakes by</h3>
                    <p onClick={this.sortByPrice}>Price</p>
                    <p onClick={this.sortByRatings}>Ratings</p>
                    <p onClick={this.sortByName}>Name</p>
                    <p onClick={this.sortByDate}>Date of Creation</p>
                  </div>
                  <div className="searchCategory">
                    <h3>Filter cakes by</h3>
                    <div className="filterSearch">
                      <button
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseWeight"
                        aria-expanded="false"
                        aria-controls="collapseWeight"
                      >
                        <b>Weight</b>
                      </button>
                      <ul
                        className="collapse"
                        id="collapseWeight"
                        style={{ listStyle: "none", textAlign: "left" }}
                      >
                        <li onClick={this.filterByWeight}>1 pounds</li>
                        <li onClick={this.filterByWeight}>2 pounds</li>
                        <li onClick={this.filterByWeight}>3 pounds</li>
                        <li onClick={this.filterByWeight}>4 pounds</li>
                        <li onClick={this.filterByWeight}>5 pounds</li>
                      </ul>
                    </div>
                    <div className="filterSearch">
                      <button
                        data-bs-toggle="collapse"
                        data-bs-target="#collapsePrice"
                        aria-expanded="false"
                        aria-controls="collapsePrice"
                      >
                        <b>Price</b>
                      </button>
                      <ul
                        className="collapse"
                        id="collapsePrice"
                        style={{ listStyle: "none", textAlign: "left" }}
                      >
                        <li>Under Rs. 299</li>
                        <li>Rs.300-Rs.499</li>
                        <li>Rs.500-Rs.1999</li>
                        <li>Above 2000</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-9">
                  {this.state.searchResults.map((item) => {
                    return (
                      <CartItem cakesData={item} fromLocation={"search"} />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          <div>
            {!this.state.searchResults.length > 0 && (
              <h2>No results found, please search for another cake type</h2>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Search);
