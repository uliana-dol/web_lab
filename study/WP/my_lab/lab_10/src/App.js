import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FilmsLibrary from './pages/FilmsLibrary';
import FilmDetails from './pages/FilmDetails';
import { FilmProvider } from './context/FilmContext';
import AboutPage from './pages/AboutPage';
import Cart from './pages/Cart';
import './App.css';

function App() {
    return (
        <ReduxProvider store={store}>
            <FilmProvider>
                <BrowserRouter>
                    <div className="app">
                        <Header />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/films" element={<FilmsLibrary />} />
                            <Route path="/films/:id" element={<FilmDetails />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/contact" element={<HomePage />} />
                        </Routes>
                        <Footer />
                    </div>
                </BrowserRouter>
            </FilmProvider>
        </ReduxProvider>
    );
}

export default App;
