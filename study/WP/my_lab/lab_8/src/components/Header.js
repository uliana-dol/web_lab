import React from 'react';
import Nav from './Nav';

const Header = () => (
    <header className="site-header">
        <div className="container header-inner">
            <h1 className="logo">FilmFest</h1>
            <Nav />
        </div>
    </header>
);

export default Header;
