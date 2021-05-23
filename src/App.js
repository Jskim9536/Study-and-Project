import React from 'react';
import axios from  "axios";
import Movie from "./Movie";
import "./App.css";
// import PropTypes from "prop-types";



// const foodILike = [
//   {
//     id: 1,
//     name: "Kimchi",
//     image: "https://www.maangchi.com/wp-content/uploads/2014/06/whole-cabbage-kimchi.jpg",
//     rating: 5
//   },
//   {
//     id: 2,
//     name: "Bibimbap",
//     image: "https://togodallas.com/wp-content/uploads/2020/12/0010_B12_%EB%B9%84%EB%B9%94%EB%B0%A5-.jpg",
//     rating: 4.5
//   },
//   {
//     id: 3,
//     name: "Danmoji",
//     image: "https://t1.daumcdn.net/cfile/tistory/2471094B57A5589942",
//     rating: 3

//   }
// ]
// function Food(props) {
//   return (
//     <div>
//       <h3> I like {props.name}</h3>
//       <h4>{props.rating}/5.0</h4>
//       <img src={props.picture} alt = {props.name} />
//     </div>
//   );
// }

// Food.propTypes={
//   name: PropTypes.string.isRequired,
//   picture: PropTypes.string.isRequired,
//   rating: PropTypes.number.isRequired
// };

// function App() {
//   return (
//     <div>
//       {foodILike.map(dish =>
//         <Food key={dish.id} name={dish.name} picture={dish.image} rating={dish.rating}/>)}
//     </div>

//   );
// }

// className App extends React.Component {
//   state = {
//     count: 0
//   };
//   add = () => {
//     this.setState(current => ({count: current.count+1}));    
//   };
//   minus = () => {
//     this.setState(current => ({count: current.count-1})); 
//   };
//   render() {
//     return( 
//       <div>
//         <h1>I am a class {this.state.count} </h1>
//         <button onClick={this.add}>Add</button>
//         <button onClick={this.minus}>Minus</button>
//       </div>
//     );
//   }
// }

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };

  getMovies = async () => {
    const {
      data: {
        data: { movies }
      }
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating")
    this.setState({ movies, isLoading: false })
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
            <div className="movies">
              {movies.map(movie => (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
              ))}
            </div>
          )}
      </section>
    )
  }
}
export default App;


