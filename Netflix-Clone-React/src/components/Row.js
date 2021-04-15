import React, { Component } from 'react';
import axios from '../axios';

class Row extends Component {
    constructor(){
        super();
        this.state = {
            fetchUrl: '',
            movies: []
        };
    }

    componentDidMount(){
        // const request = axios.get(this.props.fetchUrl)
        // console.log(request);

        axios.get(this.props.fetchUrl).then(response => {
            // console.log("response", response.data.results);
            this.setState({movies: response.data.results})
        }).catch (error => {
            console.log("error", error);
        })
    }
    componentDidUpdate(){
        console.log("movies", this.state.movies);
        if(this.state.fetchUrl !== this.props.fetchUrl) {
            this.setState({fetchUrl: this.props.fetchUrl})
        }
    }

    render() {
        // snippet of code that runs based on specific condition/ variable
        return (
            <div>
                {this.state.movies.length > 0 && 

                <div className="row">
                    <h2>{this.props.title}</h2>

                    {/* container -> posters */}
                    <div className="row_posters">
                        {this.state.movies.map(movie => {
                            return <p>{movie.name}</p>
                        })}
                    </div>
                </div>
                }
            </div>
        );
    }
}

export default Row;