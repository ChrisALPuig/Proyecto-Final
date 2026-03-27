import React, { useEffect, useRef, useState } from 'react';
import './CarrouselForYou.css';

type Game = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const games: Game[] = [
  {
    id: 1,
    title: 'Elden Ring',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420'
  },
  {
    id: 2,
    title: 'Cyberpunk',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f'
  },
  {
    id: 3,
    title: 'Gaming Setup',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6'
  },
  {
    id: 4,
    title: 'Retro Game',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f'
  }
];

const CarouselForYou: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollToIndex = (i: number) => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.offsetWidth;

    container.scrollTo({
      left: i * width,
      behavior: 'smooth',
    });
  };

  const handleNext = () => {
    const nextIndex = (index + 1) % games.length;
    setIndex(nextIndex);
    scrollToIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (index - 1 + games.length) % games.length;
    setIndex(prevIndex);
    scrollToIndex(prevIndex);
  };

  // Auto scroll en loop
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <section className="recommended">
      <h2 className="recommended-title">Recommended For You</h2>

      <div className="carousel-wrapper">
        <button className="nav-button left" onClick={handlePrev}>
          ‹
        </button>

        <div className="carousel-container" ref={containerRef}>
          {games.map((game) => (
            <div key={game.id} className="carousel-slide">
              <img src={game.image} alt={game.title} />
              <div className="slide-info">
                <h3>{game.title}</h3>
                <p>${game.price}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="nav-button right" onClick={handleNext}>
          ›
        </button>
      </div>
    </section>
  );
};

export default CarouselForYou;