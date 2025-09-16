import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    const handleCardHover = (event) => {
      const color = event.currentTarget.dataset.color;
      if (color) {
        document.body.style.backgroundColor = color;
      }
    };

    const handleCardLeave = () => {
      document.body.style.backgroundColor = '';
    };

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', handleCardHover);
      card.addEventListener('mouseleave', handleCardLeave);
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mouseenter', handleCardHover);
        card.removeEventListener('mouseleave', handleCardLeave);
      });
    };
  }, []);

  return (
    <div className="main-content">
      <div className="container welcome-section">
        <h1>Welcome to the Smart Factory Gate Access Logger</h1>
        <p>Your secure solution for managing employee access and monitoring activity logs.</p>
      </div>

      <div className="scrolling-text">
        <p>⚠️ **ANNOUNCEMENT:** The factory will be shutting down from 6:00 PM to 7:00 AM daily for maintenance. Access is restricted during this period. The factory is open from 7:00 AM to 6:00 PM.</p>
      </div>

      <div className="cards-section">
        <div className="cards-row">
          <div className="card" data-color="#F0F8FF">
            <h3>Efficiency</h3>
            <p>Automate access logs and streamline entry/exit points to improve operational efficiency.</p>
          </div>
          <div className="card" data-color="#F5FFFA">
            <h3>Security</h3>
            <p>Enhance factory security with a robust system that tracks every entry and exit.</p>
          </div>
        </div>
        <div className="card" data-color="#FFF0F5">
          <h3>Analytics</h3>
          <p>Gain valuable insights with detailed logs and data on factory access patterns.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;