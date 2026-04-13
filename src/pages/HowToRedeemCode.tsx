import { IonContent, IonPage } from '@ionic/react';
import HowToPayComponent from './support/HowToPay.tsx';

const HowToRedeemCodePage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <HowToPayComponent />
      </IonContent>
    </IonPage>
  );
};

export default HowToRedeemCodePage;