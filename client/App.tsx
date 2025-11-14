import "./global.css";

import { useEffect, useState } from "react";

import { AdminSignIn } from "@/components/auth/AdminSignIn";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import type { Root } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ADMIN_USERNAME = "UKSportAdmin";
const ADMIN_PASSWORD = "UKSport25";
const AUTH_SESSION_KEY = "uk-sport-admin-authenticated";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return sessionStorage.getItem(AUTH_SESSION_KEY) === "true";
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const stored = sessionStorage.getItem(AUTH_SESSION_KEY) === "true";
    setIsAuthenticated(stored);
  }, []);

  const handleAuthenticate = (username: string, password: string) => {
    const trimmedUsername = username.trim();
    const isValid = trimmedUsername === ADMIN_USERNAME && password === ADMIN_PASSWORD;

    if (isValid && typeof window !== "undefined") {
      sessionStorage.setItem(AUTH_SESSION_KEY, "true");
      setIsAuthenticated(true);
    }

    return isValid;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {isAuthenticated ? (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        ) : (
          <AdminSignIn onAuthenticate={handleAuthenticate} />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const container = document.getElementById("root");

if (!container) {
  throw new Error("Failed to find the root element");
}

const existingRoot = (window as unknown as { __APP_ROOT__?: Root }).__APP_ROOT__;
const root = existingRoot ?? createRoot(container);
(window as unknown as { __APP_ROOT__?: Root }).__APP_ROOT__ = root;

root.render(<App />);
