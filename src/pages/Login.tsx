
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Youtube } from "lucide-react";

const Login = () => {
  const { isAuthenticated, isLoading, login } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = () => {
    setIsLoggingIn(true);
    login();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-accent rounded-full blur-3xl"></div>
      </div>
      
      <div className="z-10 w-full max-w-md mx-auto p-8 bg-background/80 backdrop-blur-sm border rounded-lg shadow-lg">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="h-16 w-16 rounded-full overflow-hidden gradient-bg flex items-center justify-center">
            <span className="text-white font-bold text-2xl">CP</span>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">ClickPilot</h1>
            <p className="text-muted-foreground">
              A/B test your YouTube thumbnails and maximize your views
            </p>
          </div>
          
          <div className="w-full pt-4">
            <Button 
              className="w-full flex items-center justify-center gap-2"
              size="lg"
              onClick={handleLogin}
              disabled={isLoggingIn}
            >
              <Youtube className="h-5 w-5" />
              Connect with YouTube
              {isLoggingIn && (
                <span className="ml-2 animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
              )}
            </Button>
            <p className="mt-4 text-xs text-center text-muted-foreground">
              By connecting, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
            </p>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
              <p className="text-sm">Boost Click-Through Rate by up to 30%</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
              <p className="text-sm">Save hours of manual testing and guesswork</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">✓</div>
              <p className="text-sm">Get AI-powered thumbnail recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
