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

      // Parsear el payload con todos los datos del pedido
      let payload: any = {
        orderId,
        paymentId,
        status: 'success',
        stripePaymentId: paymentId,
      };

      if (paymentPayload) {
        try {
          const parsedPayload = JSON.parse(paymentPayload);
          // Asegurar que todos los campos están incluidos
          payload = {
            ...parsedPayload,
            paymentId,
            status: 'success',
            stripePaymentId: paymentId,
          };
        } catch (e) {
          console.error('Error parsing payment payload:', e);
        }
      }

      try {
        const res = await fetch(`http://localhost:8080/api/payments/record`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          console.error('Failed to record payment', res.status);
        } else {
          console.log('Payment recorded for order', orderId);
          // Limpiar localStorage después de guardar exitosamente
          localStorage.removeItem('paymentPayload');
          localStorage.removeItem('paymentId');
          localStorage.removeItem('orderId');
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
