import React from 'react';
import Nav from './Nav';
import { useSelector } from 'react-redux';

const Header = () => {
    const cart = useSelector((state) => state.cart || []);
    const count = cart.reduce((s, i) => s + (i.qty || 1), 0);

    return (
        <header className="site-header">
            <div className="container header-inner">
                <h1 className="logo">FilmFest</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Nav />
                    <div className="cart-badge">Cart: {count}</div>
                </div>
            </div>
        </header>
    );
};

export default Header;
