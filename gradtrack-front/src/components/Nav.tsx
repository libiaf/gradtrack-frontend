import logoImg from "../images/logo.png";
import configImg from "../images/configuracion.png";
import "../styles/navStyles.css";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="nav-class col-12 col-md-12 col-lg-3 col-xl-2 text-white p-3 d-flex flex-column custom-nav-height">
      <div className="nav-mobile-container">
        <div className="logo-container">
          <img src={logoImg} alt="Logo" className="img-fluid" />
        </div>
        <div className="nav-links d-flex align-items-center">
          <NavLink to="/graphs" className="nav-link rounded p-2 text-center text-decoration-none">
            Evaluaciones
          </NavLink>
          <NavLink to="/pageevaluado" className="nav-link rounded p-2 text-center text-decoration-none">
            Evaluados
          </NavLink>
        </div>
        <div className="config d-flex align-items-center">
          <div className="config-icon">
            <img src={configImg} alt="Icono Configuración" />
          </div>
          <div className="config-text rounded p-2">
            <a href="#" className="text-white text-decoration-none">
              Configuración
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
