import React, { useEffect, useState } from "react";
import PrincipalPageContent from "../pages/PrincipalPageContent";
import CrearRecetaContent from "./CrearRecetasPageContent";
import Swal from "sweetalert2";
import CardsListarRecetasPageContent from "./CardsListarRecetasPageContent";
import TablaUsuariosPage from "./TablaUsuariosPage";

const PrincipalPage: React.FC = () => {
  const [rol, setRol] = useState<string | null>(null);
  const [modalMostrarCrearUsuario, setModalMostrarCrearUsuario] = useState(false);
  const [modalMostrarCrearReceta, setModalMostrarCrearReceta] = useState(false);
  const [mostrarRecetas, setMostrarRecetas] = useState(false);
  const [modalListarUsuariosAbierto, setModalListarUsuariosAbierto] = useState(false);

  useEffect(() => {
    const rolGuardado = localStorage.getItem("rol");
    setRol(rolGuardado);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se cerrará tu sesión.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("rol");
        window.location.href = "/";
      }
    });
  };

  if (!rol) return <p>Cargando...</p>;

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">
            🍳 CookTogether
          </a>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              {rol === "admin" && (
                <>
                  <li className="nav-item">
                    <button
                      className="btn btn-success ms-3"
                      onClick={() => setModalMostrarCrearUsuario(true)}
                    >
                      Crear Usuario
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-success ms-3"
                      onClick={() => setModalListarUsuariosAbierto(true)}
                    >
                      Listar Usuarios
                    </button>
                  </li>
                </>
              )}
              <li className="nav-item ms-3">
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <div className="container mt-5">
        {/* 🧩 CUADRO DE BIENVENIDA */}
        <div className="card p-4 shadow text-center mb-4">
          <h2 className="text-center mb-4">Bienvenido a CookTogether 👩‍🍳</h2>
          <h5>Explora tus recetas favoritas 🍲</h5>
          <p className="mb-4">
            Aquí puedes ver tus recetas guardadas, crear nuevas y compartir con la comunidad.
          </p>
          <div>
            <button
              className={`btn ${mostrarRecetas ? "btn-secondary" : "btn-success"} me-3`}
              onClick={() => setMostrarRecetas(!mostrarRecetas)}
            >
              {mostrarRecetas ? "Ocultar mis recetas" : "Ver mis recetas"}
            </button>
            <button
              className="btn btn-success"
              onClick={() => setModalMostrarCrearReceta(true)}
            >
              Crear nueva receta
            </button>
          </div>
        </div>

        {/* 🧁 SECCIÓN DE LISTADO DE RECETAS DEBAJO DEL CUADRO */}
        {mostrarRecetas && (
          <div className="mb-5">
            <CardsListarRecetasPageContent
              onClickSuccess={() => setMostrarRecetas(false)}
            />
          </div>
        )}

        {/* MODAL CREAR USUARIO */}
        {rol === "admin" && modalMostrarCrearUsuario && (
          <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalMostrarCrearUsuario(false)}
                ></button>
                <div className="modal-header">
                  <h5 className="mb-3">Formulario de creación de usuario 👨‍💼</h5>
                </div>
                <div className="modal-body">
                  <PrincipalPageContent
                    onClickSuccess={() => setModalMostrarCrearUsuario(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL CREAR RECETA */}
        {modalMostrarCrearReceta && (
          <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalMostrarCrearReceta(false)}
                ></button>
                <div className="modal-header">
                  <h5 className="mb-3">Formulario de creación de receta 👩‍🍳</h5>
                </div>
                <div className="modal-body">
                  <CrearRecetaContent
                    onClickSuccess={() => setModalMostrarCrearReceta(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL LISTAR USUARIOS */}
        {rol === "admin" && modalListarUsuariosAbierto && (
          <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Usuarios registrados 👨‍🍳</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setModalListarUsuariosAbierto(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <TablaUsuariosPage
                    onClickSuccess={() => setModalListarUsuariosAbierto(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PrincipalPage;