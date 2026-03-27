import { IonContent, IonPage } from '@ionic/react';
import Header from '../../components/Header/Header.tsx';
import HomeBien from '../../components/home/home.tsx';
import Login from '../../components/auth/login.tsx';

const SignIn: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Login />
        <Header />
        <HomeBien />
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
