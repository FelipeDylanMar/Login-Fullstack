import { useState, createContext, useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  fetchWithAuth: (url: string, options?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const storedUser = localStorage.getItem("user");

    try {
      if (!storedUser) return null;

      const parsed = JSON.parse(storedUser);

      if (parsed && parsed.email && parsed.name) {
        return parsed;
      }

      return { email: storedUser, name: "Usuário" };
    } catch {
      return { email: storedUser, name: "Usuário" };
    }
  });

  const navigate = useNavigate();

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("token");

    const headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401 || response.status === 403) {
      logout();
      throw new Error("Sessão expirada. Faça login novamente.");
    }

    return response;
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Credenciais inválidas.");

      const { token, user: userInfo } = await response.json();

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userInfo));
      setUser(userInfo);

      navigate("/home/dashboard");
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Erro ao fazer login.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, fetchWithAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider.");
  }
  return context;
};
