import { IonHeader, IonToolbar, IonImg, IonText, IonButton } from "@ionic/react";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, User, ChevronRight, ChevronDown } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext.tsx";
import CartPopover from "../carrito/CartPopover.tsx";
import WishlistPopover from "../carrito/WishlistPopover.tsx";
import "./Header.css";

const Header: React.FC = () => {
  const history = useHistory();
  const cartRef = useRef<HTMLDivElement>(null);
  const wishlistRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const storeRef = useRef<HTMLLIElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [cartPopoverOpen, setCartPopoverOpen] = useState(false);
  const [wishlistPopoverOpen, setWishlistPopoverOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const { isAuthenticated, logout } = useAuth();
  
  // Games data by category
  const gamesByCategory = {
    "new-releases": [
      { id: 1, title: "Cyberpunk 2077", image: "/assets/images/doom/cyberpunk.jpg", price: "$29.99", discount: "50%" },
      { id: 2, title: "The Witcher 3", image: "/assets/images/doom/witcher3.jpg", price: "$19.99", discount: "75%" },
      { id: 3, title: "Elden Ring", image: "/assets/images/doom/eldenring.jpg", price: "$39.99", discount: "25%" },
      { id: 4, title: "Baldur's Gate 3", image: "/assets/images/doom/baldurs.jpg", price: "$59.99", discount: "0%" },
      { id: 5, title: "Starfield", image: "/assets/images/doom/starfield.jpg", price: "$69.99", discount: "15%" },
      { id: 6, title: "Indiana Jones", image: "/assets/images/doom/indy.jpg", price: "$49.99", discount: "10%" },
    ],
    "bestsellers": [
      { id: 7, title: "PUBG", image: "/assets/images/doom/pubg.jpg", price: "$0", discount: "Free" },
      { id: 8, title: "Fortnite", image: "/assets/images/doom/fortnite.jpg", price: "$0", discount: "Free" },
      { id: 9, title: "Dota 2", image: "/assets/images/doom/dota2.jpg", price: "$0", discount: "Free" },
      { id: 10, title: "CS:GO", image: "/assets/images/doom/csgo.jpg", price: "$0", discount: "Free" },
      { id: 11, title: "Valorant", image: "/assets/images/doom/valorant.jpg", price: "$0", discount: "Free" },
      { id: 12, title: "League of Legends", image: "/assets/images/doom/lol.jpg", price: "$0", discount: "Free" },
    ],
    "on-sale": [
      { id: 13, title: "Hades", image: "/assets/images/doom/hades.jpg", price: "$24.99", discount: "40%" },
      { id: 14, title: "Hollow Knight", image: "/assets/images/doom/hollow.jpg", price: "$14.99", discount: "60%" },
      { id: 15, title: "Celeste", image: "/assets/images/doom/celeste.jpg", price: "$19.99", discount: "50%" },
      { id: 16, title: "Dead Cells", image: "/assets/images/doom/deadcells.jpg", price: "$24.99", discount: "45%" },
      { id: 17, title: "Spiritfarer", image: "/assets/images/doom/spiritfarer.jpg", price: "$18.99", discount: "55%" },
      { id: 18, title: "Gris", image: "/assets/images/doom/gris.jpg", price: "$12.99", discount: "65%" },
    ],
    "rpg": [
      { id: 19, title: "Final Fantasy XVI", image: "/assets/images/doom/ff16.jpg", price: "$59.99", discount: "20%" },
      { id: 20, title: "Dragon Age Veilguard", image: "/assets/images/doom/dragonage.jpg", price: "$49.99", discount: "25%" },
      { id: 21, title: "Persona 5", image: "/assets/images/doom/persona5.jpg", price: "$39.99", discount: "30%" },
      { id: 22, title: "Fire Emblem", image: "/assets/images/doom/fireemblem.jpg", price: "$39.99", discount: "15%" },
      { id: 23, title: "Tales of Arise", image: "/assets/images/doom/tales.jpg", price: "$29.99", discount: "40%" },
      { id: 24, title: "Chrono Trigger", image: "/assets/images/doom/chrono.jpg", price: "$14.99", discount: "50%" },
    ],
    "action": [
      { id: 25, title: "God of War", image: "/assets/images/doom/godofwar.jpg", price: "$49.99", discount: "35%" },
      { id: 26, title: "Devil May Cry 5", image: "/assets/images/doom/dmc5.jpg", price: "$39.99", discount: "40%" },
      { id: 27, title: "Metal Gear Solid", image: "/assets/images/doom/mgs.jpg", price: "$29.99", discount: "45%" },
      { id: 28, title: "Sekiro Shadows", image: "/assets/images/doom/sekiro.jpg", price: "$59.99", discount: "20%" },
      { id: 29, title: "Monster Hunter", image: "/assets/images/doom/mh.jpg", price: "$49.99", discount: "30%" },
      { id: 30, title: "Tekken 8", image: "/assets/images/doom/tekken.jpg", price: "$59.99", discount: "15%" },
    ],
    "adventure": [
      { id: 31, title: "Uncharted 4", image: "/assets/images/doom/uncharted.jpg", price: "$39.99", discount: "40%" },
      { id: 32, title: "The Last of Us", image: "/assets/images/doom/tlou.jpg", price: "$39.99", discount: "35%" },
      { id: 33, title: "Tomb Raider", image: "/assets/images/doom/tombraider.jpg", price: "$29.99", discount: "45%" },
      { id: 34, title: "Horizon Zero", image: "/assets/images/doom/horizon.jpg", price: "$49.99", discount: "30%" },
      { id: 35, title: "Assassins Creed", image: "/assets/images/doom/ac.jpg", price: "$39.99", discount: "50%" },
      { id: 36, title: "Far Cry 6", image: "/assets/images/doom/farcry.jpg", price: "$34.99", discount: "55%" },
    ],
    "strategy": [
      { id: 37, title: "Civilization VI", image: "/assets/images/doom/civ6.jpg", price: "$39.99", discount: "40%" },
      { id: 38, title: "Total War Three", image: "/assets/images/doom/tw3k.jpg", price: "$49.99", discount: "30%" },
      { id: 39, title: "Crusader Kings", image: "/assets/images/doom/ck3.jpg", price: "$34.99", discount: "35%" },
      { id: 40, title: "StarCraft II", image: "/assets/images/doom/sc2.jpg", price: "$0", discount: "Free" },
      { id: 41, title: "Age of Empires", image: "/assets/images/doom/aoe4.jpg", price: "$39.99", discount: "45%" },
      { id: 42, title: "Warcraft III", image: "/assets/images/doom/w3.jpg", price: "$29.99", discount: "50%" },
    ],
    "open-world": [
      { id: 43, title: "GTA V", image: "/assets/images/doom/gta5.jpg", price: "$29.99", discount: "50%" },
      { id: 44, title: "Skyrim", image: "/assets/images/doom/skyrim.jpg", price: "$39.99", discount: "45%" },
      { id: 45, title: "Witcher 3 Wild", image: "/assets/images/doom/w3wild.jpg", price: "$29.99", discount: "55%" },
      { id: 46, title: "Fallout 4", image: "/assets/images/doom/fo4.jpg", price: "$24.99", discount: "60%" },
      { id: 47, title: "Outward", image: "/assets/images/doom/outward.jpg", price: "$19.99", discount: "65%" },
      { id: 48, title: "Kingdom Come", image: "/assets/images/doom/kcd.jpg", price: "$34.99", discount: "50%" },
    ],
    "indie": [
      { id: 49, title: "Stardew Valley", image: "/assets/images/doom/stardew.jpg", price: "$14.99", discount: "50%" },
      { id: 50, title: "Hollow Knight", image: "/assets/images/doom/hollow.jpg", price: "$14.99", discount: "60%" },
      { id: 51, title: "Among Us", image: "/assets/images/doom/amongus.jpg", price: "$4.99", discount: "80%" },
      { id: 52, title: "Undertale", image: "/assets/images/doom/undertale.jpg", price: "$9.99", discount: "70%" },
      { id: 53, title: "Terraria", image: "/assets/images/doom/terraria.jpg", price: "$24.99", discount: "55%" },
      { id: 54, title: "Binding Isaac", image: "/assets/images/doom/isaac.jpg", price: "$14.99", discount: "65%" },
    ],
    "shooters": [
      { id: 55, title: "Call of Duty", image: "/assets/images/doom/cod.jpg", price: "$59.99", discount: "25%" },
      { id: 56, title: "Battlefield 2042", image: "/assets/images/doom/bf2042.jpg", price: "$29.99", discount: "50%" },
      { id: 57, title: "Overwatch 2", image: "/assets/images/doom/ow2.jpg", price: "$0", discount: "Free" },
      { id: 58, title: "Halo Infinite", image: "/assets/images/doom/halo.jpg", price: "$0", discount: "Free" },
      { id: 59, title: "Destiny 2", image: "/assets/images/doom/destiny2.jpg", price: "$0", discount: "Free" },
      { id: 60, title: "Apex Legends", image: "/assets/images/doom/apex.jpg", price: "$0", discount: "Free" },
    ],
    "platformers": [
      { id: 61, title: "Super Mario", image: "/assets/images/doom/mario.jpg", price: "$59.99", discount: "20%" },
      { id: 62, title: "Sonic Frontiers", image: "/assets/images/doom/sonic.jpg", price: "$39.99", discount: "40%" },
      { id: 63, title: "Donkey Kong", image: "/assets/images/doom/dk.jpg", price: "$49.99", discount: "30%" },
      { id: 64, title: "Mega Man 11", image: "/assets/images/doom/mm11.jpg", price: "$29.99", discount: "50%" },
      { id: 65, title: "Ori Blind", image: "/assets/images/doom/ori.jpg", price: "$24.99", discount: "55%" },
      { id: 66, title: "Castlevania", image: "/assets/images/doom/castlevania.jpg", price: "$19.99", discount: "60%" },
    ],
    "city-builders": [
      { id: 67, title: "Cities Skylines", image: "/assets/images/doom/cs.jpg", price: "$34.99", discount: "45%" },
      { id: 68, title: "SimCity", image: "/assets/images/doom/simcity.jpg", price: "$39.99", discount: "40%" },
      { id: 69, title: "Planet Coaster", image: "/assets/images/doom/pc.jpg", price: "$44.99", discount: "35%" },
      { id: 70, title: "Tropico 6", image: "/assets/images/doom/tropico.jpg", price: "$34.99", discount: "50%" },
      { id: 71, title: "Two Point Hospital", image: "/assets/images/doom/tph.jpg", price: "$29.99", discount: "55%" },
      { id: 72, title: "Banished", image: "/assets/images/doom/banished.jpg", price: "$19.99", discount: "65%" },
    ],
  };
  
  const gameCategories = [
    { 
      id: "new-releases", 
      label: "New releases", 
      submenu: ["This week", "Last 30 days", "Coming soon", "Pre-orders", "Free to play", "Early access"]
    },
    { 
      id: "bestsellers", 
      label: "Bestsellers", 
      submenu: ["Top sellers", "Most played", "Top rated", "Trending now", "Award winners", "Staff picks"]
    },
    { 
      id: "on-sale", 
      label: "On sale now", 
      submenu: ["Up to 50% off", "Up to 75% off", "Flash deals", "Weekly specials", "Seasonal sales", "Bundle deals"]
    },
    { 
      id: "rpg", 
      label: "RPG", 
      submenu: ["Action RPG", "JRPG", "Western RPG", "MMORPG", "CRPG", "Roguelike"]
    },
    { 
      id: "action", 
      label: "Action", 
      submenu: ["FPS", "TPS", "Battle Royale", "Fighting", "Hack and Slash", "Platformer"]
    },
    { 
      id: "adventure", 
      label: "Adventure", 
      submenu: ["Point & Click", "Visual Novel", "Interactive Fiction", "Exploration", "Puzzle Adventure", "Survival"]
    },
    { 
      id: "strategy", 
      label: "Strategy", 
      submenu: ["Turn-based", "Real-time", "4X", "Tower Defense", "RTS", "Grand Strategy"]
    },
    { 
      id: "open-world", 
      label: "Open world", 
      submenu: ["Sandbox", "Exploration", "Survival", "RPG Open World", "Action Open World", "Simulation"]
    },
    { 
      id: "indie", 
      label: "Indie", 
      submenu: ["Indie Gems", "Retro", "Pixel Art", "Experimental", "Narrative", "Puzzle Indie"]
    },
    { 
      id: "shooters", 
      label: "Shooters", 
      submenu: ["FPS", "TPS", "Arena Shooter", "Bullet Hell", "Rail Shooter", "Top-Down Shooter"]
    },
    { 
      id: "platformers", 
      label: "Platformers", 
      submenu: ["2D Platformer", "3D Platformer", "Precision Platformer", "Metroidvania", "Run and Gun", "Puzzle Platformer"]
    },
    { 
      id: "city-builders", 
      label: "City builders", 
      submenu: ["City Building", "Empire Building", "Management", "Simulation", "Strategy City", "God Games"]
    },
  ];

  const filters = [
    { id: "all", label: "Todos" },
    { id: "games", label: "Juegos" },
    { id: "sales", label: "Ofertas" },
    { id: "news", label: "Noticias" },
  ];

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
    setSelectedFilter("all");
  };

  // Cart handlers
  const handleCartClick = () => {
    setCartPopoverOpen(true);
  };

  const handleWishlistClick = () => {
    setWishlistPopoverOpen(true);
  };

  // Manejo del hover en Store
  const handleStoreMouseEnter = () => {
    setSidebarOpen(true);
  };

  const handleStoreMouseLeave = () => {
    // Pequeño delay para que no parpadee y permita mover el mouse al dropdown
    setTimeout(() => {
      if (!storeRef.current?.matches(":hover") && !sidebarRef.current?.matches(":hover")) {
        setSidebarOpen(false);
      }
    }, 150);
  };

  const handleDropdownMouseEnter = () => {
    setSidebarOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    setTimeout(() => {
      if (!storeRef.current?.matches(":hover") && !sidebarRef.current?.matches(":hover")) {
        setSidebarOpen(false);
      }
    }, 150);
  };



  return (
    <>
      <IonHeader>
        {/* Toolbar principal */}
        <IonToolbar className="toolbar">
          <div className="header-container">

            {/* Logo */}
            <img src="/logo.png" alt="Logo" className="logo" />

            {/* Título */}
            <h1 onClick={() => history.push("/home")} className="title">
              CG
            </h1>

            {/* Navegación Desktop */}
            <ul className="nav-list">
              <li 
                ref={storeRef}
                onMouseEnter={handleStoreMouseEnter}
                onMouseLeave={handleStoreMouseLeave}
                onClick={() => history.push("/games")}
                className="store-menu-item"
                style={{ cursor: "pointer" }}
              >
                Store
                <ChevronDown size={16} className="dropdown-arrow" />
              </li>
              <li onClick={handleWishlistClick} style={{ cursor: "pointer" }}>Wishlist</li>
              <li onClick={() => history.push("/support")}>Support</li>
            </ul>

            {/* Acciones Desktop */}
            <div className="actions">
              <Search 
                className="icon" 
                onClick={() => setSearchOpen(!searchOpen)}
                style={{ cursor: "pointer" }}
              />
              <div className="cart-container" ref={cartRef}>
                <ShoppingCart 
                  onClick={handleCartClick} 
                  className="icon"
                  style={{ cursor: "pointer" }}
                />
              </div>
              {/* auth buttons or user icon */}
              {!isAuthenticated ? (
                <>
                  <button onClick={() => history.push("/login")} className="btn btn-outline">
                    Sign In
                  </button>
                  <button onClick={() => history.push("/register")} className="btn btn-primary">
                    Sign Up
                  </button>
                </>
              ) : (
                <User
                  className="icon user-icon"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    logout();
                    history.push("/home");
                  }}
                />
              )}
            </div>

          </div>
        </IonToolbar>

        {/* Barra de búsqueda expandida */}
        {searchOpen && (
          <div className="search-bar-expanded">
            <div className="search-content">
              <div className="search-input-wrapper">
                <Search className="search-input-icon" />
                <input
                  type="text"
                  placeholder="Busca juegos, ofertas..."
                  className="search-input-field"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button 
                  className="close-search-btn"
                  onClick={closeSearch}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Filtros */}
              <div className="filters-wrapper">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    className={`filter-btn ${selectedFilter === filter.id ? "active" : ""}`}
                    onClick={() => setSelectedFilter(filter.id)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </IonHeader>

      {/* Dropdown Menu */}
      {sidebarOpen && (
        <div 
          ref={sidebarRef}
          className="store-dropdown-wrapper"
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        >
          <div 
            className="store-dropdown"
          >
            <div className="dropdown-content">
              {gameCategories.map((category, index) => (
                <div key={category.id}>
                  <div 
                    className="dropdown-category"
                    onMouseEnter={() => setHoveredCategory(category.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <div className="category-main">
                      <span className="category-label">{category.label}</span>
                      <ChevronRight size={16} className="category-chevron" />
                    </div>
                  </div>
                  {(index === 2 || index === 11) && <div className="dropdown-divider group-divider" />}
                </div>
              ))}
              
              {/* Browse all games */}
              <div className="dropdown-footer">
                <button className="browse-all-btn">
                  Browse all games →
                </button>
              </div>
            </div>
          </div>
          
          {/* Games Grid Panel */}
          {hoveredCategory && gamesByCategory[hoveredCategory as keyof typeof gamesByCategory] && (
            <div 
              className="games-panel"
              onMouseEnter={() => setHoveredCategory(hoveredCategory)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="games-grid">
                {gamesByCategory[hoveredCategory as keyof typeof gamesByCategory].map((game) => (
                  <div key={game.id} className="game-card">
                    <img src={game.image} alt={game.title} className="game-image" />
                    <div className="game-info">
                      <h4 className="game-title">{game.title}</h4>
                      <div className="game-price">
                        {game.discount && game.discount !== "Free" && <span className="discount">{game.discount}</span>}
                        <span className="price">{game.price === "$0" ? "Free" : game.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <CartPopover
        isOpen={cartPopoverOpen}
        onClose={() => setCartPopoverOpen(false)}
        triggerElement={cartRef}
      />
      <WishlistPopover
        isOpen={wishlistPopoverOpen}
        onClose={() => setWishlistPopoverOpen(false)}
        triggerElement={wishlistRef}
      />
    </>
  );
};

export default Header;