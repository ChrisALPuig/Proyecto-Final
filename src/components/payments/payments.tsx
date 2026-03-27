import { IonContent, IonImg } from '@ionic/react';
import { useState } from 'react';
import { useCart } from '../../contexts/useCart.tsx';
import { useHistory } from 'react-router';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './payment.css';

const Payments = () => {
  const { cartItems } = useCart();
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [formData, setFormData] = useState({
    cardName: '',
    paypalEmail: '',
    bankAccount: '',
    bankCode: '',
    bankHolder: '',
  });
  const [loading, setLoading] = useState(false);

  const orderId = localStorage.getItem('orderId');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal;

 const handleSubmit = async () => {
  if (!orderId) {
    alert('No hay pedido creado');
    return;
  }

  if (!paymentMethod) {
    alert('Selecciona un método de pago');
    return;
  }

  setLoading(true);

  try {
    if (paymentMethod === 'card') {
      // Preparar items para backend
      const items = cartItems.map(item => ({
        price: item.price,
        quantity: item.quantity,
      }));

      // 1️⃣ Crear PaymentIntent en backend
      const res = await fetch('http://localhost:8080/api/payments/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (!data.clientSecret) {
        alert('Error creando PaymentIntent: ' + (data.error || 'desconocido'));
        setLoading(false);
        return;
      }

      const clientSecret = data.clientSecret;
      const paymentId = data.paymentId; // <-- Asegúrate de que tu backend devuelva también paymentId

      // 2️⃣ Confirmar pago con Stripe
      if (!stripe || !elements) {
        alert('Stripe no está listo');
        setLoading(false);
        return;
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        alert('CardElement no encontrado');
        setLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: formData.cardName || 'Cliente' },
        },
      });

      if (result.error) {
        alert(result.error.message);
      } else if (result.paymentIntent?.status === 'succeeded') {
        // 3️⃣ Actualizar registro Payment en backend
        await fetch(`http://localhost:8080/api/payments/update/${paymentId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: 'success',
            stripePaymentId: result.paymentIntent.id,
          }),
        });

        // 4️⃣ Redirigir al éxito
        history.push('/success');
      }
    } else if (paymentMethod === 'paypal') {
      alert('PayPal aún no implementado');
    } else if (paymentMethod === 'bank') {
      alert('Transferencia bancaria registrada (simulado)');
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
      <div className="lista-carrito">
        <div className="item-carrito">
          <div className="circulo-payment">1</div>
          <span className="texto-carrito-payment">Your Cart</span>
          <div className="circulo2-payment">2</div>
          <span className="texto-carrito2-payment">Payment</span>
        </div>
      </div>

      <div className="layout-carrito">

        {/* MÉTODOS DE PAGO */}
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
                  <CardElement />
                </div>
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
    </IonContent>
  );
};

export default Payments;