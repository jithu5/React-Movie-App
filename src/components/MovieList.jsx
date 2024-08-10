import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import { useParams } from "react-router-dom";

function MovieList() {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [type]);
  const MOVIE_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const getData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${
          type ? type : "popular"
        }?api_key=${MOVIE_KEY}&language=en-US`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log(data.results);
      setMovieList(data.results);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };
  return (
    <>
      <div className="movielist bg-slate-950 h-fit py-10">
        <h2 className="text-4xl font-black text-center text-white my-6">{(type ? type.replace('_',' ') : "POPULAR").toUpperCase()}</h2>
        <div className="list cards grid max-sm:gap-3 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8 mx-auto w-[90%]">
          {movieList.map((movie) => {
            return <Cards movie={movie} />;
          })}
        </div>
      </div>
    </>
  );
}

export default MovieList;
