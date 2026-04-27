
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
  const { t } = useLanguage();
  const [userProfile, setUserProfile] = useState<any>(null);

  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'general' | 'edit' | 'orders' | 'tickets'>('general');

  useEffect(() => {
    const loadUserData = async () => {
      if (!token) return;
      try {
        const profile = await getUserProfile(token);
        setUserProfile(profile);
        if (profile.avatar && !avatar) {
          setAvatar(profile.avatar);
        }
        // Load recent orders (for general tab)
        const ordersResponse = await fetch('http://localhost:8080/api/payments/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (ordersResponse.ok) {
          const orders = await ordersResponse.json();
          setRecentOrders(orders.slice(0, 3));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, [token, avatar, setAvatar]);

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
    { key: 'tickets', label: t('supportTickets') || 'Soporte/Tickets' },
  ];

  // Usar la fecha de creación de la cuenta
  const formattedSince = userProfile?.createdAt
    ? new Date(userProfile.createdAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
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
                  <span>{t('level') || 'Nivel'} 30</span>
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
                <div className="profile-card profile-card-wide">
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
                        <span>{recentOrders.length}</span>
                        <p>{t('games') || 'Juegos'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'edit' && (
              <div style={{ marginTop: 24 }}>
                <OrderSettings />
              </div>
            )}
            {activeTab === 'orders' && (
              <React.Suspense fallback={<div style={{ padding: 32, textAlign: 'center' }}><IonSpinner name="crescent" /> {t('loading') || 'Cargando...'}</div>}>
                <UserOrders />
              </React.Suspense>
            )}
            {activeTab === 'tickets' && (
              <React.Suspense fallback={<div style={{ padding: 32, textAlign: 'center' }}><IonSpinner name="crescent" /> {t('loading') || 'Cargando...'}</div>}>
                <MyTickets />
              </React.Suspense>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;