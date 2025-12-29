import React, { useEffect, useState } from "react";
import { listaIngredientes } from "../services/ingredientesService";
import { IngredientesResponse } from "../interfaces/interfaceIngredientes";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";

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
        setListarIngredientes(Array.isArray(ingredientesData) ? ingredientesData : [ingredientesData]);
      } catch (error) {
        console.error("Error al cargar ingredientes:", error);
      }
    };

    cargarIngredientes();
  }, [id]);

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
