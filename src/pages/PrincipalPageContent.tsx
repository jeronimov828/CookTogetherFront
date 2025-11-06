import React, { useState } from "react";
import { crearUsuario } from "../services/authService";
import Swal from "sweetalert2";

interface Props {
  onClickSuccess: () => void;
}

const PrincipalPageContent: React.FC<Props> = ({ onClickSuccess }) => {
  const [name, setName] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [role, setRole] = useState("");
  const [emailUsuario, setEmailUsuario] = useState("");

  // ✅ CREAR USUARIO
  const handleCrearUsuario = async () => {
    try {
      if (!name.trim() || !emailUsuario.trim() || !passwordHash.trim() || !role.trim()) {
        Swal.fire("Campos incompletos", "Completa todos los campos", "warning");
        return;
      }

      await crearUsuario(name, emailUsuario, passwordHash, role);

      Swal.fire({
        icon: "success",
        title: "Usuario creado con éxito",
        confirmButtonText: "Aceptar",
      });

      limpiarCamposCreacion();
      onClickSuccess(); // 🔸 Notifica al padre que ya terminó
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al crear el usuario",
        confirmButtonText: "Aceptar",
      });
      console.error("Error al crear usuario:", error);
    }
  };

  // ✅ UTILIDADES
  const limpiarCamposCreacion = () => {
    setName("");
    setPasswordHash("");
    setEmailUsuario("");
    setRole("");
  };

  return (
    <form>
      <div className="mb-3">
        <label className="form-label">Usuario</label>
        <input
          className="form-control"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Correo Electrónico</label>
        <input
          className="form-control"
          type="email"
          value={emailUsuario}
          onChange={(e) => setEmailUsuario(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Contraseña</label>
        <input
          className="form-control"
          type="password"
          value={passwordHash}
          onChange={(e) => setPasswordHash(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Rol</label>
        <input
          className="form-control"
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>

      <div className="text-center">
        <button type="button" className="btn btn-success me-3" onClick={handleCrearUsuario}>
          Guardar
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={onClickSuccess}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default PrincipalPageContent;