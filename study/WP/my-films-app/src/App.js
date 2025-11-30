import React, { useState } from 'react';
import './App.css'; 
import { initialFilms } from './data/films'; 
import Header from './component/Header';
import Sidebar from './component/Sidebar';
import FilmList from './component/FilmList';

function App() {
  const [films, setFilms] = useState(initialFilms);
  
  const Footer = () => <footer className="footer-style"><p>© My Films Library {new Date().getFullYear()}</p></footer>;

  return (
    <div className="App">
      <Header /> 
      
      <div className="container"> 
        <main> 
          
          {/* 1. Sidebar (Містить Manage Films і коректний Total Time) */}
          <Sidebar /> 

          {/* 2. Область для списку фільмів */}
          <div className="film-list-area"> 
            
            {/* ВИДАЛЕНО дублюючий Manage films, Total Time: 17h 47m та NaNh NaNm 
                 Вони тепер відображаються ЛИШЕ у Sidebar. */}
            
            <FilmList films={films} /> 
          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
