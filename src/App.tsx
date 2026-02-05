import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { About } from "./components/About";
import { AdminSystem } from "./components/AdminSystem";
import { OfficeHour } from "./components/OfficeHour";
import { Download } from "./components/Download";
import { Footer } from "./components/Footer";
import { LoginAdmin } from "./components/admin/LoginAdmin";
import { DashboardLayout } from "./components/admin/DashboardLayout";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "login" | "dashboard">("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginClick = () => {
    setCurrentPage("login");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("landing");
  };

  const handleBackToHome = () => {
    setCurrentPage("landing");
  };

  // Render Login Page
  if (currentPage === "login") {
    return <LoginAdmin onLogin={handleLogin} onBackToHome={handleBackToHome} />;
  }

  // Render Dashboard
  if (currentPage === "dashboard" && isLoggedIn) {
    return <DashboardLayout onLogout={handleLogout} />;
  }

  // Render Landing Page
  return (
    <div className="min-h-screen bg-white">
      <Navbar onLoginClick={handleLoginClick} />
      <main>
        <Hero onLoginClick={handleLoginClick} />
        <Features />
        <About />
        <AdminSystem onLoginClick={handleLoginClick} />
        <OfficeHour />
        <Download />
      </main>
      <Footer />
    </div>
  );
}
