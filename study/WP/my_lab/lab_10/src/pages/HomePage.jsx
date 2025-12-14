import React, { useState } from 'react';
import Hero from '../components/Hero';
import FilmsGallery from '../components/FilmsGallery';
import PrimaryButton from '../components/PrimaryButton.jsx';

const HomePage = () => {
    const [showMore, setShowMore] = useState(false);

    return (
        <main>
        <Hero />
        <div className="container home-extras">
            <h3>Welcome to FilmFest</h3>
            <p>This is a small demo site showing a films catalog built with React.</p>
            {showMore && (
            <>
                <h4>More content</h4>
                <p>Here is additional info that appears when you click "View more" — use this area for bios, descriptions, or sample text.</p>
            </>
            )}
            <PrimaryButton onClick={() => setShowMore((s) => !s)}>
            {showMore ? 'Show less' : 'View more'}
            </PrimaryButton>
        </div>

        <FilmsGallery />
        </main>
    );
};

export default HomePage;
