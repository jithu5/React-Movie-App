import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import MovieList from "./components/MovieList";
import MovieDetail from "./pages/MovieDetail";
import Error from "./pages/Error";
import loadings from "./assets/LOADING.svg";

function App() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const MOVIE_KEY = import.meta.env.VITE_TMDB_API_KEY;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${MOVIE_KEY}&language=en-US`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // console.log(data.results);
        setPopularMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchData(); // Call the async function within useEffect
  }, []);

  return (
    <>
      <div className="w-full min-h-screen pb-20 h-fit bg-slate-950">
        <Router>
          <Header />

          {loading ? (
            <div className="flex justify-center items-center bg-slate-900 w-100% h-full min-h-screen">
              <img src={loadings} className="w-40" alt="Loading..." />
            </div>
          ) : (
            <Routes>
              <Route
                index
                element={<Home popularMovies={popularMovies} />}
              ></Route>
              <Route path="movie/:id" element={<MovieDetail />}></Route>
              <Route path="movies/:type" element={<MovieList />}></Route>
              <Route path="*" element={<Error />}></Route>
            </Routes>
          )}
        </Router>
      </div>
    </>
  );
}

export default App;
