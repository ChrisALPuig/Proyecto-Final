import { IonContent, IonImg, IonRouterLink } from '@ionic/react';
import { useState } from 'react';
import './payment.css';

const Payments = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    paypalEmail: '',
    bankAccount: '',
    bankCode: '',
    bankHolder: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>

  {/* PASOS */}
  <div className="lista-carrito">
    <div className="item-carrito">
      <div className="circulo-payment">1</div>
      <span className="texto-carrito-payment">Your Cart</span>
      <div className="circulo2-payment">2</div>
      <span className="texto-carrito2-payment">Payment</span>
    </div>
  </div>

  {/* CONTENEDOR PRINCIPAL */}
  <div className="layout-carrito">

    {/* CAJA IZQUIERDA (MÉTODOS DE PAGO) */}
    <div className='caja-juego'>
      {/* SELECTOR DE MÉTODOS DE PAGO */}
      <div className='payment-section'>
        <h3 className='payment-title'>Choose a Payment Method</h3>
        
        {/* OPCIÓN 1: TARJETA DE CRÉDITO */}
        <button 
          className={`payment-option ${paymentMethod === 'card' ? 'active' : ''}`}
          onClick={() => setPaymentMethod(paymentMethod === 'card' ? '' : 'card')}
        >
          💳 Credit/Debit Card
        </button>
        
        {paymentMethod === 'card' && (
          <div className='payment-form card-form'>
            <div className='form-group'>
              <label>Cardholder Name</label>
              <input 
                type='text'
                name='cardName'
                placeholder='John Doe'
                value={formData.cardName}
                onChange={handleInputChange}
              />
            </div>

            <div className='form-group'>
              <label>Card Number</label>
              <input 
                type='text'
                name='cardNumber'
                placeholder='1234 5678 9012 3456'
                value={formData.cardNumber}
                onChange={handleInputChange}
                maxLength={19}
              />
            </div>

            <div className='form-row'>
              <div className='form-group'>
                <label>Expiry Date</label>
                <input 
                  type='text'
                  name='cardExpiry'
                  placeholder='MM/YY'
                  value={formData.cardExpiry}
                  onChange={handleInputChange}
                  maxLength={5}
                />
              </div>
              <div className='form-group'>
                <label>CVV</label>
                <input 
                  type='text'
                  name='cardCVV'
                  placeholder='123'
                  value={formData.cardCVV}
                  onChange={handleInputChange}
                  maxLength={4}
                />
              </div>
            </div>
          </div>
        )}

        {/* OPCIÓN 2: PAYPAL */}
        <button 
          className={`payment-option ${paymentMethod === 'paypal' ? 'active' : ''}`}
          onClick={() => setPaymentMethod(paymentMethod === 'paypal' ? '' : 'paypal')}
        >
          🅿️ PayPal
        </button>
        
        {paymentMethod === 'paypal' && (
          <div className='payment-form paypal-form'>
            <div className='form-group'>
              <label>PayPal Email</label>
              <input 
                type='email'
                name='paypalEmail'
                placeholder='your-email@paypal.com'
                value={formData.paypalEmail}
                onChange={handleInputChange}
              />
            </div>
            <p className='payment-info'>You will be redirected to PayPal to complete your payment securely.</p>
          </div>
        )}

        {/* OPCIÓN 3: TRANSFERENCIA BANCARIA */}
        <button 
          className={`payment-option ${paymentMethod === 'bank' ? 'active' : ''}`}
          onClick={() => setPaymentMethod(paymentMethod === 'bank' ? '' : 'bank')}
        >
          🏦 Bank Transfer
        </button>
        
        {paymentMethod === 'bank' && (
          <div className='payment-form bank-form'>
            <div className='form-group'>
              <label>Bank Account Holder</label>
              <input 
                type='text'
                name='bankHolder'
                placeholder='Full Name'
                value={formData.bankHolder}
                onChange={handleInputChange}
              />
            </div>

            <div className='form-group'>
              <label>IBAN</label>
              <input 
                type='text'
                name='bankAccount'
                placeholder='ES9121000418450200051332'
                value={formData.bankAccount}
                onChange={handleInputChange}
              />
            </div>

            <div className='form-group'>
              <label>Bank Code (BIC)</label>
              <input 
                type='text'
                name='bankCode'
                placeholder='BBVAESMMXXX'
                value={formData.bankCode}
                onChange={handleInputChange}
              />
            </div>

            <p className='payment-info'>Transfer reference: ORDER-{Date.now()}</p>
          </div>
        )}
      </div>
    </div>

    {/* CAJA DERECHA (RESUMEN) */}
    <div className="caja-resumen">
      <h2>Order Summary</h2>

      {/* PRODUCTO A COMPRAR (PEQUEÑO) */}
      <div className='product-preview'>
        <img className="product-preview-img" src="/assets/images/doom.png" />
        <div className='product-preview-info'>
          <span className='product-preview-name'>Doom (2016)</span>
          <span className='product-preview-price'>19.99€</span>
        </div>
      </div>

      <div className="linea-resumen">
        <span>Subtotal</span>
        <span>19.99€</span>
      </div>

      <div className="linea-resumen total">
        <span>Total</span>
        <span>19.99€</span>
      </div>

      <IonRouterLink routerLink="/success">
        <button className="boton-pago">Checkout Order Now</button>
      </IonRouterLink>
    </div>

  </div>

   {/* BOTÓN VOLVER HOME */}
    <IonRouterLink routerLink="/carrito-juego">
    <button className="boton-home">← Back to cart</button>
    </IonRouterLink>
</>

  );
};

export default Payments;