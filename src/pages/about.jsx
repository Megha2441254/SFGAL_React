// File: src/pages/About.jsx
import React from 'react';

const About = () => {
  return (
    <div className="main-content">
      <div className="container welcome-section">
        <h1>About Our Smart Factory</h1>
        <p>We are pioneers in modern manufacturing, leveraging cutting-edge technology to create efficient, secure, and sustainable solutions. Our commitment to innovation drives us to build smarter systems for a better future.</p>
      </div>

      <div className="about-info">
        <div className="info-cards-row">
          <div className="info-card" data-color="#F0F8FF">
            <h3>Our Mission</h3>
            <p>To revolutionize manufacturing by integrating smart technology, ensuring unmatched security and operational efficiency.</p>
          </div>
          <div className="info-card" data-color="#F5FFFA">
            <h3>Our Vision</h3>
            <p>To be the global leader in smart factory solutions, setting new standards for automation and data-driven management.</p>
          </div>
        </div>
        <div className="info-card" data-color="#FFF0F5">
          <h3>Our History</h3>
          <p>Founded in 2024, Smart Factory has quickly become a trusted name, known for our innovative approach to industrial automation.</p>
        </div>
      </div>
    </div>
  );
};

export default About;