import { IonRouterLink } from "@ionic/react";
import { useState, useEffect } from "react";
import { useCart } from "../../contexts/useCart.tsx";
import ImagenToggle from "../carrito/fav.tsx";
import CartPopover from "../carrito/CartPopover.tsx";
import './css/doomContainer.css';

interface Game {
  id: number;
  title: string;
  edition: string;
  price: number;
  coverImage: string;
  trailerVideo?: string;
  heroVideo?: string;
  descriptionVideo?: string;
  images: string[];
  description: string;
  story: string;
  systemRequirementsMin: string;
  systemRequirementsRecommended: string;
  genres: string[];
  tags: string[];
  features: string[];
}

interface GamePageProps {
  gameId: number;
}

const GamePage: React.FC<GamePageProps> = ({ gameId }) => {
  const { addToCart } = useCart();
  const [game, setGame] = useState<Game | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imagesPerPage, setImagesPerPage] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false); // controla popover

  // Traer datos del juego
  useEffect(() => {
    if (!gameId) return;
    fetch(`http://localhost:8080/api/games/${gameId}`)
      .then(res => res.json())
      .then(data => {
        const safeData: Game = {
          ...data,
          images: data.images || [],
          genres: data.genres || [],
          tags: data.tags || [],
          features: data.features || [],
        };
        setGame(safeData);

        // Precargar imágenes
        safeData.images.forEach(src => { const img = new Image(); img.src = src; });
      })
      .catch(err => console.error(err));
  }, [gameId]);

  // Control de cantidad de imágenes por tamaño
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) setImagesPerPage(1);
      else if (window.innerWidth <= 1024) setImagesPerPage(2);
      else setImagesPerPage(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!game) return <p>Cargando...</p>;

  const maxIndex = Math.max(0, game.images.length - imagesPerPage);
  const nextSlide = () => setCurrentIndex(prev => Math.min(prev + imagesPerPage, maxIndex));
  const prevSlide = () => setCurrentIndex(prev => Math.max(prev - imagesPerPage, 0));

  // Añadir al carrito y abrir popover
  const handleAddToCart = () => {
    addToCart({
      id: game.id.toString(),
      name: game.title,
      price: game.price,
      image: game.coverImage,
      quantity: 1,
    });
    setIsCartOpen(true); // abre el popover
  };

  return (
    <div className="doom-hero">
      {/* HERO VIDEO */}
      {game.heroVideo && (
        <div className="doom-video-container">
          <video className="doom-video" src={game.heroVideo} autoPlay muted loop playsInline />
        </div>
      )}

      {/* CARRUSEL DE IMÁGENES Y TRAILER */}
      {game.images.length > 0 && (
        <div className="doom-carousel">
          {selectedImage && (
            <div className="image-modal" onClick={() => setSelectedImage(null)}>
              <div className="image-modal-content" onClick={e => e.stopPropagation()}>
                <span className="close-btn" onClick={() => setSelectedImage(null)}>✕</span>
                {selectedImage === "video" && game.trailerVideo ? (
                  <video
                    src={game.trailerVideo}
                    autoPlay
                    controls
                    loop
                    style={{ maxWidth: "90vw", maxHeight: "90vh", borderRadius: "10px" }}
                  />
                ) : (
                  <img src={selectedImage} alt={`${game.title}`} />
                )}
              </div>
            </div>
          )}

          <button className="carousel-btn left" onClick={prevSlide} disabled={currentIndex === 0} style={{ opacity: currentIndex === 0 ? 0.3 : 1 }}>‹</button>

          <div className="carousel-window">
            <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * (100 / imagesPerPage)}%)`, transition: "transform 0.5s ease" }}>
              {game.images.map((img, i) => (
                <div key={i} className="carousel-item" onClick={() => setSelectedImage(i === 0 && game.trailerVideo ? "video" : img)}>
                  <img src={img} alt={`${game.title} screenshot ${i + 1}`} />
                  {i === 0 && game.trailerVideo && <img src="/assets/images/play-button.png" alt="Play" className="play-overlay" />}
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-btn right" onClick={nextSlide} disabled={currentIndex >= maxIndex} style={{ opacity: currentIndex >= maxIndex ? 0.3 : 1 }}>›</button>
        </div>
      )}

      {/* CARD DEL JUEGO */}
      <div className="doom-card">
        <h1>{game.title}</h1>
        <p className="edition">{game.edition}</p>
        <p className="price">{game.price}€</p>

        <div className="botones">
          <button className="add-to-cart" onClick={handleAddToCart}>Añadir al carrito</button>
          <IonRouterLink routerLink="/carrito-juego">
            <button className="buy-now">Comprar ahora</button>
          </IonRouterLink>
        </div>

        <div className="wishlist-section">
          <ImagenToggle itemId={game.id.toString()} itemName={game.title} itemPrice={game.price} itemImage={game.coverImage} />
          <span className="wishlist-text">Wishlist</span>
        </div>
      </div>

      {/* INFORMACIÓN DEL JUEGO */}
      <div className="doom-info-container">
        <div className="doom-description">
          <h2>Description</h2>
          <p>{game.description}</p>

          {game.descriptionVideo && (
            <video
              className="doom-description-video"
              src={game.descriptionVideo}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', borderRadius: '10px', margin: '20px 0' }}
            />
          )}

          <h2>Story</h2>
          <p>{game.story}</p>

          <h2>System Requirements</h2>
          <p><strong>Minimum:</strong> {game.systemRequirementsMin}</p>
          <p><strong>Recommended:</strong> {game.systemRequirementsRecommended}</p>
        </div>

        <div className="doom-right-panel">
          <div className="doom-game-details">
            <h2>Game Details</h2>
            <ul>
              {game.genres.map((g, i) => <li key={i}><strong>Genre:</strong> {g}</li>)}
              {game.tags.map((t, i) => <li key={i}><strong>Tag:</strong> {t}</li>)}
            </ul>
          </div>

          <div className="doom-features">
            <h2>Game Features</h2>
            <ul>
              {game.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* POPOVER DEL CARRITO */}
      <CartPopover
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
};

export default GamePage;