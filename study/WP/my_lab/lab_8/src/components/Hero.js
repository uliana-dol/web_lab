import React from 'react';
import PrimaryButton from './PrimaryButton';

const Hero = () => (
    <section className="hero">
        <div className="container">
            <div className="hero-content">
                <h2>Discover Great Films</h2>
                <p>Curated selections, beautiful stills, and film details — enjoy the view.</p>
                <div className="cta">
                    <PrimaryButton disabled>Explore Films</PrimaryButton>
                </div>
            </div>
        </div>
    </section>
);

export default Hero;
