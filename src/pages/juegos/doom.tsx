import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
<<<<<<< HEAD
import Header from '../../components/Header/Header.tsx';
import GamePage from '../../components/juegos/GameContainer.tsx';
=======
import DoomContainer from '../../components/juegos/doom/doomContainer.tsx';
import Header from '../../components/Header/Header.tsx';
>>>>>>> origin/frontend_jose

const Doom: React.FC = () => {
  return (
    <IonPage>
      {/* Header fijo y transparente */}
      <IonHeader className="header-fixed">
        <Header />
      </IonHeader>
      {/* Contenido scrollable */}
      <IonContent fullscreen>
<<<<<<< HEAD
        <GamePage gameId={1} />
=======
        <DoomContainer />
>>>>>>> origin/frontend_jose
      </IonContent>
    </IonPage>
  );
};

export default Doom;