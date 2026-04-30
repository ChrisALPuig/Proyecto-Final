
import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonAvatar, IonIcon, IonText, IonSpinner } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { person } from 'ionicons/icons';
import Header from '../components/Header/Header.tsx';
import { useAuth } from '../contexts/AuthContext.tsx';
import { useWishlist } from "../contexts/useWishlist.ts";
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { getUserProfile } from '../services/userService.ts';
import OrderSettings from '../components/support/Order&Settings.tsx';
import './UserProfile.css';

// Lazy load for performance
const UserOrders = React.lazy(() => import('./orders/UserOrders'));
const MyTickets = React.lazy(() => import('./support/MyTickets'));

interface Payment {
  id: number;
  paymentId: string;
  productName: string;
  orderId: string;
  amount: number | string;
  status: string;
  createdAt: string;
  gameImage?: string;
  items?: string;
}

const UserProfile: React.FC = () => {
  const history = useHistory();
  const { token, avatar, setAvatar } = useAuth();
  const { wishlistItems, wishlistCount } = useWishlist();
  const { language, t } = useLanguage();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [openTicketsCount, setOpenTicketsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'general' | 'edit' | 'orders'>('general');

  useEffect(() => {
    const loadUserData = async () => {
      if (!token) return;
      try {
        const profile = await getUserProfile(token);
        setUserProfile(profile);
        if (profile.avatar && !avatar) {
          setAvatar(profile.avatar);
        }
        // Load all orders
        const ordersResponse = await fetch('http://localhost:8080/api/payments/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (ordersResponse.ok) {
          const orders = await ordersResponse.json();
          setAllOrders(orders);
          setTotalOrders(orders.length);
        }
        // Load open tickets
        const ticketsResponse = await fetch('http://localhost:8080/api/tickets/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (ticketsResponse.ok) {
          const tickets = await ticketsResponse.json();
          const openTickets = Array.isArray(tickets) ? tickets.filter((ticket: any) => ticket.status !== 'closed' && ticket.status !== 'CLOSED').length : 0;
          setOpenTicketsCount(openTickets);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, [token, avatar, setAvatar]);

  useEffect(() => {
    if (activeTab === 'general' && token && !loading) {
      // Recargar perfil automáticamente cuando se selecciona la pestaña general
      const reloadProfile = async () => {
        try {
          const profile = await getUserProfile(token);
          setUserProfile(profile);
          if (profile.avatar && !avatar) {
            setAvatar(profile.avatar);
          }
        } catch (error) {
          console.error('Error reloading user profile:', error);
        }
      };
      reloadProfile();
    }
  }, [activeTab, token, avatar, setAvatar, loading]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;
      try {
        const ordersResponse = await fetch('http://localhost:8080/api/payments/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (ordersResponse.ok) {
          const orders = await ordersResponse.json();
          setAllOrders(orders);
          setTotalOrders(orders.length);
        }
      } catch (error) {
        console.error('Error reloading orders:', error);
      }
    };

    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab, token]);

  if (loading) {
    return (
      <IonPage>
        <Header />
        <IonContent className="ion-padding user-profile-content">
          <div className="loading-container">
            <IonSpinner name="crescent" />
            <IonText>{t('loading') || 'Loading...'}</IonText>
          </div>
        </IonContent>
      </IonPage>
    );
  }


  const profileTabs = [
    { key: 'general', label: t('generalView') || 'Vista general' },
    { key: 'edit', label: t('editProfile') || 'Editar perfil' },
    { key: 'orders', label: t('purchaseHistory') || 'Historial de compra' },
  ];

  // Usar la fecha de creación de la cuenta según el idioma seleccionado
  const formattedSince = userProfile?.createdAt
    ? new Date(userProfile.createdAt).toLocaleDateString(
        language === 'Español' ? 'es-ES' : 'en-US',
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }
      )
    : '---';


  return (
    <IonPage>
      <Header />
      <IonContent className="user-profile-content">
        <div className="profile-wrap">
          <section className="profile-hero">
            <div className="profile-hero-top">
              <IonAvatar className="hero-avatar">
                {avatar ? (
                  <img src={avatar} alt="Profile" />
                ) : (
                  <div className="avatar-placeholder">
                    <IonIcon icon={person} size="large" />
                  </div>
                )}
              </IonAvatar>
              <div className="hero-info">
                <h1>{userProfile?.username || 'User'}</h1>
                <p className="hero-subtitle">{userProfile?.email}</p>
                <div className="hero-meta">
                  <span>{t('memberSince') || 'Miembro desde:'} {formattedSince}</span>
                  <span>{userProfile?.country || 'Global'}</span>
                </div>
              </div>
            </div>

            {/* Pestañas */}
            <div className="profile-tabs">
              {profileTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  className={`profile-tab${activeTab === tab.key ? ' active' : ''}`}
                  onClick={() => setActiveTab(tab.key as any)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </section>

          {/* Contenido de la pestaña activa */}
          <div className="profile-tab-content">
            {activeTab === 'general' && (
              <div className="profile-card-grid">
                <div className="profile-card">
                  <div className="profile-card-header">
                    <IonIcon icon={person} />
                    {t('generalView') || 'Vista general'}
                  </div>
                  <div className="profile-card-content">
                    <div className="general-stats">
                      <div>
                        <span>{wishlistCount}</span>
                        <p>{t('wishlist') || 'Wishlist'}</p>
                      </div>
                      <div>
                        <span>{totalOrders}</span>
                        <p>{t('orders') || 'Pedidos'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="profile-card">
                  <div className="profile-card-header">
                    {t('Recent Orders') || 'Pedidos Totales'}
                  </div>
                  <div className="profile-card-content">
                    <div className="recent-orders">
                      {allOrders.length > 0 ? (
                        allOrders.slice(0, 3).map((order: Payment) => (
                          <div key={order.id} className="order-item-card">
                            {order.gameImage ? (
                              <img src={order.gameImage} alt={order.productName} className="order-item-image" />
                            ) : (
                              <div className="order-item-placeholder">{order.productName?.charAt(0) || '?'}</div>
                            )}
                            <div className="order-item-info">
                              <p className="order-item-name">{order.productName}</p>
                              <p className="order-item-id">{order.orderId}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>{t('noRecentOrders') || 'No hay pedidos recientes'}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="profile-card">
                  <div className="profile-card-header">
                    {t('supportTickets') || 'Tickets de Soporte'}
                  </div>
                  <div className="profile-card-content">
                    <div className="support-tickets-section">
                      <div className="tickets-count">
                        <span>{openTicketsCount}</span>
                        <p>{t('openTickets') || 'Tickets abiertos'}</p>
                      </div>
                      <button
                        type="button"
                        className="button-primary"
                        onClick={() => history.push('/my-tickets')}
                        style={{ marginTop: '12px' }}
                      >
                        {t('viewTickets') || 'Ver Tickets'}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="profile-card profile-card-details">
                  <div className="profile-card-header">
                    {t('userDetails') || 'Detalles del Usuario'}
                  </div>
                  <div className="profile-card-content">
                    <div className="user-details">
                      <p><strong>{t('phone') || 'Teléfono'}:</strong> {userProfile?.phoneNumber || '---'}</p>
                      <p><strong>{t('birthDate') || 'Fecha de Nacimiento'}:</strong> {userProfile?.birthDate ? new Date(userProfile.birthDate).toLocaleDateString(language === 'Español' ? 'es-ES' : 'en-US') : '---'}</p>
                      <p><strong>{t('currency') || 'Moneda'}:</strong> {userProfile?.currency || '---'}</p>
                      <p><strong>{t('language') || 'Idioma'}:</strong> {userProfile?.language || '---'}</p>
                    </div>
                    <button
                      type="button"
                      className="button-edit-profile"
                      onClick={() => setActiveTab('edit')}
                    >
                      {t('editProfile') || 'Editar perfil'}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'edit' && (
              <div style={{ marginTop: 24 }}>
                <OrderSettings showOnlySection="accountAndLocale" />
              </div>
            )}
            {activeTab === 'orders' && (
              <div style={{ marginTop: 24 }}>
                <OrderSettings showOnlySection="ordersHistory" initialPayments={allOrders} initialLoading={loading} />
              </div>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;