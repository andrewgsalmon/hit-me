import React, { useState, useEffect } from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Welcome from "./pages/Welcome/Welcome";
import Home from "./pages/Home/Home";
import ArtistPage from "./pages/ArtistPage/ArtistPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Footer from "./components/Footer/Footer";
import Profile from "./pages/Profile/Profile";

function App() {
  const [failedAuth, setFailedAuth] = useState(false);
  const token = sessionStorage.getItem("token");
  const location = useLocation().pathname;

  useEffect(() => {
    if (!token) {
      setFailedAuth(true);
    }
  }, [location, token]);

  return (
    <>
      <Header failedAuth={failedAuth} />
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="artist/:idFromParams" element={<ArtistPage />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </main>
      {failedAuth ? "" : <Footer />}
    </>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
