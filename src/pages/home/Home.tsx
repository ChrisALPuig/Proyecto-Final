import { IonContent, IonHeader, IonPage } from '@ionic/react';
import Header from '../../components/Header/Header.tsx';
import HomeBien from '../../components/home/home.tsx';

const Home: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <HomeBien />
      </IonContent>
    </IonPage>
  );
};

export default Home;
