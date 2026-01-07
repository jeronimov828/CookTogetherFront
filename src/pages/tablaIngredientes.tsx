import React, { useEffect, useState } from "react";
import {
  eliminarIngredientes,
  listaIngredientes,
} from "../services/ingredientesService";
import { IngredientesResponse } from "../interfaces/interfaceIngredientes";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import Swal from "sweetalert2";

interface Props {
  id: string | null;
}

const TablaIngredientes: React.FC<Props> = ({ id }) => {
  const [listarIngredientes, setListarIngredientes] = useState<
    IngredientesResponse[]
  >([]);

  useEffect(() => {
    if (!id) return;

    const cargarIngredientes = async () => {
      try {
        const ingredientesData = await listaIngredientes(id);
        // Si ingredientesData no es un array, wrappéalo en array
        setListarIngredientes(
          Array.isArray(ingredientesData)
            ? ingredientesData
            : [ingredientesData]
        );
      } catch (error) {
        console.error("Error al cargar ingredientes:", error);
      }
    };

    cargarIngredientes();
  }, [id]);

  const handleEliminarIngrediente = async (id: string) => {
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
        await eliminarIngredientes(id); // llama al servicio
        setListarIngredientes((prev) => prev.filter((u) => u.id !== id)); // elimina localmente
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
          {listarIngredientes.length > 0 ? (
            listarIngredientes.map((ingrediente) => (
              <tr key={ingrediente.id}>
                <td>{ingrediente.nombre}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleEliminarIngrediente(ingrediente.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center">No hay ingredientes</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaIngredientes;
