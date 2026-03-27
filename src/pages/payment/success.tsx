import {
    IonPage,
    IonContent,
    IonButton,
    IonIcon
  } from '@ionic/react';
  import { checkmarkCircleOutline } from 'ionicons/icons';
  import { useHistory } from 'react-router-dom';
  import Header from '../../components/Header/Header.tsx';
  import './success.css';
  
  const Success = () => {
  
    const history = useHistory();
  
    return (
      <IonPage>
        <Header />
        <IonContent className="success-content" fullscreen>
            <div className="success-wrapper">
                <div className="success-container">
  
            <IonIcon 
              icon={checkmarkCircleOutline} 
              className="success-icon"
            />
  
            <h1 className="success-title">
              Payment Completed Successfully!
            </h1>
  
            <p className="success-message">
              Thank you for your purchase.
            </p>
  
            <p className="success-submessage">
              Your product will be delivered shortly.
              You will receive a confirmation email with all the details.
            </p>
  
            <IonButton 
              expand="block"
              className="success-button"
              onClick={() => history.push('/home')}
            >
              Back to Home
            </IonButton>
  
          </div>
          </div>
  
        </IonContent>
      </IonPage>
    );
  };
  
  export default Success;