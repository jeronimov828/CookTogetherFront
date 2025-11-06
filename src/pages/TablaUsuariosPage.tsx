import React, { useEffect, useState } from "react";
import { ListaUsuarios, Usuario, eliminarUsuario } from "../services/authService";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import $ from "jquery";
import Swal from "sweetalert2";

interface Props {
  onClickSuccess: () => void;
}

const TablaUsuariosPage: React.FC<Props> = ({ onClickSuccess }) => {
  const [listaUsuarios, setListaUsuarios] = useState<Usuario[]>([]);

  // 🔹 Cargar usuarios al montar el componente
  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const usuariosData = await ListaUsuarios();
        console.log("Respuesta del backend:", usuariosData);
        setListaUsuarios(Array.isArray(usuariosData) ? usuariosData : [usuariosData]);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };

    cargarUsuarios();
  }, []);

  // 🔹 Inicializar DataTable cuando hay datos
  useEffect(() => {
    if (listaUsuarios.length > 0) {
      setTimeout(() => {
        // @ts-ignore
        if (!$.fn.DataTable.isDataTable("#tablaUsuarios")) {
          ($("#tablaUsuarios") as any).DataTable();
        }
      }, 0);
    }
  }, [listaUsuarios]);

  // 🔹 Función para eliminar usuario con confirmación
  const handleEliminarUsuario = async (id: string) => {
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Se eliminará el usuario seleccionado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmacion.isConfirmed) {
      try {
        await eliminarUsuario(id); // llama al servicio
        setListaUsuarios((prev) => prev.filter((u) => u.id !== id)); // elimina localmente
        Swal.fire("Eliminado", "Usuario eliminado exitosamente.", "success");
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
      }
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body p-0">
        <div className="table-responsive">
          <table
            className="table table-hover table-striped align-middle mb-0"
            id="tablaUsuarios"
          >
            <thead className="table-light">
              <tr>
                <th colSpan={4} className="p-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">Usuarios</h6>
                  </div>
                </th>
              </tr>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Role</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {listaUsuarios.length > 0 ? (
                listaUsuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.name}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.role}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleEliminarUsuario(usuario.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-3">
                    No hay usuarios disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablaUsuariosPage;