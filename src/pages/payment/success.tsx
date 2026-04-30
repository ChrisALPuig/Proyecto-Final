import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon
} from '@ionic/react';
import { checkmarkCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header.tsx';
import { useNotification } from '../../contexts/NotificationContext.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import './success.css';

const Success = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();
  const { token } = useAuth();

  useEffect(() => {
    const recordPayment = async () => {
      const orderId = localStorage.getItem('orderId');
      const paymentId = localStorage.getItem('paymentId');
      const paymentPayload = localStorage.getItem('paymentPayload');
      if (!orderId) {
        setLoading(false);
        return;
      }

      const payload = paymentPayload ? JSON.parse(paymentPayload) : {
        orderId,
        paymentId,
      };

      try {
        const res = await fetch(`http://localhost:8080/api/payments/record`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            ...payload,
            paymentId,
            status: 'success',
            stripePaymentId: paymentId,
          }),
        });

        if (!res.ok) {
          console.error('Failed to record payment');
        } else {
          console.log('Payment recorded for order', orderId);
        }
      } catch (err) {
        console.error('Error recording payment:', err);
      } finally {
        setLoading(false);
      }
    };

    recordPayment();
  }, [token]);

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

            {loading ? (
              <p className="success-message">Updating payment status...</p>
            ) : (
              <>
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
              </>
            )}

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Success;
