import React, { useEffect, useState } from "react";
import { eliminarPasos, ListarPasos } from "../services/pasosServices";
import { PasosResponse } from "../interfaces/interfacePasos.interface";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import Swal from "sweetalert2";

interface Props {
  id: string | null;
}

const TablaPasos: React.FC<Props> = ({ id }) => {
  const [listarPasos, setListarPasos] = useState<
    PasosResponse[]
  >([]);

  useEffect(() => {
    if (!id) return;

    const cargarPasos = async () => {
      try {
        const pasosData = await ListarPasos(id);
        // Si pasos no es un array, wrappéalo en array
        setListarPasos(Array.isArray(pasosData) ? pasosData : [pasosData]);
      } catch (error) {
        console.error("Error al cargar ingredientes:", error);
      }
    };

    cargarPasos();
  }, [id]);

  const handleEliminarPasos = async (id: string) => {
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Se eliminará el ingrediente seleccionado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmacion.isConfirmed) {
      try {
        await eliminarPasos(id); // llama al servicio
        setListarPasos((prev) => prev.filter((u) => u.id !== id)); // elimina localmente
        Swal.fire("Eliminado", "Usuario eliminado exitosamente.", "success");
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
      }
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {listarPasos.length > 0 ? (
            listarPasos.map((pasos) => (
              <tr key={pasos.id}>
                <td>{pasos.orden}</td>
                <td>{pasos.contenido}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => pasos.id && handleEliminarPasos(pasos.id)}
                    disabled={!pasos.id}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center">No hay pasos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaPasos;
