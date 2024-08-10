import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import MovieList from './components/MovieList';
import MovieDetail from './pages/MovieDetail';
import Error from './pages/Error';

function App() {
  return (
    <>
      <div className="w-full min-h-screen h-fit bg-slate-950">
        <Router>
        <Header />
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path='movie/:id' element={<MovieDetail />}></Route>
            <Route path='movies/:type' element={<MovieList />}></Route>
            <Route path='*' element={<Error />}></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App
