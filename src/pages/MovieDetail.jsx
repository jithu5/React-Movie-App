import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";

function MovieDetail() {
  const [movieDetails, setMovieDetails] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, [id]);

  const MOVIE_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const getData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${MOVIE_KEY}&language=en-US`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setMovieDetails(data);
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  return (
    <>
      <div className="movie w-full md:w-[90vw] text-white mx-auto h-fit flex flex-col gap-24 py-10">
        <div className="movie__intro w-full h-fit relative ">
          <img
            className="movie__backdrop w-full max-sm:h-[250px]  object-cover object-center"
            src={`https://image.tmdb.org/t/p/original${
              movieDetails ? movieDetails.backdrop_path : ""
            }`}
          />{" "}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent h-[100%] bottom-0"></div>
          <div className="movie__detailRightTop absolute w-[80%] h-[40%] md:h-[50%] top-[20%] max-md:left-[10%] left-[25%] translate-y-[-10%] text-white flex flex-col max-md:gap-2 gap-5">
            <div className="movie__name text-lg md:text-2xl lg:text-5xl font-black">
              {movieDetails ? movieDetails.original_title : ""}
            </div>
            <div className="movie__tagline text-xs sm:text-sm md:text-md lg:text-lg font-semibold">
              {movieDetails ? movieDetails.tagline : ""}
            </div>
            <div className="movie__rating  text-xs sm:text-sm md:text-md lg:text-lg">
              {movieDetails ? movieDetails.vote_average : ""}{" "}
              <i class="fas fa-star" />
              <span className="movie__voteCount">
                {movieDetails ? "(" + movieDetails.vote_count + ") votes" : ""}
              </span>
            </div>
            <div className="movie__runtime text-xs sm:text-sm md:text-md lg:text-lg">
              {movieDetails ? movieDetails.runtime + " mins" : ""}
            </div>
            <div className="movie__releaseDate text-xs sm:text-sm md:text-md lg:text-lg">
              {movieDetails ? "Release date: " + movieDetails.release_date : ""}
            </div>
            <div className="movie__genres flex gap-3">
              {movieDetails && movieDetails.genres
                ? movieDetails.genres.map((genre) => (
                    <>
                      <span
                        className="movie__genre px-2 text-[8px] sm:text-sm md:text-md lg:text-lg md:px-4 py-1 md:py-2 rounded-xl border-2 border-white cursor-pointer"
                        id={genre.id}
                      >
                        {genre.name}
                      </span>
                    </>
                  ))
                : ""}
            </div>
          </div>
          <div className="movie__posterBox absolute top-[90%] left-[0%]">
            {" "}
            <img
              className="movie__poster w-24 md:w-32 lg:w-44 object-cover rounded-md"
              src={`https://image.tmdb.org/t/p/original${
                movieDetails ? movieDetails.poster_path : ""
              }`}
            />{" "}
          </div>
        </div>
        {/* close relative */}
        <div className="movie__detailRightBottom mt-32">
          <div className="synopsisText text-xl font-bold text-center mb-8">
            Synopsis
          </div>
          <div className="text-sm sm:text-md md:text-lg font-medium w-[95%] sm:w-[80%] mx-auto">
            {movieDetails ? movieDetails.overview : ""}
          </div>
        </div>
        <div className="movie__links flex flex-col gap-8 items-center">
          <div className="movie__heading text-xl font-semibold">
            Useful Links
          </div>
          <div className="flex gap-20 items-center ">
            {movieDetails && movieDetails.homepage && (
              <a
                className="hover:text-red-600"
                href={movieDetails.homepage}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <p>
                  <span className="movie__homeButton movie__Button">
                    Homepage <i className="newTab fas fa-external-link-alt"></i>
                  </span>
                </p>
              </a>
            )}
            {movieDetails && movieDetails.imdb_id && (
              <a
                className="hover:text-red-600"
                href={"https://www.imdb.com/title/" + movieDetails.imdb_id}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <p>
                  <span className="movie__imdbButton movie__Button">
                    IMDb<i className="newTab fas fa-external-link-alt"></i>
                  </span>
                </p>
              </a>
            )}
          </div>
        </div>
        <div className="movie__heading text-center text-3xl font-semibold">
          Production companies
        </div>
        <div className="movie__production mx-auto flex max-md:flex-col items-center justify-center gap-10">
          {movieDetails &&
            movieDetails.production_companies &&
            movieDetails.production_companies.map((company) => (
              <>
                {company.logo_path && (
                  <span className="productionCompanyImage ">
                    <img
                      className="movie__productionComapany w-32"
                      src={
                        "https://image.tmdb.org/t/p/original" +
                        company.logo_path
                      }
                    />
                    <span className="text-4xl font-bold">{company.name}</span>
                  </span>
                )}
              </>
            ))}
        </div>
      </div>
    </>
  );
}

export default MovieDetail;
