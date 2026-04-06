import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
  roles: string[];
  login: (token: string, username: string, roles: string[]) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);

  // Cargar datos de localStorage al iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedRoles = localStorage.getItem("roles");

    if (storedToken && storedUsername && storedRoles) {
      setToken(storedToken);
      setUsername(storedUsername);
      setRoles(JSON.parse(storedRoles));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string, username: string, roles: string[]) => {
    setToken(token);
    setUsername(username);
    setRoles(roles);
    setIsAuthenticated(true);

    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("roles", JSON.stringify(roles));
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    setRoles([]);
    setIsAuthenticated(false);

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, username, roles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};