import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../components/MovieList";

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const MOVIE_KEY = import.meta.env.VITE_TMDB_API_KEY;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${MOVIE_KEY}&language=en-US`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // console.log(data.results);
        setPopularMovies(data.results);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchData(); // Call the async function within useEffect
  }, []);

  return (
    <>
      <div className="mx-auto w-full min-h-screen bg-slate-900 h-fit pb-10">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={1000} // 1 second transition
          infiniteLoop={true}
          showStatus={false}
          autoFocus={true}
        >
          {popularMovies.map((movie, index) => (
            <Link
              key={index}
              style={{ textDecoration: "none", color: "white" }}
              to={`/movie/${movie.id}`}
            >
              <div className=" relative w-full h-[400px] md:h-[65vh] lg:h-[80vh] ">
                <div className="poster h-[100%] object-cover object-center">
                  <img
                    className="h-full object-cover"
                    src={`https://image.tmdb.org/t/p/original${
                      movie && movie.backdrop_path
                    }`}
                    alt=""
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent h-[100%] bottom-0"></div>
                </div>
                <div className="overlay w-[75%] h-fit absolute top-[50%] left-[10%] flex flex-col gap-2 md:gap-6 items-start translate-y-[-50%]">
                  <div className="title text-xl sm:text-3xl md:text-5xl lg:text-7xl font-black w-[55%]">
                    {movie ? movie.original_title : ""}
                  </div>
                  <div className="runtime text-sm md:text-md lg:text-lg font-semibold flex gap-4">
                    {movie ? movie.release_date : ""}
                    <span className="rating ml-6 flex items-center gap-2">
                      {movie ? movie.vote_average : ""}
                      <i
                        className="fa-solid fa-star text-lg"
                        style={{ color: "#ff0000" }}
                      ></i>
                    </span>
                  </div>
                  <div className="text-xs leading-tight md:text-md lg:text-lg text-white font-semibold w-full  md:w-[75%]">
                    {movie ? movie.overview : ""}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
        <MovieList />
      </div>
    </>
  );
}

export default Home;
