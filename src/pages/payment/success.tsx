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
import './success.css';

const Success = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

  useEffect(() => {
    const markPaymentAsPaid = async () => {
      const orderId = localStorage.getItem('orderId');
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:8080/api/payments/mark-paid/${orderId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
          console.error('Failed to mark payment as PAID');
        } else {
          console.log('Payment marked as PAID for order', orderId);
          addNotification({
            id: `payment-completed-${orderId}`,
            title: "Pago completado",
            message: "Tu pago se ha completado correctamente.",
            createdAt: new Date().toISOString(),
            read: false,
            link: "/user-orders",
          });
        }
      } catch (err) {
        console.error('Error marking payment as PAID:', err);
      } finally {
        setLoading(false);
      }
    };

    markPaymentAsPaid();
  }, []);

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