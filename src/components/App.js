import React, {Component} from "react";
import Nav from './Nav';
import SearchBox from "./SearchBox";
import MovieList from "./MovieList";
import Pagination from './Pagination';
import MovieInfo from './MovieInfo';

class App extends Component {
  constructor(){
    super()
    this.state = {
      movies: [],
      searchTerm: '',
      totalResults: 0,
      currentPage: 1,
      currentMovie: null
    }
    this.apiKey = process.env.REACT_APP_API
  }
  reset = ()=> {
    this.setState(this.state = {
      movies: [],
      searchTerm: '',
      totalResults: 0,
      currentPage: 1,
      currentMovie: null,
      genres: []
    })
  }

  viewMovieInfo = (id) => {
    const filteredMovie = this.state.movies.filter(movie => movie.id ==id)
    const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null

    this.setState({ currentMovie: newCurrentMovie})
  }

  closeMovieInfo = () => {
    this.setState({currentMovie: null})
  }

  /*TODO 
  genres = () => {
    fetch (` https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`)
    .then(data => data.json())
    .then(data => {
      this.setState({genres: [...data.results]})
    })
  }*/

  /* handles tranistioning between pages.*/
  nextPage = (pageNumber) => {
    fetch (`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&query=${this.state.searchTerm}&page=${pageNumber}&include_adult=false`)
    .then(data => data.json())
    .then(data => {
      this.setState({movies: [...data.results], currentPage: pageNumber})
    })
  }

/* handles entering a search term and stores movie information form API into movies*/
  handleSubmit = (e) => {
    e.preventDefault();

    fetch (`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&query=${this.state.searchTerm}&page=1&include_adult=false`)
    .then(data => data.json())
    .then(data => {
      this.setState({movies: [...data.results], totalResults: data.total_results})
    })
  }

  /*handles typing in the search bar*/
  handleChange = (e) =>{
    this.setState({ searchTerm: e.target.value})
  }

  render() {
    const numberPages = Math.floor(this.state.totalResults / 20);

    return (
      <div className="App">
        <Nav />
        {this.state.currentMovie == null ? <div><SearchBox handleSubmit={this.handleSubmit} handleChange={this.handleChange} /><MovieList viewMovieInfo={this.viewMovieInfo} movies={this.state.movies}/></div> : <MovieInfo genres={this.state.genres} currentMovie={this.state.currentMovie} closeMovieInfo={this.closeMovieInfo} />}
        {this.state.totalResults>20 && this.state.currentMovie==null ? <Pagination pages={numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage} /> : ''}
      </div>
    );
  }
}

export default App;
