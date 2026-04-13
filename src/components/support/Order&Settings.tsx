import { IonRouterLink } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.tsx";
import { useLanguage } from "../../contexts/LanguageContext.tsx";
import {
  CreditCard,
  User,
  Star,
  Shield,
  Lock,
  Mail,
  Tag,
  MessageCircle,
  Trash2,
  Search,
} from "lucide-react";
import { getUserProfile, updateUserProfile, UserProfile, changeEmail, changePassword, deleteAccount, DeleteAccountRequest } from "../../services/userService.ts";
import "./OrderSettings.css";
import "./DeleteAccount.css";

interface Payment {
  id: number;
  paymentId: string;
  productName: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: string;
  gameImage?: string;
  items?: string;
}

const defaultProfile = {
  id: 0,
  username: "",
  email: "",
  phoneNumber: "",
  birthDate: "",
  country: "Spain",
  currency: "Euro (EUR)",
  language: "English",
};

const OrderSettings: React.FC = () => {
  const { token, isAuthenticated, roles, login, logout, setAvatar } = useAuth();
  const { setLanguage, t } = useLanguage();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [accountForm, setAccountForm] = useState({
    username: "",
    avatar: "",
    phoneNumber: "",
    birthDate: "",
    country: "Spain",
    currency: "Euro (EUR)",
    language: "English",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("ordersHistory");
  const [message, setMessage] = useState("");
  const [expandedOrders, setExpandedOrders] = useState<Record<number, boolean>>({});

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };
  
  // Email/Password change modals
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [emailForm, setEmailForm] = useState({ currentPassword: "", newEmail: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSavingEmail, setIsSavingEmail] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  
  // Delete account
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletionPassword, setDeletionPassword] = useState("");
  const [deletionError, setDeletionError] = useState("");
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/payments/user", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPayments(data);
        } else {
          console.error("Failed to fetch payments", response.status);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    };

    const normalizeLanguageValue = (value: string) => {
      if (value === "Spanish" || value === "Español") return "Español";
      return "English";
    };

    const fetchProfile = async () => {
      if (!token) {
        setProfileLoading(false);
        return;
      }

      try {
        const profileData = await getUserProfile(token);
        setProfile(profileData);
        setAvatarPreview(profileData.avatar || "");
        const languageValue = normalizeLanguageValue(profileData.language || "English");
        setAccountForm({
          username: profileData.username || "",
          avatar: profileData.avatar || "",
          phoneNumber: profileData.phoneNumber || "",
          birthDate: profileData.birthDate || "",
          country: profileData.country || "Spain",
          currency: profileData.currency || "Euro (EUR)",
          language: languageValue,
        });
        setLanguage(languageValue);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchPayments();
    fetchProfile();
  }, [token]);

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const nextValue = name === "language"
      ? value === "Spanish" || value === "Español"
        ? "Español"
        : "English"
      : value;

    setAccountForm((prev) => ({ ...prev, [name]: nextValue }));

    if (name === "language") {
      setLanguage(nextValue);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setAvatarPreview(result);
      setAccountForm((prev) => ({ ...prev, avatar: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleProfileSave = async () => {
    if (!token) return;

    setProfileSaving(true);
    setMessage("");

    try {
      const updatePayload = {
        username: accountForm.username,
        phoneNumber: accountForm.phoneNumber,
        birthDate: accountForm.birthDate,
        country: accountForm.country,
        currency: accountForm.currency,
        language: accountForm.language,
        ...(accountForm.avatar ? { avatar: accountForm.avatar } : {}),
      };

      const updated = await updateUserProfile(token, updatePayload);
      setProfile(updated);
      setAccountForm((prev) => ({ ...prev, username: updated.username, avatar: updated.avatar || prev.avatar }));
      setAvatarPreview(updated.avatar || avatarPreview);

      if (updated.avatar) {
        setAvatar(updated.avatar);
      }

      if (updated.token) {
        login(updated.token, updated.username, roles, updated.avatar || null);
      }

      setMessage("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to save changes. Please try again.");
    } finally {
      setProfileSaving(false);
    }
  };

  const handleChangeEmail = async () => {
    if (!token) return;

    setEmailError("");
    setIsSavingEmail(true);

    try {
      const updated = await changeEmail(token, emailForm);
      setProfile(updated);
      setShowEmailModal(false);
      setEmailForm({ currentPassword: "", newEmail: "" });
      setMessage("Email changed successfully.");
      setTimeout(() => setMessage(""), 3000);
    } catch (error: any) {
      setEmailError(error.message || "Failed to change email");
    } finally {
      setIsSavingEmail(false);
    }
  };

  const handleChangePassword = async () => {
    if (!token) return;

    setPasswordError("");
    setIsSavingPassword(true);

    try {
      await changePassword(token, passwordForm);
      setShowPasswordModal(false);
      setPasswordForm({ currentPassword: "", newPassword: "" });
      setMessage("Password changed successfully.");
      setTimeout(() => setMessage(""), 3000);
    } catch (error: any) {
      setPasswordError(error.message || "Failed to change password");
    } finally {
      setIsSavingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!token) return;

    setDeletionError("");
    setIsDeletingAccount(true);

    try {
      const data: DeleteAccountRequest = { password: deletionPassword };
      await deleteAccount(token, data);

      setShowDeleteModal(false);
      setDeletionPassword("");
      setMessage("Account deleted successfully.");
      
      // Cerrar sesión después de eliminar la cuenta
      logout();
      
      // Redirigir a la página principal después de un breve delay
      setTimeout(() => {
        window.location.href = '/home';
      }, 1000);
    } catch (error: any) {
      setDeletionError(error.message || "Failed to delete account");
    } finally {
      setIsDeletingAccount(false);
    }
  };

  const filteredPayments = payments.filter((payment) =>
    payment.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.orderId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const menuItems = [
    { key: "ordersHistory", icon: CreditCard },
    { key: "accountAndLocale", icon: User },
    { key: "loginAndSecurity", icon: Lock },
    { key: "deleteAccount", icon: Trash2 },
  ];

  return (
    <div className="orders-settings-page">
      <div className="orders-settings-wrapper">
        <aside className="orders-sidebar">
          <span className="sidebar-title">{t("ordersHistory")}</span>
          <nav className="sidebar-menu">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  type="button"
                  className={`sidebar-item ${item.key === activeSection ? "active" : ""}`}
                  onClick={() => {
                    setActiveSection(item.key);
                    setMessage("");
                  }}
                >
                  <Icon className="sidebar-icon" />
                  <span>{t(item.key)}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="orders-panel">
          <div className="panel-topbar">
            <div className="panel-heading">
              <span className="panel-label">{t(activeSection)}</span>
              <h2 className="panel-title">{t(activeSection)}</h2>
            </div>
          </div>

          {activeSection === "ordersHistory" ? (
            <div className="orders-list">
              {loading ? (
                <div className="orders-empty">{t("loadingPayments")}</div>
              ) : !isAuthenticated ? (
                <div className="orders-empty">
                  <p>{t("signInToViewPayments")}</p>
                  <IonRouterLink routerLink="/login" className="login-link">
                    {t("signIn")}
                  </IonRouterLink>
                </div>
              ) : filteredPayments.length === 0 ? (
                <div className="orders-empty">{t("noPaymentsFound")}</div>
              ) : (
                filteredPayments.map((payment) => {
                  let paymentItems: { id: number; name: string; quantity: number; price: number; image: string; }[] = [];
                  if (payment.items) {
                    try {
                      paymentItems = JSON.parse(payment.items);
                    } catch (error) {
                      console.error('Error parsing order items:', error);
                    }
                  }

                  return (
                    <article key={payment.id} className="order-card">
                      <div className="order-card-header">
                        <div className="order-card-header-left">
                          <p className="order-number">ORDER #{payment.orderId}</p>
                          <span className="order-date">{new Date(payment.createdAt).toLocaleDateString()}</span>
                        </div>
                        <span className="order-price">€{Number(payment.amount).toFixed(2)}</span>
                      </div>

                      <div className="order-card-body">
                        <div className="order-thumb">{payment.productName?.charAt(0) || "#"}</div>
                        <div className="order-details">
                          <p className="order-product">{payment.productName}</p>
                          <div className="order-meta">
                            <span className="order-subtitle">{payment.status}</span>
                            <span className="order-amount-tag">{payment.paymentId}</span>
                          </div>
                        </div>
                      </div>

                      <button type="button" className="order-details-btn" onClick={() => toggleOrderDetails(payment.id)}>
                        {expandedOrders[payment.id] ? 'Ocultar detalles' : 'Ver detalles'}
                      </button>

                      {expandedOrders[payment.id] && (
                        <div className="order-items-details">
                          <h4>Items comprados:</h4>
                          {paymentItems.length > 0 ? (
                            paymentItems.map((item) => (
                              <div key={item.id} className="order-item-row">
                                <img src={item.image} alt={item.name} className="order-item-image" />
                                <div className="order-item-info">
                                  <p className="order-item-name">{item.name}</p>
                                  <p className="order-item-qty">Cantidad: {item.quantity}</p>
                                </div>
                                <span className="order-item-price">€{Number(item.price).toFixed(2)}</span>
                              </div>
                            ))
                          ) : (
                            <p className="order-item-empty">No se encontraron los productos de esta orden.</p>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })
              )}
            </div>
          ) : activeSection === "accountAndLocale" ? (
            <div className="account-content">
              <div className="account-section">
                <h3>{t("myIdentity")}</h3>
                {profileLoading ? (
                  <div className="orders-empty">{t("loadingProfile")}</div>
                ) : (
                  <>
                    <div className="account-row">
                      <span>{t("avatar")}</span>
                      <div className="account-avatar">
                        {avatarPreview ? (
                          <img src={avatarPreview} alt="avatar" className="account-avatar-img" />
                        ) : (
                          <User className="sidebar-icon" />
                        )}
                      </div>
                      <div>
                        <button
                          className="button-secondary"
                          type="button"
                          onClick={() => avatarInputRef.current?.click()}
                        >
                          {t("change")}
                        </button>
                        <input
                          type="file"
                          accept="image/*"
                          ref={avatarInputRef}
                          onChange={handleAvatarChange}
                          hidden
                        />
                      </div>
                    </div>
                    <div className="account-row">
                      <span>{t("username")}</span>
                      <input
                        name="username"
                        value={accountForm.username}
                        onChange={handleAccountChange}
                        className="account-input"
                        placeholder={t("yourUsername")}
                      />
                      <div />
                    </div>
                    <div className="account-row">
                      <span>{t("phoneNumber")}</span>
                      <input
                        name="phoneNumber"
                        value={accountForm.phoneNumber}
                        onChange={handleAccountChange}
                        className="account-input"
                        placeholder={t("addPhoneNumber")}
                      />
                      <button className="button-primary">{t("add")}</button>
                    </div>
                    <div className="account-row">
                      <span>{t("birthday")}</span>
                      <input
                        name="birthDate"
                        type="date"
                        value={accountForm.birthDate}
                        onChange={handleAccountChange}
                        className="account-input"
                      />
                    </div>
                    <div className="account-row">
                      <span>{t("location")}</span>
                      <select
                        name="country"
                        value={accountForm.country}
                        onChange={handleAccountChange}
                        className="account-select"
                      >
                        <option>Spain</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>France</option>
                        <option>Germany</option>
                      </select>
                    </div>
                  </>
                )}
              </div>

              <div className="account-section">
                <h3>{t("locale")}</h3>
                <div className="account-row">
                  <span>{t("currency")}</span>
                  <select
                    name="currency"
                    value={accountForm.currency}
                    onChange={handleAccountChange}
                    className="account-select"
                  >
                    <option>Euro (EUR)</option>
                    <option>US Dollar (USD)</option>
                    <option>British Pound (GBP)</option>
                    <option>Japanese Yen (JPY)</option>
                  </select>
                </div>
                <div className="account-row">
                  <span>{t("language")}</span>
                  <select
                    name="language"
                    value={accountForm.language}
                    onChange={handleAccountChange}
                    className="account-select"
                  >
                    <option>English</option>
                    <option>Español</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </div>

              <div className="account-footer">
                {message && <div className="account-message">{message}</div>}
                <button
                  onClick={handleProfileSave}
                  className="button-primary"
                  disabled={profileSaving || profileLoading || !isAuthenticated}
                >
                  {profileSaving ? t("saving") : t("saveChanges")}
                </button>
              </div>
            </div>
          ) : activeSection === "loginAndSecurity" ? (
            <div className="account-content">
              <div className="account-section login-security-card">
                <div className="login-card-header">
                  <h3>{t("accountLogin")}</h3>
                </div>
                {profileLoading ? (
                  <div className="orders-empty">{t("loadingProfile")}</div>
                ) : (
                  <>
                    <div className="login-row">
                      <span>{t("email")}</span>
                      <span className="login-value">{profile?.email || "-"}</span>
                      <button 
                        className="button-secondary"
                        onClick={() => {
                          setEmailForm({ currentPassword: "", newEmail: profile?.email || "" });
                          setEmailError("");
                          setShowEmailModal(true);
                        }}
                      >
                        {t("change")}
                      </button>
                    </div>
                    <div className="login-row">
                      <span>{t("password")}</span>
                      <span className="login-value">••••••••••••••••</span>
                      <button 
                        className="button-secondary"
                        onClick={() => {
                          setPasswordForm({ currentPassword: "", newPassword: "" });
                          setPasswordError("");
                          setShowPasswordModal(true);
                        }}
                      >
                        {t("change")}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>          ) : activeSection === "deleteAccount" ? (
            <div className="account-content">
              <div className="delete-account-card">
                <h3>{t("confirmAccountDeletion")}</h3>
                <div className="delete-account-text">
                  <p>{t("thisActionCannotBeUndone")}</p>
                </div>
                <button 
                  className="button-danger"
                  onClick={() => {
                    setDeletionPassword("");
                    setDeletionError("");
                    setShowDeleteModal(true);
                  }}
                >
                  {t("deleteAccountButton")}
                </button>
              </div>
            </div>
          ) : (
            <div className="orders-empty">This section is not available yet.</div>
          )}
        </section>
      </div>

      {/* Modal de cambio de email */}
      {showEmailModal && (
        <div className="modal-overlay" onClick={() => setShowEmailModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{t("changeEmail")}</h3>
            {emailError && <div className="modal-error">{emailError}</div>}
            <div className="modal-form-group">
              <label>{t("currentPassword")}</label>
              <input
                type="password"
                placeholder={t("enterCurrentPassword")}
                value={emailForm.currentPassword}
                onChange={(e) => setEmailForm({ ...emailForm, currentPassword: e.target.value })}
                className="modal-input"
              />
            </div>
            <div className="modal-form-group">
              <label>{t("newEmail")}</label>
              <input
                type="email"
                placeholder={t("enterNewEmail")}
                value={emailForm.newEmail}
                onChange={(e) => setEmailForm({ ...emailForm, newEmail: e.target.value })}
                className="modal-input"
              />
            </div>
            <div className="modal-buttons">
              <button 
                className="button-secondary"
                onClick={() => setShowEmailModal(false)}
              >
                {t("cancel")}
              </button>
              <button 
                className="button-primary"
                onClick={handleChangeEmail}
                disabled={isSavingEmail || !emailForm.currentPassword || !emailForm.newEmail}
              >
                {isSavingEmail ? t("saving") : t("changeEmailButton")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de cambio de contraseña */}
      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{t("changePassword")}</h3>
            {passwordError && <div className="modal-error">{passwordError}</div>}
            <div className="modal-form-group">
              <label>{t("currentPassword")}</label>
              <input
                type="password"
                placeholder={t("enterCurrentPassword")}
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                className="modal-input"
              />
            </div>
            <div className="modal-form-group">
              <label>{t("newPassword")}</label>
              <input
                type="password"
                placeholder={t("enterNewPassword")}
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="modal-input"
              />
            </div>
            <div className="modal-buttons">
              <button 
                className="button-secondary"
                onClick={() => setShowPasswordModal(false)}
              >
                {t("cancel")}
              </button>
              <button 
                className="button-primary"
                onClick={handleChangePassword}
                disabled={isSavingPassword || !passwordForm.currentPassword || !passwordForm.newPassword}
              >
                {isSavingPassword ? t("saving") : t("changePasswordButton")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de eliminación de cuenta */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{t("confirmAccountDeletion")}</h3>
            {deletionError && <div className="modal-error">{deletionError}</div>}
            <div className="modal-form-group">
              <label>{t("enterPasswordToConfirm")}</label>
              <input
                type="password"
                placeholder={t("enterYourPassword")}
                value={deletionPassword}
                onChange={(e) => setDeletionPassword(e.target.value)}
                className="modal-input"
              />
            </div>
            <div className="deletion-warning">
              <p>{t("deletionWarningText")}</p>
            </div>
            <div className="modal-buttons">
              <button 
                className="button-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                {t("cancel")}
              </button>
              <button 
                className="button-danger"
                onClick={handleDeleteAccount}
                disabled={isDeletingAccount || !deletionPassword}
              >
                {isDeletingAccount ? t("deleting") : t("deleteMyAccount")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSettings;
