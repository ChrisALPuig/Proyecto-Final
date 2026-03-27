import React, { useState } from 'react';
import './CarrouselWishlist.css';

type Game = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const games: Game[] = [
  { id: 1, title: 'The Witcher 3', price: 9.99, image: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81' },
  { id: 2, title: 'Red Dead Redemption 2', price: 39.99, image: 'https://images.unsplash.com/photo-1601933470096-0e34634ffcde' },
  { id: 3, title: 'Elden Ring', price: 59.99, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420' },
  { id: 4, title: 'Cyberpunk 2077', price: 49.99, image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f' },
  { id: 5, title: 'Hogwarts Legacy', price: 59.99, image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf' },
  { id: 6, title: 'Hades', price: 24.99, image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f' },
  { id: 7, title: 'Dark Souls III', price: 29.99, image: 'https://images.unsplash.com/photo-1580327344181-c116d6b5a3b2' },
  { id: 8, title: 'Starfield', price: 69.99, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45' },
  { id: 9, title: 'Minecraft', price: 26.95, image: 'https://images.unsplash.com/photo-1587574293340-ec12f2b5a6c7' }
];

const ITEMS_PER_PAGE = 3;

const CarrouselWishlist: React.FC = () => {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(games.length / ITEMS_PER_PAGE);

  const handleNext = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const start = page * ITEMS_PER_PAGE;
  const visibleGames = games.slice(start, start + ITEMS_PER_PAGE);

  return (
    <section className="wishlist-grid-section">

      {/* HEADER */}
      <div className="wishlist-header">
        <h2 className="wishlist-title">Top Wishlisted (30 days)</h2>

        <div className="wishlist-controls">
          <button onClick={handlePrev} className="nav-btn">‹</button>
          <span className="page-indicator">
            {page + 1} / {totalPages}
          </span>
          <button onClick={handleNext} className="nav-btn">›</button>
        </div>
      </div>

      {/* GRID */}
      <div className="wishlist-grid">
        {visibleGames.map((game, index) => {
          const globalIndex = start + index;

          return (
            <div
              key={game.id}
              className={`wishlist-card ${globalIndex === 0 ? 'top-one' : ''}`}
            >
              <div className="rank">#{globalIndex + 1}</div>

              <div className="img-container">
                <img src={game.image} alt={game.title} />
              </div>

              <div className="card-info">
                <h3>{game.title}</h3>
                <p>${game.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CarrouselWishlist;