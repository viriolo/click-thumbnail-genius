
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  accessToken: string;
  channelId?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("clickpilot_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = () => {
    setIsLoading(true);
    
    // In a real implementation, we would redirect to Google OAuth
    // For the MVP, we'll simulate a login with mock data
    setTimeout(() => {
      const mockUser = {
        id: "user_123",
        name: "Demo User",
        email: "demo@example.com",
        picture: "https://i.pravatar.cc/150?u=demo@example.com",
        accessToken: "mock_token_123",
        channelId: "UCMockChannelId"
      };
      
      setUser(mockUser);
      localStorage.setItem("clickpilot_user", JSON.stringify(mockUser));
      setIsLoading(false);
      
      toast({
        title: "Logged in successfully",
        description: "Welcome to ClickPilot!",
      });
      
      navigate("/");
    }, 1500);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("clickpilot_user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
