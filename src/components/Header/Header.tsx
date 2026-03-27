import { IonHeader, IonToolbar, IonImg, IonText } from "@ionic/react";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext.tsx";
import CartPopover, { CartItem } from "../carrito/CartPopover.tsx";
import WishlistPopover from "../carrito/WishlistPopover.tsx";
import "./Header.css";

const Header: React.FC = () => {
  const history = useHistory();
  const cartRef = useRef<HTMLDivElement>(null);
  const wishlistRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartPopoverOpen, setCartPopoverOpen] = useState(false);
  const [wishlistPopoverOpen, setWishlistPopoverOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { isAuthenticated, logout } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  // 🔒 Carrito y wishlist protegidos
  const handleCartClick = () => {
    if (!isAuthenticated) {
      history.push("/login", { from: "/cart" });
      return;
    }
    setCartPopoverOpen(true);
  };

  const handleWishlistClick = () => {
    if (!isAuthenticated) {
      history.push("/login", { from: "/wishlist" });
      return;
    }
    setWishlistPopoverOpen(true);
  };

  // Búsqueda sin filtros
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    fetch(
      `http://localhost:8080/api/games/search?query=${encodeURIComponent(
        query
      )}`
    )
      .then((res) => res.json())
      .then((data) => setSearchResults(data))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <IonHeader>
        <IonToolbar className="toolbar">
          <div className="header-container">
            <img src="/logo.png" alt="Logo" className="logo" />
            <h1 onClick={() => history.push("/home")} className="title">
              CG
            </h1>

            {/* Navegación Desktop */}
            <ul className="nav-list">
              <li onClick={() => history.push("/home")}>Store</li>
              <li onClick={handleWishlistClick} style={{ cursor: "pointer" }}>
                Wishlist
              </li>
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

              {/* Usuario */}
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => history.push("/login")}
                    className="btn btn-outline"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => history.push("/register")}
                    className="btn btn-primary"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <div style={{ position: "relative" }}>
                  <User
                    className="icon user-icon"
                    style={{ cursor: "pointer" }}
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  />
                  {userMenuOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "40px",
                        right: 0,
                        background: "white",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                        borderRadius: "6px",
                        zIndex: 1000,
                        width: "150px",
                      }}
                    >
                      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                        <li
                          style={{
                            padding: "10px",
                            cursor: "pointer",
                            borderBottom: "1px solid #eee",
                          }}
                          onClick={() => {
                            history.push("/profile");
                            setUserMenuOpen(false);
                          }}
                        >
                          Mi perfil
                        </li>
                        <li
                          style={{
                            padding: "10px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            logout();
                            history.push("/home");
                            setUserMenuOpen(false);
                          }}
                        >
                          Cerrar sesión
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Botón hamburguesa Mobile */}
            <div className="hamburger" onClick={toggleMenu}>
              {menuOpen ? <X className="icon" /> : <Menu className="icon" />}
            </div>
          </div>
        </IonToolbar>

        {/* Barra de búsqueda */}
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
                  onChange={onSearchChange}
                  autoFocus
                />
                <button className="close-search-btn" onClick={closeSearch}>
                  <X size={20} />
                </button>
              </div>

              <div className="search-results">
                {searchResults.length === 0 && searchQuery && (
                  <p style={{ color: "black", padding: "8px 16px" }}>
                    No se encontraron resultados
                  </p>
                )}
                {searchResults.map((game) => (
                  <div
                    key={game.id}
                    className="search-result-item"
                    onClick={() => {
                      history.push(`/game/${game.id}`);
                      closeSearch();
                    }}
                  >
                    <IonImg
                      src={game.coverImage}
                      className="search-result-img"
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <IonText style={{ color: "black", fontWeight: "600" }}>
                        {game.title}
                      </IonText>
                      <IonText style={{ color: "black", fontSize: "13px" }}>
                        {game.edition ? `Edición: ${game.edition}` : ""}
                        {game.price ? ` - ${game.price.toFixed(2)} €` : ""}
                      </IonText>
                      {game.genres && game.genres.length > 0 && (
                        <IonText style={{ color: "black", fontSize: "12px" }}>
                          Géneros: {game.genres.join(", ")}
                        </IonText>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Menú Mobile */}
        {menuOpen && (
          <div className="mobile-menu">
            <ul>
              <li
                onClick={() => {
                  history.push("/home");
                  setMenuOpen(false);
                }}
              >
                Store
              </li>
              <li
                onClick={() => {
                  handleWishlistClick();
                  setMenuOpen(false);
                }}
              >
                Wishlist
              </li>
              <li
                onClick={() => {
                  history.push("/support");
                  setMenuOpen(false);
                }}
              >
                Support
              </li>
            </ul>
            {!isAuthenticated && (
              <>
                <button
                  className="mobile-btn mobile-btn-outline"
                  onClick={() => {
                    history.push("/login");
                    setMenuOpen(false);
                  }}
                >
                  Sign In
                </button>
                <button
                  className="mobile-btn mobile-btn-primary"
                  onClick={() => {
                    history.push("/register");
                    setMenuOpen(false);
                  }}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </IonHeader>

      <CartPopover
        isOpen={cartPopoverOpen}
        onClose={() => setCartPopoverOpen(false)}
        cartItems={cartItems}
        onQuantityChange={handleQuantityChange}
        onRemoveItem={handleRemoveItem}
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