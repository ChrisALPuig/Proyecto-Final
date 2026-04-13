import { IonHeader, IonToolbar, IonImg, IonText } from "@ionic/react";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useHistory } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, User, Bell, BellRing } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext.tsx";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import { useNotification } from "../../contexts/NotificationContext.tsx";
import { getUserProfile } from "../../services/userService.ts";

type MenuCoords = { top: number; left: number; };
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
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [notificationCoords, setNotificationCoords] = useState<MenuCoords>({ top: 0, left: 0 });
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [menuCoords, setMenuCoords] = useState<MenuCoords>({ top: 0, left: 0 });
  const userIconRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const notificationMenuRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const { isAuthenticated, logout, avatar, token, setAvatar } = useAuth();
  const { t } = useLanguage();
  const { notifications, unreadCount, markAllRead, markAsRead } = useNotification();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadAvatar = async () => {
      if (!token || avatar) return;
      try {
        const profile = await getUserProfile(token);
        if (profile.avatar) {
          setAvatar(profile.avatar);
        }
      } catch (error) {
        console.error("Unable to load user avatar:", error);
      }
    };

    if (isAuthenticated) {
      loadAvatar();
    }
  }, [isAuthenticated, token, avatar, setAvatar]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const openUserMenu = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    const rect = userIconRef.current?.getBoundingClientRect();
    if (rect) {
      setMenuCoords({ top: rect.bottom + 8, left: rect.left });
    }
    setUserMenuOpen(true);
  };

  const toggleUserMenu = () => {
    if (userMenuOpen) {
      setUserMenuOpen(false);
      return;
    }
    openUserMenu();
  };

  const closeUserMenu = () => {
    if (closeTimeoutRef.current) {
      window.clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = window.setTimeout(() => {
      setUserMenuOpen(false);
      closeTimeoutRef.current = null;
    }, 180);
  };

  const openNotificationMenu = () => {
    const rect = notificationRef.current?.getBoundingClientRect();
    if (rect) {
      setNotificationCoords({ top: rect.bottom + 8, left: rect.left });
    }
    setNotificationMenuOpen(true);
    if (unreadCount > 0) {
      markAllRead();
    }
  };

  const toggleNotificationMenu = () => {
    if (notificationMenuOpen) {
      setNotificationMenuOpen(false);
      return;
    }
    openNotificationMenu();
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!notificationMenuOpen) {
        return;
      }

      const target = event.target as Node;
      const clickedOnTrigger = notificationRef.current?.contains(target);
      const clickedInsideMenu = notificationMenuRef.current?.contains(target);

      if (!clickedOnTrigger && !clickedInsideMenu) {
        setNotificationMenuOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [notificationMenuOpen]);

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
      <IonHeader className="header-fixed">
        <IonToolbar className="toolbar">
          <div className="header-container">
            <img src="/logo.png" alt="Logo" className="logo" />
            <h1 onClick={() => history.push("/home")} className="title">
              CG
            </h1>

            {/* Navegación Desktop */}
            <ul className="nav-list">
              <li onClick={() => history.push("/home")}>{t("store")}</li>
              <li onClick={handleWishlistClick} style={{ cursor: "pointer" }}>
                {t("wishlist")}
              </li>
              <li onClick={() => history.push("/support")}>{t("support")}</li>
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

              <div className="notification-container" ref={notificationRef}>
                {unreadCount > 0 ? (
                  <BellRing
                    className="icon"
                    onClick={toggleNotificationMenu}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <Bell
                    className="icon"
                    onClick={toggleNotificationMenu}
                    style={{ cursor: "pointer" }}
                  />
                )}
                {unreadCount > 0 && (
                  <span className="notification-badge">{unreadCount}</span>
                )}
              </div>

              {/* Usuario */}
              {!isAuthenticated ? (
                <>
                  <button
                    onClick={() => history.push("/login")}
                    className="btn btn-outline"
                  >
                    {t("signIn")}
                  </button>
                  <button
                    onClick={() => history.push("/register")}
                    className="btn btn-primary"
                  >
                    {t("signUp")}
                  </button>
                </>
              ) : (
                <div
                  className="user-menu-container"
                  ref={userIconRef}
                  onClick={toggleUserMenu}
                  onMouseEnter={openUserMenu}
                  onMouseLeave={closeUserMenu}
                >
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Perfil"
                      className="user-avatar"
                    />
                  ) : (
                    <User
                      className="icon user-icon"
                      style={{ cursor: "pointer" }}
                    />
                  )}
                  {userMenuOpen &&
                    createPortal(
                      <div
                        className="hover-user-menu"
                        style={{
                          position: "fixed",
                          top: menuCoords.top,
                          left: menuCoords.left,
                          zIndex: 99999,
                        }}
                        onMouseEnter={openUserMenu}
                        onMouseLeave={closeUserMenu}
                      >
                        <div className="hover-user-menu-header">{t("yourAccount")}</div>
                        <ul>
                          <li>{t("yourProfile")}</li>
                          <li onClick={() => {
                            history.push("/orders-settings");
                            setUserMenuOpen(false);
                          }}>{t("ordersSettings")}</li>
                          <li onClick={() => {
                            history.push("/my-tickets");
                            setUserMenuOpen(false);
                          }}>{t("myTickets")}</li>
                          <li
                            onClick={() => {
                              logout();
                              history.push("/home");
                              setUserMenuOpen(false);
                            }}
                          >
                            {t("signOut")}
                          </li>
                        </ul>
                      </div>,
                      document.body
                    )}
                </div>
              )}

              {notificationMenuOpen &&
                createPortal(
                  <div
                    className="notification-dropdown"
                    ref={notificationMenuRef}
                    style={{
                      position: "fixed",
                      top: notificationCoords.top,
                      left: notificationCoords.left,
                      zIndex: 99999,
                    }}
                  >
                    <div className="notification-dropdown-header">
                      <span>{t("notifications")}</span>
                      <button
                        className="notification-clear"
                        onClick={markAllRead}
                      >
                        {t("markAllRead")}
                      </button>
                    </div>
                    {notifications.length === 0 ? (
                      <div className="notification-empty">
                        {t("noNewNotifications")}
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`notification-item ${notification.read ? "read" : "unread"}`}
                          onClick={() => {
                            if (notification.link) {
                              history.push(notification.link);
                            }
                            markAsRead(notification.id);
                            setNotificationMenuOpen(false);
                          }}
                        >
                          <strong>{notification.title}</strong>
                          <p>{notification.message}</p>
                        </div>
                      ))
                    )}
                  </div>,
                  document.body
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
                  placeholder={t("searchGames")}
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
                    {t("noSearchResults")}
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
                {t("store")}
              </li>
              <li
                onClick={() => {
                  handleWishlistClick();
                  setMenuOpen(false);
                }}
              >
                {t("wishlist")}
              </li>
              <li
                onClick={() => {
                  history.push("/support");
                  setMenuOpen(false);
                }}
              >
                {t("support")}
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
                  {t("signIn")}
                </button>
                <button
                  className="mobile-btn mobile-btn-primary"
                  onClick={() => {
                    history.push("/register");
                    setMenuOpen(false);
                  }}
                >
                  {t("signUp")}
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