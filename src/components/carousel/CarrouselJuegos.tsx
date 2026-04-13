import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./CarrouselJuego.css";
import { useHistory } from "react-router-dom";

const videojuegos = [
  { id: 1, nombre: "Doom", img: "/doom.jpg", ruta: "/doom" },
  { id: 2, nombre: "ETS2", img: "/ciber.jpg", ruta: "/ciber" },
  { id: 3, nombre: "The Last of Us", img: "/thelast.png", ruta: "/thelast" },
  { id: 4, nombre: "Sekiro", img: "/sekiro.jpg", ruta: "/sekiro" },
];

const CarouselJuegos: React.FC = () => {
  const history = useHistory();

  return (
    <div className="carousel-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 20 }
        }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        {videojuegos.map((juego) => (
          <SwiperSlide key={juego.id}>
            <div
              className="card"
              onClick={() => history.push("/doom")} // <-- Aquí hacemos la navegación
              style={{ cursor: "pointer" }}
            >
              <img
                src={juego.img}
                alt={juego.nombre}
                className="card-image"
              />
              <div className="card-overlay">
                {juego.nombre}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselJuegos;