import { useParams } from "react-router-dom";
import { IonPage, IonHeader, IonContent } from "@ionic/react";
import Header from "../../components/Header/Header.tsx";
import GamePage from "../../components/juegos/GameContainer.tsx";

const GameDynamicPage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();

  return (
    <IonPage>
      {/* Header fijo y transparente */}
      <IonHeader className="header-fixed">
        <Header />
      </IonHeader>

      {/* Contenido scrollable */}
      <IonContent fullscreen>
        {gameId ? (
          <GamePage gameId={Number(gameId)} />
        ) : (
          <p>Juego no encontrado</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default GameDynamicPage;