import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginCard from "./pages/LoginCard";
import PaginaPrincipal from "./pages/PrincipalPage";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5/js/dataTables.bootstrap5.min.js";

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const location = useLocation();

  // Este efecto detecta cuando cambia el localStorage (logout o login manual)
  useEffect(() => {
    const checkToken = () => {
      setToken(localStorage.getItem("token"));
    };

    // Escuchamos el cambio en el almacenamiento
    window.addEventListener("storage", checkToken);

    // Escuchamos cada vez que cambia la ruta (por si actualizamos localStorage en otro lugar)
    checkToken();

    return () => window.removeEventListener("storage", checkToken);
  }, [location]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          token ? (
            <Navigate to="/Principal" />
          ) : (
            <LoginCard
              onLoginSuccess={() => {
                window.location.href = "/Principal";
              }}
            />
          )
        }
      />
      <Route
        path="/Principal"
        element={
          token ? (
            <PaginaPrincipal />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
}

export default App;