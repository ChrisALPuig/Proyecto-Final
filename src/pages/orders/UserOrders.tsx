import { IonContent, IonPage, IonText } from '@ionic/react';
import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import './UserOrders.css';

interface Payment {
  id: number;
  paymentId: string;
  productName: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: string;
}

const UserOrders: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/payments/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setPayments(data);
        } else {
          console.error('Failed to fetch payments');
        }
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPayments();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <Header />
        <div className="user-orders-container">
          <h1>My Orders & Payments</h1>
          {loading ? (
            <p>Loading...</p>
          ) : payments.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div className="orders-list">
              {payments.map((payment) => (
                <div key={payment.id} className="order-card">
                  <div className="order-header">
                    <IonText className="order-id">Order ID: {payment.orderId}</IonText>
                    <IonText className={`order-status ${payment.status}`}>
                      {payment.status}
                    </IonText>
                  </div>
                  <div className="order-details">
                    <p><strong>Product:</strong> {payment.productName}</p>
                    <p><strong>Amount:</strong> €{payment.amount.toFixed(2)}</p>
                    <p><strong>Date:</strong> {new Date(payment.createdAt).toLocaleDateString()}</p>
                    <p><strong>Payment ID:</strong> {payment.paymentId}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserOrders;