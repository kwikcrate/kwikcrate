import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Public Pages
import Home from "./pages/Home";
import Games from "./pages/Games";
import ContactUs from "./pages/ContactUs";
import Register from "./pages/Register";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin";
import Cart from "./pages/Cart";
import Blog from "./pages/Blog";
import PageViewer from "./pages/PageViewer";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Admin Layout & Route Protection
import AdminLayout from "./layout/AdminLayout";
import AdminRoute from "./routes/AdminRoute";

// Admin Pages
import ManageGames from "./admin/pages/ManageGames";
import ManageTopUps from "./admin/pages/ManageTopUps";
import ManageUsers from "./admin/pages/ManageUsers";
import ManageQueries from "./admin/pages/ManageQueries";
import Analytics from "./admin/pages/Analytics";
import Dashboard from "./admin/pages/AdminDashboard";
import ManagePage from "./admin/pages/ManagePage";

const AppWrapper = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}

      <Routes>
        {/* 🏠 Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/blog" element={<Blog />} />

        {/* 📄 Dynamic Static Pages */}
        <Route path="/privacy-policy" element={<PageViewer slug="privacy-policy" />} />
        <Route path="/terms" element={<PageViewer slug="terms" />} />
        <Route path="/returns" element={<PageViewer slug="returns" />} />
        <Route path="/help-center" element={<PageViewer slug="help-center" />} />
        <Route path="/complaint" element={<PageViewer slug="complaint" />} />
        <Route path="/faq" element={<PageViewer slug="faq" />} />
        <Route path="/kyc" element={<PageViewer slug="kyc" />} />
        <Route path="/about" element={<PageViewer slug="about" />} />

        {/* 🛠️ Admin Routes */}
        <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/games" element={<ManageGames />} />
          <Route path="/admin/topups" element={<ManageTopUps />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/queries" element={<ManageQueries />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/pages/:slug" element={<ManagePage />} />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
