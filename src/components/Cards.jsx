import React,{useState,useEffect} from 'react'
import Skeleton,{SkeletonTheme} from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import '../App.css'

function Cards({movie}) {
    const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
     // Set loading to true while fetching or receiving new movie data
     if (!movie && !movie.poster_path && !movie.original_title) {
       setIsLoading(true); // Loading while waiting for movie data
     } else {
       setIsLoading(false); // Stop loading when data is available
     }
   }, [movie]);


    
  return (
    <>
     {isLoading ? (
          <div className="lightning-skeleton rounded-md h-[200px]  ">
            <SkeletonTheme color="#202020" highlightColor="#444">
              <Skeleton height={300} duration={2} />
            </SkeletonTheme>
          </div>
        ) : (
          <Link to={`/movie/${movie.id}`}>
            <div className="cards relative rounded-md bg-white group hover:scale-125 hover:z-10 transition-all duration-300">
              <img
                className="img w-full rounded-md"
                src={`https://image.tmdb.org/t/p/original${
                  movie ? movie.poster_path : ""
                }`}
                alt=""
              />
              <div className="cardoverlay  opacity-0 z-50 group-hover:opacity-100 absolute inset-0 transition-opacity duration-200 top-[50%] px-2 left[50%] text-white flex flex-col gap-4 translate-y-[-50%]">
                <div className="title text-sm md:text-xl font-bold">
                  {movie ? movie.original_title : ""}
                </div>
                <div className="runtime text-md font-bold">
                  {movie ? movie.release_date : ""}{" "}
                  <span className="rating">
                    {" "}
                    {movie ? movie.vote_average : ""}
                    <i
                      className="fa-solid fa-star text-sm"
                      style={{ color: "#ff0000" }}
                    ></i>
                  </span>
                </div>
                <div className="desc leading-tight text-xs font-semibold">
                  {movie ? movie.overview.slice(0, 110) + "....." : ""}
                </div>
              </div>
            </div>
          </Link>
        )}
      
    </>
  );
}

export default Cards
