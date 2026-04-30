import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchIgdbGames, Game, formatImageUrl } from "../../services/gameService";
import "./storeComponent.css";

const ITEMS_PER_PAGE = 18;

const categoryFilters = [
  { name: "Classic", genre: "Adventure", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg" },
  { name: "Strategy", genre: "Strategy", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/289070/header.jpg" },
  { name: "Adventure", genre: "Adventure", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg" },
  { name: "Indie", genre: "Indie", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg" },
  { name: "Role-playing", genre: "RPG", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/489830/header.jpg" },
];

const genres = ["Action", "Adventure", "Racing", "RPG", "Shooter", "Simulation", "Sports", "Strategy"];
const languages = ["English", "Español", "Français", "Deutsch", "Italiano", "Português"];

const StoreComponent: React.FC = () => {
  const history = useHistory();
  const [apiGames, setApiGames] = useState<Game[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [onlyFree, setOnlyFree] = useState(false);
  const [includeDLCs, setIncludeDLCs] = useState(false);
  const [hideDLCs, setHideDLCs] = useState(false);
  const [hideOwnedProducts, setHideOwnedProducts] = useState(false);
  const [onlyWishlist, setOnlyWishlist] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedReleaseStatus, setSelectedReleaseStatus] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 231]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const displayedGames = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return games.slice(start, start + ITEMS_PER_PAGE);
  }, [games, page]);

  const totalPages = Math.max(1, Math.ceil(games.length / ITEMS_PER_PAGE));

  const loadGames = async () => {
    setLoading(true);
    try {
      const apiResults = await fetchIgdbGames(searchQuery, 20);
      setApiGames(apiResults);
    } catch (error) {
      console.error("Error loading games:", error);
      setApiGames([]);
      setGames([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filteredGames = apiGames;

    if (selectedGenres.length > 0) {
      filteredGames = filteredGames.filter((game) =>
        game.genres?.some((genre) => selectedGenres.includes(genre))
      );
    }

    if (onlyFree) {
      filteredGames = filteredGames.filter((game) => game.price === 0);
    }

    if (onlyDiscounted) {
      filteredGames = filteredGames.filter((game) => game.price !== undefined && game.price < 20);
    }

    filteredGames = filteredGames.filter((game) => {
      const price = game.price;
      if (price === undefined || price === null) {
        return true;
      }
      return price >= priceRange[0] && price <= priceRange[1];
    });

    setGames(filteredGames);
    setPage(1);
  };

  useEffect(() => {
    loadGames();
  }, [searchQuery]);

  useEffect(() => {
    applyFilters();
  }, [apiGames, onlyDiscounted, onlyFree, includeDLCs, hideDLCs, selectedGenres, selectedReleaseStatus, selectedLanguages, priceRange]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((item) => item !== genre) : [...prev, genre]
    );
  };

  const formatGameImageUrl = (game: Game) => {
    const image = game.coverImage || game.images?.[0] || "";
    return formatImageUrl(image);
  };

  const getGameDescription = (game: Game) => {
    // Use description from IGDB or fallback to story
    if (game.description) {
      return game.description.substring(0, 100) + (game.description.length > 100 ? "..." : "");
    }
    if (game.story) {
      return game.story.substring(0, 100) + (game.story.length > 100 ? "..." : "");
    }
    return "A thrilling adventure packed with action and nostalgia.";
  };

  const getGenresDisplay = (game: Game) => {
    if (!game.genres || game.genres.length === 0) return "";
    return game.genres.slice(0, 2).join(", ");
  };

  const formatImageUrlService = (image?: string) => {
    return formatImageUrl(image);
  };

  const handleGameClick = (gameId: number) => {
    history.push(`/game/${gameId}`);
  };

  return (
    <div className="store-content">
      <section className="store-categories-grid">
        {categoryFilters.map((cat) => (
          <div
            key={cat.name}
            className="category-card"
            onClick={() => toggleGenre(cat.genre)}
          >
            <img className="category-image" src={cat.image} alt={`${cat.name} category`} />
            <div className="category-overlay" />
            <span>{cat.name}</span>
          </div>
        ))}
      </section>

      <section className="store-header-bar">
        <div className="store-header-left">
          <div className="store-page-title">PC games / All Games</div>
          <div className="store-page-subtitle">{games.length.toLocaleString()} games in total</div>
        </div>
        <div className="store-header-right">
          <div className="store-search-top">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for games"
              className="store-top-search-input"
            />
          </div>
          <div className="store-sort-row">
            <span className="sort-label">Sort by:</span>
            <button type="button" className="sort-button">Bestselling (recently)</button>
            <div className="view-toggle">
              <button
                type="button"
                className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                ▦
              </button>
              <button
                type="button"
                className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="store-main">
        <aside className="store-sidebar">
          <div className="sidebar-section">
            <h4>SEARCH</h4>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games..."
              className="store-search-input"
            />
          </div>

          <div className="sidebar-section sidebar-intro">
            <div className="sidebar-chip">GOOD OLD GAMES</div>
            <div className="sidebar-filters-group">
              <label className="sidebar-option">
                <input
                  type="checkbox"
                  checked={onlyDiscounted}
                  onChange={() => setOnlyDiscounted((prev) => !prev)}
                />
                <span>Show only discounted</span>
              </label>
              <label className="sidebar-option">
                <input
                  type="checkbox"
                  checked={hideOwnedProducts}
                  onChange={() => setHideOwnedProducts((prev) => !prev)}
                />
                <span>Hide all owned products</span>
              </label>
              <label className="sidebar-option">
                <input
                  type="checkbox"
                  checked={onlyWishlist}
                  onChange={() => setOnlyWishlist((prev) => !prev)}
                />
                <span>Show only games on my wishlist</span>
              </label>
            </div>
          </div>

          <div className="sidebar-section sidebar-group">
            <h4>DLCs</h4>
            <label className="sidebar-option">
              <input
                type="checkbox"
                checked={includeDLCs}
                onChange={() => setIncludeDLCs((prev) => !prev)}
              />
              <span>DLCs</span>
            </label>
            <label className="sidebar-option">
              <input
                type="checkbox"
                checked={hideDLCs}
                onChange={() => setHideDLCs((prev) => !prev)}
              />
              <span>Hide DLCs and extras</span>
            </label>
            <label className="sidebar-option">
              <input
                type="checkbox"
                checked={onlyFree}
                onChange={() => setOnlyFree((prev) => !prev)}
              />
              <span>Show only free games</span>
            </label>
          </div>

          <div className="sidebar-section sidebar-group">
            <h4>Price range</h4>
            <div className="price-range-row">
              <span>{priceRange[0].toFixed(2)}€</span>
              <span>{priceRange[1].toFixed(2)}€</span>
            </div>
            <input
              className="price-range-slider"
              type="range"
              min={0}
              max={250}
              step={1}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            />
          </div>

          <div className="sidebar-section sidebar-group">
            <h4>Release Status</h4>
            {[
              { label: "New arrivals", value: "new-arrivals" },
              { label: "Upcoming", value: "upcoming" },
              { label: "Early access", value: "early-access" },
            ].map((item) => (
              <label key={item.value} className="sidebar-option">
                <input
                  type="checkbox"
                  checked={selectedReleaseStatus.includes(item.value)}
                  onChange={() =>
                    setSelectedReleaseStatus((prev) =>
                      prev.includes(item.value)
                        ? prev.filter((status) => status !== item.value)
                        : [...prev, item.value]
                    )
                  }
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>

          <div className="sidebar-section sidebar-group">
            <h4>Genres</h4>
            {genres.map((genre) => (
              <label key={genre} className="sidebar-option">
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre)}
                  onChange={() => toggleGenre(genre)}
                />
                <span>{genre}</span>
              </label>
            ))}
          </div>

          <div className="sidebar-section sidebar-group">
            <h4>Languages</h4>
            {languages.map((language) => (
              <label key={language} className="sidebar-option">
                <input
                  type="checkbox"
                  checked={selectedLanguages.includes(language)}
                  onChange={() =>
                    setSelectedLanguages((prev) =>
                      prev.includes(language)
                        ? prev.filter((item) => item !== language)
                        : [...prev, language]
                    )
                  }
                />
                <span>{language}</span>
              </label>
            ))}
          </div>
        </aside>

        <div className={`store-grid ${viewMode === 'list' ? 'list-mode' : ''}`}>
          {loading ? (
            <div className="loading-message">Loading games from backend...</div>
          ) : displayedGames.length > 0 ? (
            displayedGames.map((game) => (
              <div key={game.id} className="game-card" onClick={() => handleGameClick(game.id)}>
                <div className="game-card-image-container">
                  <img className="game-card-image" src={formatGameImageUrl(game)} alt={game.title} />
                  <div className="game-card-top-chip">PC</div>
                  {game.trailerVideo && (
                    <div className="game-card-trailer-badge">
                      🎬 Trailer
                    </div>
                  )}
                  <div className="game-card-overlay" />
                </div>
                <div className="game-card-details">
                  <div className="game-title">{game.title}</div>
                  {game.genres && game.genres.length > 0 && (
                    <div className="game-genres">
                      {game.genres.slice(0, 2).map((genre, idx) => (
                        <span key={idx} className="genre-tag">{genre}</span>
                      ))}
                    </div>
                  )}
                  <div className="game-description">{getGameDescription(game)}</div>
                  <div className="game-card-footer">
                    <span className="game-price">
                      {game.price === undefined || game.price === null
                        ? 'TBD'
                        : game.price === 0
                        ? 'FREE'
                        : `${game.price.toFixed(2)}€`}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              No games found. Try another search or remove filters.
            </div>
          )}
        </div>
      </section>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>{page} / {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default StoreComponent;
