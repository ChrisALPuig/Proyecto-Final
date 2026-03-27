import { IonContent, IonHeader, IonPage } from '@ionic/react';
import Header from '../../components/Header/Header.tsx';
import StoreComponent from '../../components/store/storeComponent.tsx';

const Store: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader className="header-fixed">
        <Header />
        </IonHeader>
        <StoreComponent />
      </IonContent>
    </IonPage>
  );
};

export default Store;
