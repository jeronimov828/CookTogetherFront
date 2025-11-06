import React, { useState } from "react";
import Swal from "sweetalert2";
import { CrearPasos } from "../services/pasosServices";

interface Props {
  idReceta: string | null;
  onClickSuccess: () => void;
}

const AgregarPasosPageContent: React.FC<Props> = ({ idReceta,onClickSuccess }) => {
  const [pasos, setPasos] = useState<{ contenido: string; orden: number }[]>([]);
  const [nuevoPaso, setNuevoPaso] = useState({ contenido: "", orden: "" });

  const handleAgregarPaso = () => {
    if (!nuevoPaso.contenido.trim()) {
      Swal.fire("Atención", "Completa el contenido del paso", "warning");
      return;
    }

    // Convertir orden a número y agregar paso
    const pasoFormateado = { ...nuevoPaso, orden: Number(nuevoPaso.orden) };
    setPasos([...pasos, pasoFormateado]);

    // Limpiar campos
    setNuevoPaso({ contenido: "", orden: "" });
  };

  const handleGuardarPasos = async () => {
    if(!idReceta) {
        Swal.fire("Error", "No se encontro el ID de la receta", "error");
        return
    }
    try {
        await CrearPasos(idReceta, pasos);
        Swal.fire("Éxito", "Pasos guardados correctamente", "success");
        onClickSuccess();
    } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo guardar los pasos", "error");
    } finally {
        setPasos([]);
        setNuevoPaso({ contenido: "", orden: "" });
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Agregar Pasos</h3>

      <div className="mb-3">
        <label>Contenido</label>
        <input
          className="form-control"
          value={nuevoPaso.contenido}
          onChange={(e) =>
            setNuevoPaso({ ...nuevoPaso, contenido: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label>Orden</label>
        <input
          type="number"
          className="form-control"
          value={nuevoPaso.orden}
          onChange={(e) =>
            setNuevoPaso({ ...nuevoPaso, orden: e.target.value })
          }
        />
      </div>

      <button className="btn btn-primary" onClick={handleAgregarPaso}>
        Agregar Paso
      </button>

      {/* 💡 Aquí mostramos la lista de pasos agregados */}
      <div className="mt-4">
        <h5>Lista de pasos:</h5>
        {pasos.length === 0 ? (
          <p>No hay pasos agregados aún.</p>
        ) : (
          <ul className="list-group">
            {pasos.map((p, index) => (
              <li key={index} className="list-group-item">
                <strong>Paso {p.orden}:</strong> {p.contenido}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button className="btn btn-primary mt-3" onClick={handleGuardarPasos}>
        Guardar
      </button>
    </div>
  );
};

export default AgregarPasosPageContent;