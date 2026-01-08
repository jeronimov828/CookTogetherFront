import React, { useEffect, useState } from "react";
import {
  EliminarRecetas,
  ListarRecetas,
  PublicaRectas,
} from "../services/crearRecetasService";
import { RecetaResponse } from "../interfaces/interfaceReceta.interface";
import Swal from "sweetalert2";
import AgregarPasosPageContent from "./agregarPasosPageContent";
import TablaIngredientes from "./tablaIngredientes";
import TablaPasos from "./tablaPasosPage";
import AgregarIngredientesPageContent from "./agregarIngredientesPageContent";

interface Props {
  onClickSuccess: () => void;
}

const ListaRecetasPage: React.FC<Props> = ({ onClickSuccess }) => {
  const [recetas, setRecetas] = useState<RecetaResponse[]>([]);
  const [modalMostrarAgregarPasos, setModalMostrarAgregarPasos] =
    useState(false);
  const [recetaSeleccionadaId, setRecetaSeleccionadaId] = useState<
    string | null
  >(null);
  const [modalListarIngredientes, setModalListarIngredientes] = useState(false);
  const [modalAgregarIngredientes, setModalAgregarIngredientes] =
    useState(false);
  const [modalListarPasos, setModaListarPasos] = useState(false);
  useEffect(() => {
    const cargarRecetas = async () => {
      try {
        const response = await ListarRecetas();
        console.log("RECETAS:", response);

        // Suponemos que ListarRecetas retorna directamente un array de recetas:
        setRecetas(response.recetas); 
      } catch (error) {
        console.error("Error al cargar recetas:", error);
        Swal.fire("Error", "No se pudieron cargar las recetas", "error");
      }
    };
  
    cargarRecetas();
  }, []);

  // Maneja el cambio de publicación
  const handlePublicar = async (id: string, is_Public: boolean) => {
    try {
      const respuesta = await PublicaRectas(id, !is_Public);
      console.log("Respuesta del backend:", respuesta);

      const nuevaReceta = respuesta.receta;

      if (nuevaReceta && nuevaReceta.is_Public === true) {
        Swal.fire("Éxito", "Receta publicada correctamente", "success");
      } else if (nuevaReceta && nuevaReceta.is_Public === false) {
        Swal.fire("Éxito", "Su receta es privada otra vez", "success");
      }

      setRecetas((prev) =>
        prev.map((receta) =>
          receta.id === id
            ? { ...receta, is_Public: nuevaReceta && nuevaReceta.is_Public }
            : receta
        )
      );
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo actualizar la receta", "error");
    }
  };

  const handleEliminar = async (id: string) => {
    try {
      const respuesta = await EliminarRecetas(id);

      if (respuesta) {
        Swal.fire("Éxito", "Receta eliminada correctamente", "success");

        // 🔹 Actualiza el estado local eliminando la receta del array
        setRecetas((prev) => prev.filter((receta) => receta.id !== id));
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo elimnar la receta", "error");
    }
  };

  return (
    <div>
      <div className="container mt-4">
        <h3 className="mb-4 text-center text-primary fw-bold">
          📖 Lista de Recetas
        </h3>

        {recetas.length > 0 ? (
          <div
            className="d-flex flex-column gap-3"
            style={{ borderRadius: "15px", border: "2px solid #444" }}
          >
            {recetas.map((receta) => (
              <div
                key={receta.id}
                className="card shadow-sm border-0"
                style={{ borderRadius: "15px", border: "2px solid #444" }}
              >
                {receta.imagen_Url && (
                  <img
                    src={receta.imagen_Url}
                    alt={receta.titulo}
                    className="card-img-top"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  />
                )}

                <div className="card-body">
                  <h5 className="card-title fw-bold text-primary">
                    {receta.titulo}
                  </h5>
                  <p className="card-text text-muted mb-2">
                    {receta.descripcion}
                  </p>
                  <ul className="list-unstyled small mb-3">
                    <li>
                      <strong>Dificultad:</strong> {receta.dificultad}
                    </li>
                    <li>
                      <strong>Porciones:</strong> {receta.porciones}
                    </li>
                    <li>
                      <strong>Tiempo:</strong> {receta.tiempo_min} min
                    </li>
                  </ul>

                  <button
                    onClick={() =>
                      handlePublicar(receta.id ?? "", !!receta.is_Public)
                    }
                    className="btn btn-outline-success btn-sm"
                  >
                    {receta.is_Public ? "Despublicar" : "Publicar"}
                  </button>
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => {
                      setRecetaSeleccionadaId(receta.id ?? null);
                      setModaListarPasos(true);
                    }}
                  >
                    Lista de pasos
                  </button>

                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => {
                      setRecetaSeleccionadaId(receta.id ?? null);
                      setModalListarIngredientes(true);
                    }}
                  >
                    Mostrar Ingredientes
                  </button>

                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-success">
                      {receta.is_Public ? "Pública" : "Privada"}
                    </span>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleEliminar(receta.id ?? "")}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-info text-center">
            No hay recetas disponibles 🍽️
          </div>
        )}
      </div>
      {/* MODAL AGREGAR PASOS*/}
      {modalMostrarAgregarPasos && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <button
                type="button"
                className="btn-close"
                onClick={() => setModalMostrarAgregarPasos(false)}
              ></button>
              <div className="modal-header">
                <h5 className="mb-3">Formulario de creación de pasos 👨‍💼</h5>
              </div>
              <div className="modal-body">
                <AgregarPasosPageContent
                  idReceta={recetaSeleccionadaId}
                  onClickSuccess={() => setModalMostrarAgregarPasos(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* MODAL LISTAR INGREDIENTES*/}
      {modalListarIngredientes && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <button
                type="button"
                className="btn-close"
                onClick={() => setModalListarIngredientes(false)}
              ></button>
              <div className="modal-header">
                <h5 className="mb-3">Tabla de ingredientes 👨‍💼</h5>
              </div>
              <div className="modal-body">
                <TablaIngredientes id={recetaSeleccionadaId} />
              </div>
              <button
                className="btn btn-outline-success btn-sm"
                onClick={() => {
                  setModalAgregarIngredientes(true);
                  setModalListarIngredientes(false);
                }}
              >
                Agregar Ingrediente
              </button>
            </div>
          </div>
        </div>
      )}
      {/* MODAL LISTAR PASOS*/}
      {modalListarPasos && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <button
                type="button"
                className="btn-close"
                onClick={() => setModaListarPasos(false)}
              ></button>
              <div className="modal-header">
                <h5 className="mb-3">Tabla de pasos 👨‍💼</h5>
              </div>
              <div className="modal-body">
                <TablaPasos id={recetaSeleccionadaId} />
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={() => {
                    setModalMostrarAgregarPasos(true);
                    setModaListarPasos(false);
                  }}
                >
                  Agregar Paso
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* MODAL AGREGAR INGREDIENTES*/}
      {modalAgregarIngredientes && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <button
                type="button"
                className="btn-close"
                onClick={() => setModalAgregarIngredientes(false)}
              ></button>
              <div className="modal-header">
                <h5 className="mb-3">Formulario para agregar nuevos ingredientes 👨‍💼</h5>
              </div>
              <div className="modal-body">
                <AgregarIngredientesPageContent
                  idReceta={recetaSeleccionadaId}
                  onClickSuccess={() => setModalAgregarIngredientes(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaRecetasPage;
