import "./App.css";
import AppRouter from "./router/AppRouter";
import { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const navigate = useNavigate();
  const location = useLocation();

  const timerStarted = useRef(false);
  const countdownRef = useRef(null);

  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = sessionStorage.getItem("token");

      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const expiryTime = decoded.exp * 1000;

        if (
          Date.now() >= expiryTime &&
          !timerStarted.current &&
          location.pathname !== "/login"
        ) {
          handleExpire();
        }
      } catch (err) {
        logout();
      }
    };

    checkTokenExpiry();

    const interval = setInterval(checkTokenExpiry, 60000);

    return () => clearInterval(interval);
  }, [location.pathname]);

  const handleExpire = () => {
    timerStarted.current = true;
    setShowModal(true);

    let seconds = 10;

    countdownRef.current = setInterval(() => {
      seconds -= 1;
      setCountdown(seconds);

      if (seconds <= 0) {
        clearInterval(countdownRef.current);
        logout();
      }
    }, 1000);
  };

  const logout = () => {
    setShowModal(false);
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <AppRouter />

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-100 text-center">
            <h3 className="text-xl font-semibold text-red-600 mb-2">
              Session Expired
            </h3>
            <p className="text-gray-600">
              Redirecting to login in{" "}
              <span className="font-bold">{countdown}</span> seconds.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
