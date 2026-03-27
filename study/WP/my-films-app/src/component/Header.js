import React from 'react';

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    {/* Виправлено: href="#" змінено на href="/" для навігаційних посилань */}
                    <li><a href="/">Films library</a></li>
                    <li><a href="/my-films">My Films</a></li>
                    {/* Виправлено: "Add Film" перетворено на <button>, оскільки це дія (відкриття модального вікна) */}
                    <li><button id="create-btn">Add Film</button></li>
                </ul>
                <div className="search-menu">
                    <input type="text" id="search-input" placeholder="Search films..."/>
                    <button className="search-btn">Search</button>
                    <button className="clear-btn">Clear</button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
