import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";

interface Props {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<Props> = ({ onLoginSuccess }) => {
  const [name, setName] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (!name.trim() || !passwordHash.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Campos requeridos",
        text: "Por favor, completa todos los campos",
      });
      return;
    }

    setLoading(true);

    try {
      const data = await login(name, passwordHash);

      if (data.token && data.usuario) {
        // Usar el contexto de autenticación
        authLogin(data.token, data.usuario);

        Swal.fire({
          icon: "success",
          title: "Inicio Exitoso",
          text: "Redirigiendo...",
          timer: 1500,
          showConfirmButton: false,
        });

        // Usar navigate en lugar de window.location
        navigate("/Principal");
        onLoginSuccess();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error en el inicio de sesión",
          text: "Credenciales incorrectas",
        });
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error al conectar con el servidor";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={passwordHash}
            onChange={(e) => setPasswordHash(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary me-5"
          disabled={loading}
        >
          {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
