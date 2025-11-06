import React, { useState } from "react";
import { login, crearUsuario } from "../services/authService";
import Swal from "sweetalert2";

interface Props {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<Props> = ({ onLoginSuccess }) => {
  const [name, setName] = useState("");
  const [passwordHash, setpasswordHash] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await login(name, passwordHash);

      if (data.token) {
        Swal.fire({
          icon: "success",
          title: "Inicio Exitoso",
          text: "Redirigiendo.....",
          confirmButtonText: "Redirigir",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("rol", data.usuario.role);
            setMessage(data.message); // "Login exitoso"
            onLoginSuccess();
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error en el inicio de sesion",
          text: "contraseña o usuario incorrectos",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error: any) {
      setMessage("Error al conectar con el servidor");
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
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="text"
            className="form-control"
            value={passwordHash}
            onChange={(e) => setpasswordHash(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary me-5">
          Iniciar Sesión
        </button>
        {message && <div className="mt-3 alert alert-info">{message}</div>}
      </form>
    </div>
  );
};

export default LoginForm;
