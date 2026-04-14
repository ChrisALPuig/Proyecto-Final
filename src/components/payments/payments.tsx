import { IonContent, IonImg } from '@ionic/react';
import { useState } from 'react';
import { useCart } from '../../contexts/useCart.tsx';
import { useLanguage } from '../../contexts/LanguageContext.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import { useNotification } from '../../contexts/NotificationContext.tsx';
import { useHistory } from 'react-router';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './payment.css';

const Payments = () => {
  const { cartItems, clearCart } = useCart();
  const { t } = useLanguage();
  const { token, isAuthenticated } = useAuth();
  const { addNotification } = useNotification();
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const cardElementOptions = {
    style: {
      base: {
        color: '#1f2937',
        fontSize: '16px',
        fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        '::placeholder': { color: '#9ca3af' },
        iconColor: '#6b7280',
      },
      invalid: { color: '#ef4444', iconColor: '#ef4444' },
      complete: { color: '#16a34a' },
    },
    hidePostalCode: true,
  };

  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [formData, setFormData] = useState({
    cardName: '',
    paypalEmail: '',
    bankAccount: '',
    bankCode: '',
    bankHolder: '',
  });
  const [saveCardData, setSaveCardData] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const orderId = localStorage.getItem('orderId');
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const clearCardDetails = async () => {
    const cardElement = elements?.getElement(CardElement);
    if (cardElement && cardElement.clear) {
      cardElement.clear();
    }
    setFormData(prev => ({ ...prev, cardName: '' }));
  };

  const handleSubmit = async () => {
    if (!isAuthenticated || !token) {
      alert('Debes iniciar sesión para completar el pago.');
      history.push('/login');
      return;
    }
    if (!orderId) { alert('No hay pedido creado'); return; }
    if (!paymentMethod) { alert('Selecciona un método de pago'); return; }

    setLoading(true);
    try {
      if (paymentMethod === 'card') {
        const items = cartItems.map(item => ({ price: item.price, quantity: item.quantity }));

        // 1️⃣ Crear PaymentIntent en backend
        const res = await fetch('http://localhost:8080/api/payments/create-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ items, orderId }),
        });

        const data = await res.json();
        if (!data.clientSecret || !data.paymentId) {
          alert('Error creando PaymentIntent: ' + (data.error || 'desconocido'));
          setLoading(false);
          return;
        }

        const clientSecret = data.clientSecret;
        const paymentId = data.paymentId;

        if (!stripe || !elements) { alert('Stripe no está listo'); setLoading(false); return; }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) { alert('CardElement no encontrado'); setLoading(false); return; }

        // 2️⃣ Confirmar pago con Stripe
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: cardElement, billing_details: { name: formData.cardName || 'Cliente' } },
        });

        if (result.error) {
          alert(result.error.message);
        } else if (result.paymentIntent?.status === 'succeeded') {
          // 3️⃣ Actualizar paymentId en backend (opcional)
          await fetch(`http://localhost:8080/api/payments/update/${paymentId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ stripePaymentId: result.paymentIntent.id }),
          });

          if (!saveCardData) {
            await clearCardDetails();
          }

          await clearCart();

          addNotification({
            id: `payment-success-${Date.now()}`,
            title: 'Pago Completado',
            message: `Tu pago de ${total.toFixed(2)}€ ha sido procesado exitosamente.`,
            createdAt: new Date().toISOString(),
            read: false,
            link: '/orders-settings',
          });

          history.push('/success');
        }

      } else if (paymentMethod === 'paypal') {
        if (!formData.paypalEmail) { alert('Ingresa tu email de PayPal'); setLoading(false); return; }
        
        await clearCart();

        addNotification({
          id: `payment-paypal-${Date.now()}`,
          title: 'Pago PayPal Registrado',
          message: `Tu pago de ${total.toFixed(2)}€ vía PayPal ha sido registrado.`,
          createdAt: new Date().toISOString(),
          read: false,
          link: '/orders-settings',
        });
        
        history.push('/success');

      } else if (paymentMethod === 'bank') {
        if (!formData.bankHolder || !formData.bankAccount || !formData.bankCode) {
          alert('Completa todos los datos bancarios'); setLoading(false); return;
        }
        
        await clearCart();

        addNotification({
          id: `payment-bank-${Date.now()}`,
          title: 'Transferencia Bancaria Registrada',
          message: `Tu transferencia de ${total.toFixed(2)}€ ha sido registrada. Ref: ${orderId}`,
          createdAt: new Date().toISOString(),
          read: false,
          link: '/orders-settings',
        });
        
        history.push('/success');
      }

    } catch (err) {
      console.error('Error en el pago:', err);
      alert('Error procesando el pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonContent>
      <div className="payments-page">
        <div className="lista-carrito">
          <div className="item-carrito">
            <div className="circulo-payment">1</div>
            <span className="texto-carrito-payment">{t('yourCart')}</span>
            <div className="circulo2-payment">2</div>
            <span className="texto-carrito2-payment">{t('payment')}</span>
          </div>
        </div>

        <div className="layout-carrito">
          <div className='caja-juego'>
            <div className='payment-section'>
              <h3 className='payment-title'>Choose a Payment Method</h3>

              {/* TARJETA */}
              <button
                className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setPaymentMethod(paymentMethod === 'card' ? '' : 'card')}
              >
                💳 Credit/Debit Card
              </button>
                  {paymentMethod === 'card' && (
                <div className='payment-form card-form'>
                  <input
                    name="cardName"
                    placeholder="Cardholder Name"
                    value={formData.cardName}
                    onChange={handleInputChange}
                  />
                  <div className="stripe-card-element">
                    <CardElement options={cardElementOptions} />
                  </div>
                  <label className="save-card-checkbox">
                    <input
                      type="checkbox"
                      checked={saveCardData}
                      onChange={() => setSaveCardData(prev => !prev)}
                    />
                    Guardar datos de tarjeta para futuros pagos
                  </label>
                </div>
              )}

              {/* PAYPAL */}
              <button
                className={`payment-option ${paymentMethod === 'paypal' ? 'active' : ''}`}
                onClick={() => setPaymentMethod(paymentMethod === 'paypal' ? '' : 'paypal')}
              >
                🅿️ PayPal
              </button>
              {paymentMethod === 'paypal' && (
                <div className='payment-form paypal-form'>
                  <input
                    name="paypalEmail"
                    placeholder="PayPal Email"
                    value={formData.paypalEmail}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              {/* BANK */}
              <button
                className={`payment-option ${paymentMethod === 'bank' ? 'active' : ''}`}
                onClick={() => setPaymentMethod(paymentMethod === 'bank' ? '' : 'bank')}
              >
                🏦 Bank Transfer
              </button>
              {paymentMethod === 'bank' && (
                <div className='payment-form bank-form'>
                  <input name="bankHolder" placeholder="Bank Account Holder" value={formData.bankHolder} onChange={handleInputChange} />
                  <input name="bankAccount" placeholder="IBAN" value={formData.bankAccount} onChange={handleInputChange} />
                  <input name="bankCode" placeholder="BIC/Bank Code" value={formData.bankCode} onChange={handleInputChange} />
                  <p className='payment-info'>Transfer reference: {orderId}</p>
                </div>
              )}
            </div>
          </div>

          {/* RESUMEN */}
          <div className="caja-resumen">
            <h2>Order Summary</h2>

            {cartItems.map(item => (
              <div key={item.id} className='product-preview'>
                <IonImg className="product-preview-img" src={item.image} alt={item.name} />
                <div className='product-preview-info'>
                  <span className='product-preview-name'>{item.name}</span>
                  <span className='product-preview-price'>{(item.price * item.quantity).toFixed(2)}€</span>
                </div>
              </div>
            ))}

            <div className="linea-resumen">
              <span>Total</span>
              <span>{total.toFixed(2)}€</span>
            </div>

            <button className="boton-pago" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </div>

        </div>
      </div>
    </IonContent>
  );
};

export default Payments;