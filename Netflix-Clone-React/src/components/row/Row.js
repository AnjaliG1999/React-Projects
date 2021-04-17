import React, { Component } from "react";
import axios from "../../axios";
import "./Row.css";
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseUrl = "https://image.tmdb.org/t/p/original/";

const opts = {
      height: '390',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };


class Row extends Component {
  constructor() {
    super();
    this.state = {
      fetchUrl: "",
      movies: [],
      trailerUrl: ""
    };
  }

  componentDidMount() {
    // const request = axios.get(this.props.fetchUrl)
    // console.log(request);

    axios
      .get(this.props.fetchUrl)
      .then((response) => {
        // console.log("response", response.data.results[0]);
        this.setState({ movies: response.data.results });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  componentDidUpdate() {
    // console.log(this.state.movies);
    if (this.state.fetchUrl !== this.props.fetchUrl) {
      this.setState({ fetchUrl: this.props.fetchUrl });
    }
  }
  handleClick = (movie) => {
  console.log(movie)
  if(this.state.trailerUrl){
    this.setState({trailerUrl: ""})
  }
  else {
    movieTrailer(movie?.name || movie?.title || movie?.original_name || "").then(url => {
      const urlParams = new URLSearchParams(new URL(url).search)
      this.setState({trailerUrl: urlParams.get('v')})
    }).catch(error => console.log(error))
    
  }
    // alert(this.state.trailerUrl)
}

  render() {
    // snippet of code that runs based on specific condition/ variable
    return (
      <div>
        {this.state.movies.length > 0 && (
          <div className="row">
            <h2>{this.props.title}</h2>
            {/* container -> posters */}
            <div className="row_posters">
              {this.state.movies.map((movie) => {
                return (
                  <img
                    key={movie.id} // helps re-render only what changes in the row: optimization
                    className={`row_poster ${
                      this.props.isLargeRow && "row_poster_large"
                    }`}
                    onClick={() => this.handleClick(movie)}
                    src={`${baseUrl}${
                      this.props.isLargeRow
                        ? movie.poster_path
                        : movie.backdrop_path
                    }`}
                    alt={movie.name}
                  />
                );
              })}
            </div>
            {this.state.trailerUrl && <YouTube
              videoId={this.state.trailerUrl}
              opts={opts}
              // onReady={this._onReady}
            />}
          </div>
        )}
      </div>
    );
  }
}

export default Row;
