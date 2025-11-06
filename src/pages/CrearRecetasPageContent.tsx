import React, { useState } from "react";
import Swal from "sweetalert2";
import { CrearReceta } from "../services/crearRecetasService";

interface Props {
  onClickSuccess: () => void;
}

const CrearRecetaContent: React.FC<Props> = ({ onClickSuccess }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [dificultad, setDificultad] = useState("");
  const [porciones, setPorciones] = useState("");
  const [tiempo_min, setTiempo_min] = useState("");
  const [imagen_url, setImagen_url] = useState("");

  const [ingredientes, setIngredientes] = useState<
    { nombre: string;}[]
  >([]);
  const [nuevoIngrediente, setNuevoIngrediente] = useState({
    nombre: "",
  });

  // ➕ Agregar ingrediente temporal a la lista
  const handleAgregarIngrediente = () => {
    if (!nuevoIngrediente.nombre.trim()) {
      Swal.fire("Atención", "Completa el nombre y la cantidad", "warning");
      return;
    }

    setIngredientes([...ingredientes, nuevoIngrediente]);
    setNuevoIngrediente({ nombre: ""});
  };

  // ❌ Eliminar ingrediente
  const handleEliminarIngrediente = (index: number) => {
    setIngredientes(ingredientes.filter((_, i) => i !== index));
  };

  // 🧾 Guardar receta completa
  const handleCrearReceta = async () => {
    try {
      if (!titulo || !descripcion || ingredientes.length === 0) {
        Swal.fire("Faltan datos", "Completa todos los campos", "warning");
        return;
      }

      await CrearReceta(
        titulo,
        descripcion,
        dificultad,
        parseInt(porciones),
        parseInt(tiempo_min),
        imagen_url,
        ingredientes // enviamos la lista completa
      );

      Swal.fire("Éxito", "Receta creada correctamente", "success");
      limpiarCampos();
      onClickSuccess();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo crear la receta", "error");
    }
  };

  const limpiarCampos = () => {
    setTitulo("");
    setDescripcion("");
    setDificultad("");
    setPorciones("");
    setTiempo_min("");
    setImagen_url("");
    setIngredientes([]);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Crear Receta</h3>

      <div className="mb-3">
        <label>Título</label>
        <input
          className="form-control"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Descripción</label>
        <textarea
          className="form-control"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Dificultad</label>
        <input
          className="form-control"
          value={dificultad}
          onChange={(e) => setDificultad(e.target.value)}
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label>Porciones</label>
          <input
            type="number"
            className="form-control"
            value={porciones}
            onChange={(e) => setPorciones(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label>Tiempo (minutos)</label>
          <input
            type="number"
            className="form-control"
            value={tiempo_min}
            onChange={(e) => setTiempo_min(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-3">
        <label>Imagen URL</label>
        <input
          className="form-control"
          value={imagen_url}
          onChange={(e) => setImagen_url(e.target.value)}
        />
      </div>

      <hr />

      <h5>Ingredientes</h5>
      <div className="d-flex mb-3">
        <input
          className="form-control me-2"
          placeholder="Nombre del ingrediente"
          value={nuevoIngrediente.nombre}
          onChange={(e) =>
            setNuevoIngrediente({ ...nuevoIngrediente, nombre: e.target.value })
          }
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAgregarIngrediente}
        >
          Agregar
        </button>
      </div>

      {ingredientes.length > 0 && (
        <ul className="list-group mb-3">
          {ingredientes.map((ing, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{ing.nombre}</span>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => handleEliminarIngrediente(index)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="text-center">
        <button
          type="button"
          className="btn btn-success me-3"
          onClick={handleCrearReceta}
        >
          Guardar Receta
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClickSuccess}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default CrearRecetaContent;