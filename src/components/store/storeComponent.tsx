import { IonContent } from "@ionic/react";
import { useState } from "react";
import "./storeComponent.css";

const allGames = [
  { id: 1, title: "The Witcher 3: Wild Hunt", price: "9.99", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg" },
  { id: 2, title: "Cyberpunk 2077", price: "29.99", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg" },
  { id: 3, title: "Red Dead Redemption 2", price: "39.99", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg" },
  { id: 4, title: "Elden Ring", price: "49.99", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg" },
  { id: 5, title: "God of War", price: "34.99", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg" },
  { id: 6, title: "Hades", price: "14.99", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/header.jpg" },
  { id: 7, title: "Stardew Valley", price: "13.99", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg" },
  { id: 8, title: "Grand Theft Auto V", price: "19.99", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg" },
  { id: 9, title: "Counter-Strike 2", price: "0.00", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg" },
  { id: 10, title: "Doom Eternal", price: "24.99", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/782330/header.jpg" },
  { id: 11, title: "Resident Evil 4 Remake", price: "39.99", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg" },
  { id: 12, title: "The Last of Us Part I", price: "49.99", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/header.jpg" },
  { id: 13, title: "Assassin's Creed Valhalla", price: "29.99", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2208920/header.jpg" },
  { id: 14, title: "Far Cry 6", price: "19.99", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2369390/header.jpg" },
  { id: 15, title: "Forza Horizon 5", price: "39.99", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg" },
  { id: 16, title: "Halo Infinite", price: "0.00", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1240440/header.jpg" },
  { id: 17, title: "Minecraft", price: "26.99", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1672970/header.jpg" },
  { id: 18, title: "League of Legends", price: "0.00", image: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt2c0b7f6d7c7b2c5d/5f4c0b1c8d1e6b0f9f0f0f0f/LOL.jpg" },
  { id: 19, title: "Valorant", price: "0.00", image: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/valorant.jpg" },
  { id: 20, title: "Rocket League", price: "0.00", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/252950/header.jpg" },
  { id: 21, title: "Sekiro: Shadows Die Twice", price: "29.99", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header.jpg" },
  { id: 22, title: "Dark Souls III", price: "19.99", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/374320/header.jpg" },
  { id: 23, title: "Civilization VI", price: "14.99", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/289070/header.jpg" },
  { id: 24, title: "Cities: Skylines", price: "9.99", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/255710/header.jpg" },
  { id: 25, title: "Rust", price: "34.99", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/252490/header.jpg" },
  { id: 26, title: "ARK: Survival Evolved", price: "19.99", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/346110/header.jpg" },
  { id: 27, title: "Battlefield 2042", price: "29.99", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1517290/header.jpg" },
  { id: 28, title: "FIFA 23", price: "19.99", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1811260/header.jpg" },
  { id: 29, title: "NBA 2K23", price: "24.99", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1919590/header.jpg" },
  { id: 30, title: "Dead by Daylight", price: "11.99", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/381210/header.jpg" },
];

const ITEMS_PER_PAGE = 18;

const StoreComponent: React.FC = () => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(allGames.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const games = allGames.slice(start, start + ITEMS_PER_PAGE);

  return (
    <IonContent fullscreen className="store-content">

      {/* HERO */}
      <section className="store-hero">
        <img src="https://images.unsplash.com/photo-1552820728-8b83bb6b773f" alt="gaming hero" />
        <div className="hero-overlay">
          <h1>Discover Games</h1>
          <p>Browse the best titles</p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="store-categories-grid">
        {[
          { name: 'Classic', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg' },
          { name: 'Strategy', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/289070/header.jpg' },
          { name: 'Adventure', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/367520/header.jpg' },
          { name: 'Indie', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/413150/header.jpg' },
          { name: 'Role-playing', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/489830/header.jpg' },
        ].map((cat) => (
          <div key={cat.name} className="category-card">
            <img className="category-image" src={cat.image} alt={`${cat.name} category`} />
            <div className="category-overlay" />
            <span>{cat.name}</span>
          </div>
        ))}
      </section>

      {/* MAIN */}
      <section className="store-main">

        {/* SIDEBAR */}
        <aside className="store-sidebar">
          <div className="sidebar-section">
            <h4>GOOD OLD GAMES</h4>
            <label><input type="checkbox" /> Show only discounted</label>
            <label><input type="checkbox" /> DLCs</label>
            <label><input type="checkbox" /> Hide DLCs and extras</label>
            <label><input type="checkbox" /> Show only free games</label>
          </div>
          <div className="sidebar-section">
            <h4>Release Status</h4>
            <label><input type="checkbox" /> New arrivals</label>
            <label><input type="checkbox" /> Upcoming</label>
            <label><input type="checkbox" /> Early access</label>
          </div>
          <div className="sidebar-section">
            <h4>Genres</h4>
            {["Action","Adventure","Racing","RPG","Shooter","Simulation","Sports","Strategy"].map(g => (
              <label key={g}><input type="checkbox" /> {g}</label>
            ))}
          </div>
          <div className="sidebar-section">
            <h4>Languages</h4>
            {["English","Español","Français","Deutsch","Italiano","Português"].map(l => (
              <label key={l}><input type="checkbox" /> {l}</label>
            ))}
          </div>
        </aside>

        {/* GRID */}
        <div className="store-grid">
          {games.map((game) => (
            <div key={game.id} className="game-card">
              <img src={game.image} alt={game.title} />
              <div className="game-info">
                <span>{game.title}</span>
                <span>{game.price}€</span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* PAGINATION */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span>{page} / {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>

    </IonContent>
  );
};

export default StoreComponent;