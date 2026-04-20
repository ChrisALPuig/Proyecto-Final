import { IonRouterLink } from "@ionic/react";
import { useState, useEffect } from "react";
import { useCart } from "../../contexts/useCart.tsx";
import { useAlert } from "../../contexts/AlertContext.tsx";
import ImagenToggle from "../carrito/fav.tsx";
import CartPopover from "../carrito/CartPopover.tsx";
import { useHistory } from "react-router";
import { fetchGameById, formatImageUrl } from "../../services/gameService.ts";
import './css/doomContainer.css';

import { Game } from "../../services/gameService.ts";

interface GamePageProps {
  gameId: number;
}

const GamePage: React.FC<GamePageProps> = ({ gameId }) => {
  const { addToCart } = useCart();
  const { showErrorAlert, showLoginRequiredAlert } = useAlert();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imagesPerPage, setImagesPerPage] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false); // controla popover
  const history = useHistory(); 

  // Traer datos del juego
  useEffect(() => {
    if (!gameId) {
      setError("Game ID not found");
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    fetchGameById(gameId)
      .then(data => {
        const safeData: Game = {
          ...data,
          id: data.id || gameId,
          images: (data.images || []).map(img => formatImageUrl(img)),
          coverImage: formatImageUrl(data.coverImage),
          genres: data.genres || [],
          tags: data.tags || [],
          features: data.features || [],
        };
        setGame(safeData);
        setLoading(false);

        // Precargar imágenes
        (safeData.images || []).forEach(src => { 
          const img = new Image(); 
          img.src = src; 
        });
      })
      .catch(err => {
        console.error(err);
        setError(err.message || "Failed to load game");
        setLoading(false);
      });
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

  if (loading) return <p>Cargando juego...</p>;
  if (error) return <p style={{ color: 'red', padding: '20px' }}>Error: {error}</p>;
  if (!game) return <p>Juego no encontrado</p>;

  const maxIndex = Math.max(0, (game.images?.length || 0) - imagesPerPage);
  const nextSlide = () => setCurrentIndex(prev => Math.min(prev + imagesPerPage, maxIndex));
  const prevSlide = () => setCurrentIndex(prev => Math.max(prev - imagesPerPage, 0));

  // Añadir al carrito y abrir popover
  const handleAddToCart = async () => {
    try {
      await addToCart({
        id: game.id.toString(),
        name: game.title,
        price: game.price,
        image: game.coverImage || "",
        quantity: 1,
      });
      setIsCartOpen(true); // abre el popover
    } catch (err: any) {
      const errorMessage = err?.message || "No se pudo añadir el juego al carrito.";
      if (errorMessage.includes("iniciar sesión")) {
        showLoginRequiredAlert();
      } else {
        showErrorAlert(errorMessage);
      }
    }
  };

  const handleBuyNow = async () => {
    try {
      await addToCart({
        id: game.id.toString(),
        name: game.title,
        price: game.price,
        image: game.coverImage || "",
        quantity: 1,
      });
      history.push("/carrito-juego"); // redirección automática
    } catch (err: any) {
      console.error("Error adding to cart:", err);
      const errorMessage = err?.message || "No se pudo añadir el juego al carrito.";
      if (errorMessage.includes("iniciar sesión")) {
        showLoginRequiredAlert();
      } else {
        showErrorAlert(errorMessage);
      }
    }
  };

  const trailerUrl = game.heroVideo || game.trailerVideo;
  const heroCoverSrc = game.coverImage || game.images?.[0] || "";
  const isYoutubeVideo = (videoUrl?: string) => !!videoUrl && /(youtube\.com|youtu\.be)/.test(videoUrl);
  const getYoutubeEmbedUrl = (videoUrl: string) => {
    const match = videoUrl.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]+)/);
    return match
      ? `https://www.youtube.com/embed/${match[1]}?rel=0&autoplay=1&mute=1&controls=1&modestbranding=1&showinfo=0&playsinline=1`
      : videoUrl;
  };
  const trailerEmbedUrl = trailerUrl && isYoutubeVideo(trailerUrl) ? getYoutubeEmbedUrl(trailerUrl) : undefined;
  const hasTrailer = Boolean(trailerUrl);

  return (
    <div className="doom-hero">
      {/* HERO COVER IMAGE */}
      {heroCoverSrc && (
        <div className="doom-video-container">
          <img
            className="doom-video"
            src={heroCoverSrc}
            alt={`${game.title} portada`}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      )}

      {/* CARRUSEL DE IMÁGENES Y TRAILER */}
      {(game.images && game.images.length > 0) && (
        <div className="doom-carousel">
          {selectedImage && (
            <div className="image-modal" onClick={() => setSelectedImage(null)}>
              <div className="image-modal-content" onClick={e => e.stopPropagation()}>
                <span className="close-btn" onClick={() => setSelectedImage(null)}>✕</span>
                {selectedImage === "video" && trailerUrl ? (
                  trailerEmbedUrl ? (
                    <iframe
                      title={`${game.title} trailer`}
                      src={trailerEmbedUrl}
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      style={{ maxWidth: "90vw", maxHeight: "90vh", borderRadius: "10px", width: '100%', height: '100%' }}
                    />
                  ) : (
                    <video
                      src={trailerUrl}
                      autoPlay
                      controls
                      loop
                      style={{ maxWidth: "90vw", maxHeight: "90vh", borderRadius: "10px" }}
                    />
                  )
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
                <div key={i} className="carousel-item" onClick={() => setSelectedImage(i === 0 && hasTrailer ? "video" : img)}>
                  <img src={img} alt={`${game.title} screenshot ${i + 1}`} />
                  {i === 0 && hasTrailer && <img src="/assets/images/play-button.png" alt="Play" className="play-overlay" />}
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
        
        {/* Géneros de IGDB */}
        {game.genres && game.genres.length > 0 && (
          <div className="game-genres-container">
            {game.genres.slice(0, 4).map((genre, idx) => (
              <span key={idx} className="genre-badge">{genre}</span>
            ))}
          </div>
        )}
        
        <p className="price">{game.price}€</p>

        <div className="botones">
          <button className="add-to-cart" onClick={handleAddToCart}>Añadir al carrito</button>
          <button className="buy-now" onClick={handleBuyNow}>
            Comprar ahora
          </button>
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
              {(game.genres || []).map((g, i) => <li key={i}><strong>Genre:</strong> {g}</li>)}
              {(game.tags || []).map((t, i) => <li key={i}><strong>Tag:</strong> {t}</li>)}
            </ul>
          </div>

          <div className="doom-features">
            <h2>Game Features</h2>
            <ul>
              {(game.features || []).map((f, i) => <li key={i}>{f}</li>)}
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