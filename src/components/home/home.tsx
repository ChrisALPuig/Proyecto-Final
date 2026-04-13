import { IonContent, IonModal, IonIcon, IonRouterLink } from "@ionic/react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import CarouselJuegos from "../carousel/CarrouselJuegos.tsx";
import "./home.css";
import { logoApple, logoWindows } from "ionicons/icons";
import CarouselForYou from "../carousel/CarrouselForYou.tsx";
import CarrouselWhishlist from "../carousel/CarrouselWhishlist.tsx";


const HomeBien: React.FC = () => {
  const [authMode, setAuthMode] = useState<"login" | "register" | null>(null);
  const specialOffers = [
    {
      id: 1,
      title: "Kingdom Come: Deliverance II Royal Edition",
      badge: "-50%",
      oldPrice: "87.69",
      newPrice: "43.89",
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/379430/header.jpg",
      label: "Early Access",
    },
    {
      id: 2,
      title: "Shadow Gambit: The Cursed Crew Complete Edition",
      badge: "-60%",
      oldPrice: "76.69",
      newPrice: "30.69",
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2076890/header.jpg",
      label: "Sale",
    },
    {
      id: 3,
      title: "Travellers Rest",
      badge: "-25%",
      oldPrice: "19.69",
      newPrice: "14.79",
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1481430/header.jpg",
      label: "Oferta",
    },
    {
      id: 4,
      title: "Warhammer 40,000: Rogue Trader Voidfarer Edition",
      badge: "-60%",
      oldPrice: "108.49",
      newPrice: "43.39",
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1964120/header.jpg",
      label: "Oferta",
    },
  ];

  const cgMods = [
    {
      id: 1,
      title: "DUSK HD",
      badge: "MOD",
      price: "Free",
      image: "https://images.gog-statics.com/0a3bad6faee17a252d5f919647d994642dc8420e9d5b51dbc8a0361f3d94a5df.jpg",
    },
    {
      id: 2,
      title: "S.T.A.L.K.E.R. G.A.M.M.A.",
      badge: "MOD",
      price: "Free",
      image: "https://images.gog-statics.com/3c5e8fbee77a4b9914a2eb2b42d8e4d95b1eccd27390ce3cf1cfc7fca8a0234e.jpg",
    },
    {
      id: 3,
      title: "S.T.A.L.K.E.R. Anomaly",
      badge: "MOD",
      price: "Free",
      image: "https://images.gog-statics.com/ee7e1d28bf7bf054dde3b8f98a6a11476a5ddfd8a8e3e108edf1a8cf6febb7ab.jpg",
    },
    {
      id: 4,
      title: "Diablo 1 HD Mod (Belzebub)",
      badge: "MOD",
      price: "Free",
      image: "https://images.gog-statics.com/2868f531f46119a24646c0a1eef74f20db9983aa38f5d5f4d4dda1c8bbfe1f75.jpg",
    },
    {
      id: 5,
      title: "SWAT: Elite Force",
      badge: "MOD",
      price: "Free",
      image: "https://images.gog-statics.com/e7d115a8c540b538c239057e774a4f5a6b7e591c2a8dbf059cc5bba0c8d55d95.jpg",
    },
    {
      id: 6,
      title: "The Elder Scrolls: Skyblivion",
      badge: "MOD",
      price: "Coming soon",
      image: "https://images.gog-statics.com/4d1a2c7d09d6754d2437d328600280b35c5879f3656cf8c18e2e7f5f045aaca5.jpg",
    },
    {
      id: 7,
      title: "Resident Evil 4 HD Project",
      badge: "MOD",
      price: "Free",
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg",
    },
    {
      id: 8,
      title: "Half-Life: Echoes",
      badge: "MOD",
      price: "Free",
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/293340/header.jpg",
    },
    {
      id: 9,
      title: "The Witcher 3 HD Reworked",
      badge: "MOD",
      price: "Free",
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
    },
    {
      id: 10,
      title: "Fallout 4: New Vegas",
      badge: "MOD",
      price: "Free",
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/377160/header.jpg",
    },
    {
      id: 11,
      title: "Skyrim: Enderal",
      badge: "MOD",
      price: "Free",
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/690790/header.jpg",
    },
    {
      id: 12,
      title: "Cyberpunk 2077 Redux",
      badge: "MOD",
      price: "Free",
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
    },
    {
      id: 13,
      title: "GTA San Andreas HD",
      badge: "MOD",
      price: "Free",
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/12120/header.jpg",
    },
    {
      id: 14,
      title: "Minecraft RTX Mod",
      badge: "MOD",
      price: "Free",
      image: "https://cdn.cloudflare.steamstatic.com/steam/apps/431280/header.jpg",
    },
  ];

  const cgModsPages = [
    cgMods.slice(0, 7),
    cgMods.slice(7, 14),
  ];

  return (
    <>
      <IonContent fullscreen className="home-content">
        <div
          className="hero-background"
          style={{ backgroundImage: "url('/FondoInicio.png')" }}
        />

        <div className="main-content">
          <h1 className="section-title">HIGHLIGHTS</h1>
          <div className="section-divider"></div>

          <CarouselJuegos />

          <section className="special-offers-section">
            <div className="special-offers-header">
              <span>SPECIAL OFFERS</span>
            </div>
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              loop={true}
              breakpoints={{
                768: { slidesPerView: 1.25, spaceBetween: 20 },
                1024: { slidesPerView: 1.5, spaceBetween: 24 },
              }}
            >
              {specialOffers.map((offer) => (
                <SwiperSlide key={offer.id}>
                  <div className="special-offer-card">
                    <img src={offer.image} alt={offer.title} className="offer-image" />
                    <div className="offer-badge">{offer.badge}</div>
                    <div className="offer-content">
                      <div className="offer-label">{offer.label}</div>
                      <div className="offer-title">{offer.title}</div>
                      <div className="offer-prices">
                        <span className="offer-old-price">{offer.oldPrice}€</span>
                        <span className="offer-price">{offer.newPrice}€</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>

          {/* CATEGORIES */}
          <section className="home-categories-grid">
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
        
        {/* Carrousel Juegos Recomendados */}

          <CarouselForYou />

          <section className="cgmods-section">
            <div className="cgmods-header">
              <h2>CG Mods</h2>
              <span>See more</span>
            </div>
            <Swiper
              modules={[Navigation, Autoplay, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={24}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 3600, disableOnInteraction: false }}
              className="cgmods-swiper"
            >
              {cgModsPages.map((page, pageIndex) => (
                <SwiperSlide key={pageIndex}>
                  <div className="cgmods-layout">
                    <div className="cgmods-row top-row">
                      {page.slice(0, 3).map((mod) => (
                        <div key={mod.id} className="cgmod-card">
                          <img src={mod.image} alt={mod.title} />
                          <div className="cgmod-info">
                            <span className="cgmod-badge">{mod.badge}</span>
                            <h3>{mod.title}</h3>
                            <div className="cgmod-price">{mod.price}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="cgmods-row bottom-row">
                      {page.slice(3).map((mod) => (
                        <div key={mod.id} className="cgmod-card">
                          <img src={mod.image} alt={mod.title} />
                          <div className="cgmod-info">
                            <span className="cgmod-badge">{mod.badge}</span>
                            <h3>{mod.title}</h3>
                            <div className="cgmod-price">{mod.price}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>

          <div className="contenedor">

            {/* ================= BESTSELLERS ================= */}
            <div className="columna">
              <h2 className="column-title">BESTSELLERS</h2>
              <IonRouterLink routerLink="/doom">
              <div className="juego">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIoWKU2y6LTD8Lpv6s4VuyAWwmPBeIsFj3aJF4Uz_7_-2WuUNW" alt="" />
                <div className="info">
                  <div className="titulo">Euro Truck Simulator 2</div>
                  <div className="iconos">
                    <IonIcon icon={logoWindows} />
                    <IonIcon icon={logoApple} />
                  </div>
                </div>
                <div className="precio">19.99€</div>
              </div>

              <div className="juego">
                <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBIQEBAVFRIXDQ0OEA0NDQ8NDRANFREWIhURFRUYHSggGBolGxUVITEhJSkrLi4uIx8zODMsNygtLisBCgoKDg0OGA8QGC0dHSUtLSstLS0tLS0tLS0tLS0tLS0tLS0rKy0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIANwAlgMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAEBQMGAQIHAAj/xABLEAACAQMCAgcCCwQEDQUAAAABAgMABBESIQUxBhMiQVFhcYGRBxQjMkJSYqGxwdFygpLwJFOi4RUlMzRUY3N0g5OzwsMWQ1Wy8f/EABoBAAIDAQEAAAAAAAAAAAAAAAMEAQIFAAb/xAAuEQACAgEDAwIEBgMBAAAAAAABAgARAxIhMQRBURNhBSJx0TJCgbHB8COh4ZH/2gAMAwEAAhEDEQA/AKdI/ZI819BijLRcjnWYYgF337Owxybb+fZRthYHm4wuN2PIVn5G3qb+NSACZFZp2vbzphPaKg1SeoUfPP6V63uo4zhF7/nnn/dQfFLjrNx7qA0aQEyYzs7JFEMamSNVX6TE4GT6024tC9tI9qW1BNHaxjVlAfzqDoLbdZf2+eS65T7EOPvxVk+Ee103EUw5PDpJ8XQ/o491FTH/AIy3vAvm05xi7V/uc/vB2qlseYrY3DxSrJG2l1YOrDuIrocfBrfikAu7cLDc8po12iaYcwR3Z5hhzzvnulU1DY7wmXP6Nah8p7+DKTOm4PlRvR3sXUR+1+Va3Vs0cvVSjSwOCD3fa86MS6iSeLqhtqCF2+exJ3PlQmsbS2oFKHedRuEDIjD6y7mlNm2Jgv2pVpzn5FD5pVeWTF1/xD99XzUCp+kxMC6tY8AyLibbRHwYr/aqtdIj/jBG8YwPxp3es0hZUGdMp37hSfpNdRwSK+NcmhQPqL+tCQMeBNLCNAU9xf7gx78HyMDJqGAXfGe+mnG/peUq/etVf4P+IPJcMXPM7DuGVqw9J5tKTnwKP/ZojkemV9/4iOQE5xfepWeNz9Y0Uf0UlXP7b5I+5H+6rOwCxEDwRqptlG0gic83ea4byAYJGPuc+2rWHyv7lCyDSVHtCuvBHFyDpFch+rb7GD61il06ljg8gcCs1BswgxACpUobBUVGfv3CjYs35CpJn1rjljYKvKll/eOdLN45reO7JGw9tFYxpAJC8WliD7qgnXajer2znc7keFS29smgvI2B3Ivz3P5DzoTPtDpHvwZJ/SnbwspcepeP++rj03tOtsRIPnROrHx0Hsn8QfZVV+DXHxibH+iPj01pXRIEV1eF/muhUjxBXB+6tHAurDUxescr1WrxU4ZcfPqydE+KfE5lck9U46uYDuXuf1X8CaS8ds2t53ibmrlc+K9x9owfbUsTZUUoGKPfibJVcuKjwZ1Tj/BEvUxkLKozFMOR+yfEH+/15XNFJDMI5FKukq5B7t/wq/8AQnieuLqGPajAKE8zb938J29CtHdKuj6XirKFzNHvhdjLGNynr4f3046B11CY2HqG6dzjfiN4HLWwx5YpLexokzSO3fqCrzphb3Ya1Zk2GjI8arF6xdic/R3P7tIuwsA77ftCdHi1O29DeaDi5ljk0DSOsOQOZ9TVW6Utkg/Yovhl4AHi5bs2fE0N0hjLxqV55Tl51ZbGTea6YlGM0IZ0EuMT+xDVl6aux6xV5siADxJ2C1UejsfVXKL3lVyB3Grvx221XMRPIDriO/5MZDfx6PfVSuvJQ4JB/eZWalcE9gf9QKzs/lHRfmxRW9uGOw7CZz/bpvaqgIBOo6cbcqQcOumfrN+z102PNdeze7FMbeXBB8KpmcHISBO9NtA+kiuLgqx0ooGcZIzn31ijbmDXGh+09eqnqHzOGRZyniEOFT05V62GFGeWagunJUVtAdhmjkR0EQ2SUH5owMYAqAyYU+7J7q8laScqEQOIxjlr+DR/6U48bOXH/NjroaPg59orl/QWfReweDB4ifVDj7wK6bnB9uK0umP+OYfxJazk+QJXfhI4J18S3kS5ZQscyqNzFnZ/YT7j5VUbOxSIfLvv/VKcv7e4fztXVoZcZBGVI0spGQQedc46WdGjaS9ZHlrd2zG/Pq2/qyfwP6UPqMX5hGPh/U2PSY14+0zDxoQzROiBUV+2AMu0RGH39Dn1ArpkD94PoRyNcZlOwro/RG/6y2iB5qGhP7Ueyf2dFW6d/wAplPiOEABx9I14mgjSR1HycmrWB81Jj9L0Y8/PHiaqTy7AemfOrwulgUcZRlKuG5EHaqRfWbQSNCxyVwUY82hJOgnz2IPmDQeqw/MHHEn4XkXUUPM57xSZo5Wx3Owq1cEIlEY58hSLpBw53uNKDJbteQHeT4CrJwHRCojRgzZGuQd2e4VGcqcQaaS5GVmUeDMRvHbXG+GkZ9IHNI1J7/OrNxa4w8031IUjH7QTrH+7q6pV2he6Crz60f8A2qwcal02mPpOus/8RxgH0jyPZXYBR1dgLmd1iDUovcn7QHo+MR48Djemyt/3Up4M2AR+yaanx86RP4o2wh7XQWJVP12NepJxWcppr1dUD6C+JSUtw0Z8RUMWwpjCoZNuenBHjUdjwx3Go9lM7s2wpo7xnYCCwqScD7qZLwoKuud9A5hOch9n64rf45HD2YBlu+Zhv7B3fjSy5kZ8liSfM1RqEIltxtGa8WSIp1EeAsiSam3kbQ4Ps5d1dQeQE6gdiFYEd6la4yVwB6V0roxedbZxH6SBoG/c+Z/YIprpcnKmZ/xPDQVx9I9D1uGRlaORQ0bDDI3I0HrrYPTgO0xro3Kd0o6Ntb/KxZeDPzvpx+TfrRnQZyI5PDr1I/aKDP4CrQkxHuwQeRHnUcUMKDCRKnaLER9gaz9LA27h7qEuMBtQjmTq2fD6bDfzDw9BdJLTrokmX58XYfPfC+Mk+hwc9wDeNSCSp7WQElHGUdSjKeRBozKGFGK4nONww5E5303fq7dViPzuzJKPnPj6I8qT9GrnRIoJ2YAb+NPelFqRbGI7tHMYyx5nB2b2jB9tVOFCNNIp82NlPaxPSYQCNfmWWKMteaR9JtAI7gdifYMn2U16QvrJHd1jEY/1ahf/ACH3UJ0WGqQzN/7cLsT9sjA+7XWeISch9lSfUkk/cUqv4MJPc7RPLT9SoHYSODamMd0unc+tLNVBXEu9IAxkC4dxS/jcgE7D8axSt7cNj0zXqtCBZvZrHbEGbdzsIgdh6/pQvGLl2fc9n6KLsAvpSq4cnc8+eaImuNYX9lQaaYwaDzNY+deO1eQb1v1RIoLGNY5h2zj0q19DLsLI0GdpE1L/ALVN9PtGfcKrdxZPGq6u9c6e8Dzra2dkKuuzKysD4EHIrsT6WBkdRiGXGVnSi9Y10PDdrNGkycnXJX6r/TT2Gqf8K10yWACkjXcxI2DzTQ50+8Ctdd55QqQ1GXtZcjb3g1nXXz3wvpDPbENDIV7yuco3qORrrvQ/pOl/DqwFlXCyxA8j3MPI1IUiWddPBuWcPW6yY3880IHqRWqYOBdM4BqLdzpDKfNx2T9wjqpXaJBJkrq7OVU8gfOrr0nZWt4XJ20yx5B+0D/2VSOkDamUr/VrhRzrMzWMhA7z0PRNeAA+8fcFTRZs/fLLgfsDb8Q/vpffPmR/JtH8C6fyp3doIlgg7o4l1Ed+BufuJ9tVkuTueZ3P7VW6r5UCxbpfnyO/9/u0KRtqBuzvRCvtQV2d6SAj4G8liuCOXh3VmgRJv7K9V9Ilt5tPwtcf5xF66m/StoeFxhNRuFODvoVjSmU5FNI49EAPidqYaBRSe82ijg1YDMxzjJCoKMu5Ykwsfdpy5+kf0pGG3qV1JFAYEmMIPMMvLvXvknxY99Qa9qL4dwuV1zowMf5SQ9XGPaaLRbWLfPXuO4bQK34mqgGE1qNhuYw6My6EOQREWGpn2RZeQcfgfYe41D0/4Y1xZTRqO2mmZV7yU5j2jNLrrijygjyIIAwijwA7qZ8B4v1iiCU/KDsxSMf8ovdE58fA9/Lnze6XqAfkP6TI6/o23ygfX7zhWqrF0D4mbe+hOey7dQ48VfYe44Psp90z6Dtrae0XmS0ltyKnvKfp7vCqXw+CRLmJCjK/XwjS6sHDax3GtLmZFmfQqSVSfhN6TvAiWsLFZHXXIynBWHkAD5kH2Dzq2QvXHulgkuuKSoil3MywRooyTgBQB7qpUso3l34Kx/wTED33s7r+yI1H4mi+BQGW5hB7n6w+QTcfeAPbXr6JYUitFOVt4uqZl5Nck5lI/f2/dpn0STSJpz9FOrB+185x/wBOs2teeuw/ibrscfTE+f54k3Gp8mZvs9UPawX86Qs+1GcWkxEPFpsnzUA5+8iludqr1PzMJXoUrHfvJusoW6OTXi+2ffWy3Cq2ojO2w86AFI4jdC4HcIUO+2RnFeo02Yl+WuJREjHCFtix8h4ViiDGZU5UE9Lwl3ISNGPi+nYn9KbXHBX6gK7opA+m6/lVXn45MEHaPhqLNRnB+KmTsvvkczRCtCVRr2BkiW1rGflJ2c/UgTA95ol+MJGPkIEXwkk+Vf79qU8Qt9DHHLNQNL2aGT4hFQE77xhdcWklTtsSTzLH7gO6hY3xU/ArAXDqjMUTTKTII2kJ0DOEA5nypy3RuFI9U90Ye3IqddDnrQDgOiA6wMY5rQxiY7iX9fHjOk/tK/rx76z1gA39MeNPp+irnUsU8UjKFLKS8LrnkDrAAPkTmgL/AKOzROYZVyrDsyDeNx4qf5IqPTZTZG0IOoxuKB3g0vSt0TS+HP0XOqSTH1X3APrnPrS6TpRIe3o5ZIYQ7DHPck+I99WPhHRCBOrN0GlZ5oxHbQuFc2z5BmfG+B3jIx3+FNrfovamKO5S4T4vDY8VtnjkOmZzIZwpI7jgtz37I9mzjNqKMws5xqxpRKfY9MzntY9DEwz7Qx/CmtlxG1i6y5t4cXUhYNc6usWJTzcZ3Q+GwGfHABD4z0UtT2LNXSUJadUtxKqJeRPCXkmHWY0acb747sA0B0a4fPM4SBSWJ3cDsIPEnl+X4VTKxA5h8GHDkGoiqjUN2atNqvVWKDvftnz17j+xoFLx0SkUiOSaJFMnUo+pnyc4GNIIBPgSKs3EuGo+USXU8asfi8aaH/tEbDHcDS3TYyAWPM74hnVtKKduZTOkD4MSeETSfxtj/sFALJ2aZ9MbLq5sqxYGMZBiaMxaMKcg9xIyD50ihJbsgZPIAczVci2xjXTUMK1MtJ/+UetukCiWfdsZjt87nzfwFYIS154efwO6Q+vi/wCFJr64LEsWyc5LMalE3kOxbjiZ4nfNM2qQ+QGdKqPACvUpnl3r1H9OC2Ekvbgtn9pjpHIVjh05Xfz2NaugK58sn9o0NFOq5DnbO6j6Xl7fwzQyl7CVQkGzLKLkzLsvkXY4T2eP871A1me+T+GP++n/AET4HHJaScR4hrECvogtUPVdYeWTp3Azt7DWby04XcW1w0EL29xHGHXFzLNGVMirq3PPtcqn0QIyvUKeFJo1fG//ALA+jfGJrORdExaLrUeSAfJ6sc8ZyM+6vXVyl3NMkYnWOKLroo53i6wtJOgffcYzJnmdxz3pJbdGb2ResgVpFBI1oj4289x99EcPtr5opUNlLLG6CNpEjc6NEiNsw2zlBUhBVEWJ2T09WsbNHl9wMdd1bTSO7vcxxPIykjqsga9t8lMd2Oe/KmtmBZxvpkkDCC2m0CTGTJ1exx5yfdVRfpJLKzBIw0jTTyQ6SwkhefZ0AJ33yR4E0XxXid5GCbjhxj1wxws1x1sSMI+rwQc/6sbDxNUbGLsCCZmFK3Hj9ftG3G9dwZB8Yl1wzyxFTJlDcJDK0TID3F4SuPMGq1x1biENDJOz9dciWU4Tt/JI2oPjI3nkGxxz251vxfil5A8c72xiJuIbxpHjdEubhF2fB+huxwNu0axd8D4rJbw3EtpIY44iQxCh+pDu+XGcjZueOQFMYxpFQDUWFkVXtGUdnPHxC4AuZzNH8tKvWmM3GJB2Box2up38zkDuzaelUOpDMZpTEFdnjEjdv5RFTGdhu3PFc7m6RT3EmpIv6QZF6t4dZm2m1oAO8g7DywO6rPfXvEIoG+N2JWNzMXyCI8SyB8bHsYIGPDHfvQc6ahYlQGR1Ih3RnhQaVZlEihJLkEPpR0ZIUKZ25/Kn+GmJlTro5A0uJARIwdB8jrdH3x9jPoTSHhHSF+pkn0DHXTTdktgB4kTn6gD1qPhVzJcqkMa5cQywqV1EnrHPaI8jIT7KIihVAEXzN6mQsx42knSXpJLfymO36wQsIwsDHdiAN3A/DNAfGUtQUQhpsYeUbiP7KefnWeOxvYkW8aMruu8rRsk0m+NCDmB+NWBejNpYxR/HY2muHTW0QmaKOJPDI3J/Q+0ZBNkx8OqqABt2Hn3Moktzk78886EvJdqtPS/gFqtqL6zZwOuEMtvI3WFCQTkNzxt58/KqFNPmiIk5swqZlmrFBu+a9RqiZyGWMMjrnOG8PFu6vRxJGQzY142JPKkct0yDsnB7m7x/P60tZiTvue8k5JoS4yd4wOoCdrM+jOjFlHxPgYgR9LB5kD4z1c6ylgSPAgj2GuM8ahu7KeS3n1I47LAHsOmcgg96nANb/B902m4TPqGXt3K9fb55j66eDD7+R8u39LODWnHeHi4t2V3EbyWs6fODgbwt5EjBB5GiFRUUTqWRz4JuUb4OLpjwrjJyezbZXfl8jL+lb/B7fM3CuME/RtiQPWGT9KB+DRv8Ucc/3Qf9Gas/BjvwjjeP9FAH/JmqAvEu+UnV7kfxKK994Ig8wi5rpvwqWb3XEOH2yk/KW0YJJ2UFzrc+gBJ9K5jDZD6R9g2FfQXFeBx3V03axMOBtDDvuOtMil/Zy/eqFAqoTqMhBVj7zlUNxHxDjNvt/RVuba2gjPI2sRARMeBxk/tGs9NeIXVrxa8aRm7aXMYGW0PaSRFYx4EAEe0eNVSO+lgnSQdmSGYOFYfNlR86SPUV2rjFlb9IuGrcwYFyiOFXPbSXT27d/I9x9D41I3EpkIRhfFVKp0At1s+G3nFiB1oDW9szDOhzhdY/fcD90+NQfBlxN/jxglYyQXSyJMkrF/lCCQ5zzORjPnR92NPRKEAbm5YOPP43J+gqq9CImTiFkWOHN5baYx87RrGSfAY/Guo2Kna1KOW5+3E6H0V4JGt7e8NcZjFnMmSNyryRkP69oH1qqcMs5bXiUVs50unErRCcfOQSA5HkcofbXQLFx/6lvAP/AIhGP7WqH8gKqvD3PE04bxAYNxbXtrbXoPz3jMyCOf12wfU9wqSNoljbej3ju4tEk6RkFckdTIWbfASAEAeG+KrnwgccX4/OM50MIwo7sIPzzVjtSR0qlJzg24UcsZ+LRn8jXOenkDnid4AR/nMhVScHSd++hstg/WaHTkjIu35RAeIcfZoJYe53jbY8iocf+Sq077V0a36FWsnCH4g5n61CUMCzQdW0msKrZ07DtA+NUyPgEjfOdVHgAW/SrKQo3Muy5MzHQp22/WJs1mpb+1aF9DHO2Qw5EV6ihlMQfWjFSJveJ+FA6ac3NvqHnQ8PCnY819csfyoa5FA3jb42LbCO+lfRt4rXhlxGuY5rJQzqNvjPWOxBPo45/VPhV++B6VrG2v5ZGPxdIUmbJ7PXgP8AM8yMD+GqxwHpTd2UPxXsTQd1veR9bGO/bkQPLOK2430iuL6H4tpjih+eLe1j6mIuNwSOZ3qhzC4I9M9EEQ34ND/ijjv+6f8AhmrHwaEjg3HSOfxTII/2M1VfgvSu6soJbaERdVKGEyvCJDKCuMEnuwcVY/g7mv2t5oOHT2iyFnaSyuoR1lwmBjSXyHGC4xtjAz87NFEFkRlBMovDY5BBPcnJRGhhBYtpM0hyB/BHJ91dv6Ucb+Jca4bITiN7JIJcnbq5JCMn0bQfZVQ6Q8J6Qzx28EtnG0PxhJxFb20Uca3IUqVlC423O/zT4mg+LxcY4kyf4QtmiWNgvxqS0FokURO+XfSpHfjNcRXEqh1GmO28ZdOOiOeO9Uq9i6SW4jA2Bm6py4/5iZ/eFB/AtfTQ8T6oEiN4ZuvQ7KojQkOfAgjHtNMLn48Wgil4rZubaZOqvFEsk0O4GOt6vS+w3Uk5xvTnisFzNBO0Bt4WljuDLLDZ9VeXUMbOH1uCQurq5Dgc8DfeorvL6iV0macKmF1wfiFpCQ00Ty3ccYGexr14Ud5yHHqRVQ+CGwa54pHKd1iBmkdu7AON/wBrR76m4VYtZXn9H4nAkisqhplmjyCBlJAFZR4EFu6mvSC64mont7Ozi6qQ/L3XBbRiJpdPbVyhYgZ9Dz23qVNmp2ZSoNcGNegPFxe9IuJXCnKGzkSM/RMccsKKfaEz7ao3wd9Jv8H8QUufkH0QTg8gNsP+62/pmm/QbgPHbOVvi9qIi8aGW4uIdWmHnoGd8/ZAznnSfpJ0OmtomurySGGWR2eOwjbXOWLjuGyLguc5OMAd+1mEFjokgy19K+NC06RmfPZR7Uvj+qMCB/uJrHwo2YW967YxTxRyo43QsAAcH2Kf3q5reXUs7h5Gy4jhj1d5SNAqZ9gFWvgnTC5igW3eOC4iU5jjvYOvEZ+zuKEyx/EzKylRZAr6iW4kW3RphI2GlmUwq/zn+WQ/gjH0rnK3rY2x7Gpjx/j01+P6Q41KuUhTSiIB9VPSkK1GkNDY3fFe/wCLf/kG4yxZlY+DDnnwr1ZuXTVhhns7YOK9VwtRTK9sTGEezBiMjO4qV5F09nY68gHwrRTtjHlmi7HhTy9rZIwe1NIcRjy8z5DelCN5oWAN5E4LKDTThPCZ37YTCf1khWOP3mpxe29thYE6xsf5xMqkBvsR8vfn2UJLfyTN8pIzeGps4qjAVOBJ4FSv8dsepnZAysPnB01aCp8PTl7KVTbEEHBBBBBwQau9xYRygLIuccmBwRUvCej6avk48kbmSQ5CL45OwoqdSKqt4PJhPc7SHg/STjLRpH8clSEKqr2U6wr5HGr2k++nvFr1hZ6L4l8ukoWWR5LsnkNyewDtzB78c60nvorYYhw8vfOw7Cf7MfmarPEJTJq1sSW1ZYnJ1V3qMzAmUXCqrsP17/8AJDLxSRnR0+TEbh4kjGEjYNkHzO3M1v8A4euyHBuHwzFiA2OfPGOQ8htSqNsZB5jYjwNLr7iOMqh35Fh3elM0TxBsyILMN49x55JGdm1ytjXKQu2AAFAG2wUVDw7pVc28MkUJ0O8kchukaVblVT6AIbAHszz33pAaOtlxGT4tj8v1q6qLmfkzNkO/HiW6x+Efi6rpN45BUgiQLIwHjk75pXLIzsWdizHcuzZJ9tKRscjxzijoXyKkjeGwkAQlRWlxcaBgcz9w+tWdWBn3DxoKXJOffUAAneFdyB8vMzbnLZ885o1nwKDgYAefhjessxbn7BUtKIaX3nt2JJ93hWKljWs0MtJq5ajax241XA1S81tVOAvnKRy9Bv6UHfXzy6S7d2AijCIv1QBsKGQs58ST6ksakuIOrfS3dscdx+rSpIupoKv5jIxU0SnbG/kKiRsGp4bzR8zb7ff7PCoKy+o9pYbe2VRruH0DG0S7zN7O721FxDjBddEY0R9yL9L7TnvNIllJ3z7SanSBijP9EDcn631appAkEE7neayTUNcTggbYwO7mahlloG9uMIx+ycftUymOK5MtAxPcz65HbzwPQbCg3raI1q3Om+0ySSdzNaYSDSsa+YJ9gz+dBwx5ZV8WAoq4bMo9M+/J/SoEgcyZBU6L3/eKiQVOBXNGUmf53rGKkC1syY/Khk1CgE7zQJmsqtEwIT2VG522G9FFI4R2+2/1Aewvqe/0qBZktQEFgtGYZA+/Ar1RXN6znc+gzpUegr1TUHqh9tOVww5jcHwrDPnc+NCwydkelb66EUF3NIPtJi34VgNvUBkqJ5qkLI1xlZjW4Ud7YGaY8dvkVRDGeyvNh9J6rHxvG4NRSXOe+o9HUwJ7Qb9QFUgd4RJNS/iUvZx4n7hWxegrt8n0pkCpn5MlipHCuTj2Uw0BRge/vNC2Q3z5bVO71Ig12FzKDtavBXPv2/OhYmzLnzPuogvhCfNQPZv+lCWfzvYa5pTkxmgqYVCrVuGqhMYWFQLvv7amWMyHPd3k8lFQwLkb7KObGtbm820rsvh4/aNDC72YUv8ALQhMl2EGmPwwX7z6eApdLNQ7zUPLNVxBM8mMtZoEyV6pgtUaJcgLzrQ3woEnatKiob1iBUPN4agmuCaHzWrGpqUORiOZIX/nNZD1ATWM1NwNwnXUDtWuaxXEyJNE+BWGkqKs11zpI7nGP5/navQHBqKpY6iSOYbG9F26Z3Jwo3LeH99L4qK4k5XSg+aE1Y8WI5mohgdpJdXudl2Ucl/M+dAvNQ+o1JbLqdQeRK5qDtK6iTU2kyBq7icA+NRJgnfljPrTPpMNMioNlWNQAKTVCHULk5BpYr4nia9WK9V4Gf/Z" alt="" />
                <div className="info">
                  <div className="titulo">Hollow Knight: Silksong</div>
                  <div className="iconos">
                    <IonIcon icon={logoWindows} />
                    <IonIcon icon={logoApple} />
                  </div>
                </div>
                <div className="precio">19.50€</div>
              </div>

              <div className="juego">
                <img src="https://m.media-amazon.com/images/M/MV5BNzIwNmZjYWUtOWIzNC00YTNhLWE3YmEtNzcyM2EzMjhkZmZhXkEyXkFqcGc@._V1_.jpg" alt="" />
                <div className="info">
                  <div className="titulo">Dispatch</div>
                  <div className="iconos">
                    <IonIcon icon={logoWindows} />
                    <IonIcon icon={logoApple} />
                  </div>
                </div>
                <div className="precio">28.99€</div>
              </div>

              <div className="juego">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRTOMVOnOoRJICwPDSKnNglZj4obF8CaiKQ3YiUTaMr4zT9kKw" alt="" />
                <div className="info">
                  <div className="titulo">Arc Raiders</div>
                  <div className="iconos">
                    <IonIcon icon={logoWindows} />
                    <IonIcon icon={logoApple} />
                  </div>
                </div>
                <div className="precio">39.99€</div>
              </div>
              </IonRouterLink>
            </div>
            
          

            {/* ================= NEW RELEASES ================= */}
            <div className="columna">
              <h2 className="column-title">NEW RELEASES</h2>

              <IonRouterLink routerLink="/doom">
              <div className="juego">
                <img src="https://static.wikia.nocookie.net/inazuma-eleven-heroes-victory-road/images/a/ad/Inazuma_Eleven_Victory_Road_cover.png/revision/latest?cb=20240411163041&path-prefix=es" alt="" />
                <div className="info">
                  <div className="titulo">Inazuma Eleven: Victory Road</div>
                  <div className="iconos">
                    <IonIcon icon={logoWindows} />
                    <IonIcon icon={logoApple} />
                  </div>
                </div>
                <div className="precio">69.99€</div>
              </div>

              <div className="juego">
                <img src="https://i.3djuegos.com/juegos/20446/call_of_duty_black_ops_7/fotos/ficha/call_of_duty_black_ops_7-5967256.jpg" alt="" />
                <div className="info">
                  <div className="titulo">Call of Duty: Black Ops 7</div>
                  <div className="iconos">
                    <IonIcon icon={logoWindows} />
                    <IonIcon icon={logoApple} />
                  </div>
                </div>
                <div className="precio">79.99€</div>
              </div>

              <div className="juego">
                <img src="data:image/jpeg;base64,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" alt="" />
                <div className="info">
                  <div className="titulo">Escape From Tarkov</div>
                  <div className="iconos">
                    <IonIcon icon={logoWindows} />
                    <IonIcon icon={logoApple} />
                  </div>
                </div>
                <div className="precio">39.99€</div>
              </div>

              <div className="juego">
                <img src="data:image/jpeg;base64,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" alt="" />
                <div className="info">
                  <div className="titulo">Solo Leveling: Arise Overdrive</div>
                  <div className="iconos">
                    <IonIcon icon={logoWindows} />
                    <IonIcon icon={logoApple} />
                  </div>
                </div>
                <div className="precio">19.99€</div>
              </div>
              </IonRouterLink>
            </div>
            
          </div>
          
        </div>
        {/*Carrousel Whishlist*/}
        <CarrouselWhishlist></CarrouselWhishlist>
      </IonContent>
    </>
  );
};

export default HomeBien;