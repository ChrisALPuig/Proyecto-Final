import '../doom/css/doomContainer.css';
import { IonRouterLink } from '@ionic/react';
import { useState, useEffect } from 'react';
import { useCart } from '../../../contexts/useCart.ts';
import ImagenToggle from '../../carrito/fav.tsx';

const DoomContainer: React.FC = () => {
  const { addToCart } = useCart();

  const images = [
    "/assets/images/doom-2016.jpg",
    "/assets/images/doom/doom1.jpg",
    "/assets/images/doom/doom2.jpg",
    "/assets/images/doom/doom3.jpg",
    "/assets/images/doom/doom4.jpg",
    "/assets/images/doom/doom5.jpg",
    "/assets/images/doom/doom6.jpg",
    "/assets/images/doom/doom7.jpg"
  ];

  const [imagesPerPage, setImagesPerPage] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setImagesPerPage(1);
      } else if (window.innerWidth <= 1024) {
        setImagesPerPage(2); // Para tablet: mostrar 2 imágenes
      } else {
        setImagesPerPage(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    const maxIndex = Math.floor(images.length / imagesPerPage) * imagesPerPage - imagesPerPage;
    if (currentIndex + imagesPerPage < images.length) {
      setCurrentIndex(currentIndex + imagesPerPage);
    }
  };

  const prevSlide = () => {
    if (currentIndex - imagesPerPage >= 0) {
      setCurrentIndex(currentIndex - imagesPerPage);
    }
  };

  // 🚀 Función que añade el juego al carrito
  const handleAddToCart = () => {
    const item = {
      id: 'doom-2016',
      name: 'DOOM (2016)',
      price: 19.99,
      image: '/assets/images/doom-2016.jpg',
      quantity: 1,
    };
    console.log("Añadiendo al carrito:", item); // Para depuración
    addToCart(item);
  };

  return (
    <div className="doom-hero">

      {/* VIDEO HERO */}
      <div className="doom-video-container">
        <video
          className="doom-video"
          src="/assets/videos/doomfondo.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {/* CARRUSEL ARRIBA DEL TODO */}
      <div className="doom-carousel">

        {selectedImage && (
          <div className="image-modal" onClick={() => setSelectedImage(null)}>
            <div
              className="image-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <span
                className="close-btn"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </span>

              {selectedImage === "video" ? (
                <iframe
                  width="900"
                  height="500"
                  src="https://www.youtube.com/embed/l5XQ4zABINA?autoplay=1"
                  title="Doom Trailer"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  style={{
                    maxWidth: "90vw",
                    maxHeight: "90vh",
                    borderRadius: "10px"
                  }}
                />
              ) : (
                <img src={selectedImage} alt="Imagen ampliada" />
              )}
            </div>
          </div>
        )}

        <button className="carousel-btn left" onClick={prevSlide}>‹</button>

        <div className="carousel-window">
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${currentIndex * (100 / imagesPerPage)}%)`,
            }}
          >
            {images.map((img, index) => (
              <div
                key={index}
                className="carousel-item"
                onClick={() => {
                  if (index === 0) {
                    setSelectedImage("video");
                  } else {
                    setSelectedImage(img);
                  }
                }}
              >
                <img src={img} alt="Doom screenshot" />

                {index === 0 && (
                  <img
                    src="/assets/images/play-button.png"
                    alt="Play"
                    className="play-overlay"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <button className="carousel-btn right" onClick={nextSlide}>›</button>
      </div>

      {/* TITULO */}
      <p className="doom-nombre">DOOM (2016)</p>

      {/* CARD DEBAJO DEL TITULO */}
      <div className="doom-card">
        <h1>DOOM</h1>
        <p className="edition">Edición Deluxe</p>
        <p className="price">19.99€</p>

        <div className="botones">
          <button 
            className="add-to-cart"
            onClick={handleAddToCart}
          >
            Añadir al carrito
          </button>
          <IonRouterLink routerLink="/carrito-juego">
            <button className="buy-now">Comprar ahora</button>
          </IonRouterLink>
        </div>

        <div className="wishlist-section">
          <ImagenToggle 
            itemId="doom-2016"
            itemName="DOOM (2016)"
            itemPrice={19.99}
            itemImage="/assets/images/doom-2016.jpg"
          />
          <span className="wishlist-text">Wishlist</span>
        </div>
      </div>

      {/* CONTENIDO INFERIOR */}
      <div className="doom-info-container">
        {/* Lado izquierdo: Description */}
        <div className="doom-description">
          <h2>Description</h2>
          <p>
            Developed by id software, the studio that pioneered the first-person shooter genre and created multiplayer Deathmatch, DOOM returns as a brutally fun and challenging modern-day shooter experience. Relentless demons, impossibly destructive guns, and fast, fluid movement provide the foundation for intense, first-person combat.
          </p>
          <video className="doom-description-video" src="/assets/videos/doom-description.mp4" autoPlay muted loop playsInline />
          <h2>Story</h2>
          <p>
            You’ve come here for a reason. The Union Aerospace Corporation’s massive research facility on Mars is overwhelmed by fierce and powerful demons, and only one person stands between their world and ours. As the lone DOOM Marine, you’ve been activated to do one thing – kill them all.
          </p>
          <h2>A Relentless Campaign</h2>
          <p>
            There is no taking cover or stopping to regenerate health as you beat back Hell’s raging demon hordes. Combine your arsenal of futuristic and iconic guns, upgrades, movement and an advanced melee system to knock-down, slash, stomp, crush, and blow apart demons in creative and violent ways.  
          </p>
          {/* Nuevo apartado: System Requirements */}
          <div className="doom-system-requirements">
            <h2>System Requirements</h2>

            <div className="system-requirements-columns">
              {/* Requisitos mínimos */}
              <div className="requirements-column">
                <h3>Minimum</h3>
                <ul>
                  <li><strong>OS:</strong> Windows 10</li>
                  <li><strong>Processor:</strong> Intel Core i5-2400 / AMD FX-8320 or better</li>
                  <li><strong>Memory:</strong> 8 GB RAM</li>
                  <li><strong>Graphics:</strong> NVIDIA GTX 670 / AMD Radeon HD 7870</li>
                  <li><strong>DirectX:</strong> Version 11</li>
                  <li><strong>Storage:</strong> 55 GB available space</li>
                </ul>
              </div>

              {/* Requisitos recomendados */}
              <div className="requirements-column">
                <h3>Recommended</h3>
                <ul>
                  <li><strong>OS:</strong> Windows 10 / 11</li>
                  <li><strong>Processor:</strong> Intel Core i7-3770 / AMD FX-8350 or better</li>
                  <li><strong>Memory:</strong> 8 GB RAM</li>
                  <li><strong>Graphics:</strong> NVIDIA GTX 970 / AMD Radeon R9 290</li>
                  <li><strong>DirectX:</strong> Version 11</li>
                  <li><strong>Storage:</strong> 55 GB available space</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Lado derecho: Game Details + Game Features */}
        <div className="doom-right-panel">
          <div className="doom-game-details">
            <h2>Game Details</h2>
            <ul>
              <li><strong>Genre:</strong> Shooter - FPP - Sci-fi</li>
              <li><strong>Tags:</strong> Atmospheric, Sci-fi, Science, First-Person, Great Soundtrack</li>
              <li><strong>Works on:</strong> Windows (10, 11)</li>
              <li><strong>Release date:</strong> May 13, 2016</li>
              <li><strong>Company:</strong> id Software / Bethesda Softworks LLC</li>
              <li><strong>Size:</strong> 63.4 GB</li>
              <li><strong>Rating:</strong> PEGI Rating: 18+ (Bad Language, Violence)</li>
            </ul>
          </div>

          <div className="doom-features">
            <h2>Game Features</h2>
            <ul>
              <li>
                <span className="feature-icon">🏆</span> Achievements
              </li>
              <li>
                <span className="feature-icon">☁️</span> Cloud saves
              </li>
              <li>
                <span className="feature-icon">🎮</span> Controller support
              </li>
              <li>
                <span className="feature-icon">👤</span> Single-player
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoomContainer;