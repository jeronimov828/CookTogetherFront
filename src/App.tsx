import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import LoginCard from "./pages/LoginCard";
import PaginaPrincipal from "./pages/PrincipalPage";
import LoadingSpinner from "./components/common/LoadingSpinner";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5/js/dataTables.bootstrap5.min.js";

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner message="Cargando aplicación..." />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/Principal" replace />
          ) : (
            <LoginCard
              onLoginSuccess={() => {
                // La navegación se maneja en LoginForm usando useNavigate
              }}
            />
          )
        }
      />
      <Route
        path="/Principal"
        element={
          isAuthenticated ? (
            <PaginaPrincipal />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;