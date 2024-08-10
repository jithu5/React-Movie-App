import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/movie.png'

function Header() {
  return (
    <>
      <header className=" headerleft w-full h-fit py-6 flex px-8 md:px-20 items-center justify-between">
        <div className='flex items-center gap-4 sm:gap-10 md:gap-20'>
          <Link to="/">
            <img className='w-8 md:w-16'
              src={logo}
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
