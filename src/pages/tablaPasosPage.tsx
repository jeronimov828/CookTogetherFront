import React, { useEffect, useState } from "react";
import { ListarPasos } from "../services/pasosServices";
import { PasosResponse } from "../interfaces/interfacePasos.interface";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";

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
