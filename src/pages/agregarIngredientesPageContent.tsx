import React, { useState } from "react";
import Swal from "sweetalert2";
import { AgregarIngredientes } from "../services/ingredientesService";

interface Props {
  idReceta: string | null;
  onClickSuccess: () => void;
}

const AgregarIngredientesPageContent: React.FC<Props> = ({
  idReceta,
  onClickSuccess,
}) => {
  const [ingredientes, setIngredientes] = useState<{ nombre: string }[]>([]);
  const [nuevoIngrediente, setNuevoIngrediente] = useState({
    nombre: "",
    calorias: "",
  });

  const handleAgregarIngredintes = () => {
    if (!nuevoIngrediente.calorias.trim()) {
      Swal.fire("Atención", "Completa el contenido del ingrediente", "warning");
      return;
    }
    // Limpiar campos
    setIngredientes([...ingredientes, nuevoIngrediente]);
  };

  const handleGuardarPasos = async () => {
    if (!idReceta) {
      Swal.fire("Error", "No se encontro el ID de la receta", "error");
      return;
    }
    try {
      await AgregarIngredientes(idReceta, nuevoIngrediente.nombre, parseInt(nuevoIngrediente.calorias));
      Swal.fire("Éxito", "Pasos guardados correctamente", "success");
      onClickSuccess();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo guardar los pasos", "error");
    } finally {
      setIngredientes([]);
      setNuevoIngrediente({ nombre: "", calorias: "" });
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Agregar Ingredientes</h3>

      <div className="mb-3">
        <label>Nombre</label>
        <input
          className="form-control"
          value={nuevoIngrediente.nombre}
          onChange={(e) =>
            setNuevoIngrediente({ ...nuevoIngrediente, nombre: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label>Calorias</label>
        <input
          type="number"
          className="form-control"
          value={nuevoIngrediente.calorias}
          onChange={(e) =>
            setNuevoIngrediente({ ...nuevoIngrediente, calorias: e.target.value })
          }
        />
      </div>

      <button className="btn btn-primary" onClick={handleAgregarIngredintes}>
        Agregar Ingredientes
      </button>

      {/* 💡 Aquí mostramos la lista de pasos agregados */}
      <div className="mt-4">
        <h5>Lista de nuevos ingredientes:</h5>
        {ingredientes.length === 0 ? (
          <p>No hay ingredientes agregados aún.</p>
        ) : (
          <ul className="list-group">
            {ingredientes.map((p, index) => (
              <li key={index} className="list-group-item">
                <strong>Paso {p.nombre}:</strong>
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

export default AgregarIngredientesPageContent;
