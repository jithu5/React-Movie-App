import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
      <header className=" headerleft w-full h-fit py-10 flex px-8 md:px-20 items-center justify-between">
        <div className='flex items-center gap-4 sm:gap-10 md:gap-20'>
          <Link to="/">
            <img className='w-6 md:w-14'
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
              alt=""
            />
          </Link>
          <Link className='text-xs sm:text-sm md:text-lg font-semibold text-gray-400 hover:text-red-400' to="/movies/popular">Popular</Link>
          <Link className='text-xs sm:text-sm md:text-lg font-semibold text-gray-400 hover:text-red-400' to="/movies/top_rated">Top Rated</Link>
          <Link className='text-xs sm:text-sm md:text-lg font-semibold text-gray-400 hover:text-red-400' to="/movies/upcoming">Upcoming</Link>
        </div>
      </header>
    </>
  );
}

export default Header
