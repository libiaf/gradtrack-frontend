import logoImg from "../images/logo.png";
import configImg from "../images/configuracion.png";
import "../styles/navStyles.css";

export default function Nav() {
  return (
    <nav className="nav-class col-lg-3 col-xl-2 text-white p-4 d-flex flex-column min-vh-100">
      <div className="text-center mb-4">
        <img
          src={logoImg}
          alt="Logo"
          className="img-fluid"
          style={{ maxWidth: "240px", width: "100%" }}
        />
      </div>

      <a
        href="#"
        className="nav-link d-block rounded p-2 text-center text-decoration-none mb-3 fs-5"
      >
        Evaluaciones
      </a>

      <a
        href="#"
        className="nav-link d-block rounded p-2 text-center text-decoration-none fs-5"
      >
        Evaluados
      </a>

      <div className="mt-auto mb-5 d-flex justify-content-center config">
        <div>
          <img src={configImg} alt="Icono Configuración" />
        </div>
        <div className="rounded p-2 me-3">
          <a
            href="#"
            className="text-white text-decoration-none fs-5"
            style={{
              fontFamily: "'InterSemiBold'",
            }}
          >
            Configuración
          </a>
        </div>
      </div>
    </nav>
  );
}
