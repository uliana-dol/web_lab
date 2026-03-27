import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FilmsGallery from './components/FilmsGallery';
import Footer from './components/Footer';
import './App.css';

function App() {
    return (
        <div className="app">
            <Header />
            <main>
                <Hero />
                <FilmsGallery />
            </main>
            <Footer />
        </div>
    );
}

export default App;
