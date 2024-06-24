import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./Footer.scss";

function Footer() {
  const [token, setToken] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setToken(false);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <>
      {token ? (
        <footer>
          <nav className="footer">
            <NavLink
              to={"/home"}
              className={({ isActive, isPending }) => {
                return isPending
                  ? "footer__link footer__link--inactive footer__link--home"
                  : isActive
                  ? "footer__link footer__link--active footer__link--home"
                  : "footer__link footer__link--inactive footer__link--home";
              }}
            >
              Find Music
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive, isPending }) => {
                return isPending
                  ? "footer__link footer__link--inactive footer__link--profile"
                  : isActive
                  ? "footer__link footer__link--active footer__link--profile"
                  : "footer__link--inactive footer__link footer__link--profile";
              }}
            >
              Profile
            </NavLink>
            <div
              onClick={handleLogout}
              className="footer__link footer__link--inactive footer__link--logout"
            >
              Log Out
            </div>
          </nav>
        </footer>
      ) : (
        ""
      )}
    </>
  );
}

export default Footer;
