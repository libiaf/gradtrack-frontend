import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Evaluado} from "my-types";
import { getEvaluadoById } from "../api/EvaluadoAPI";
import { PencilSquareIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import "../styles/detallesEvaluado.css";
import Header from "../components/Header";

const DetallesEvaluado = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [evaluado, setEvaluado] = useState<Evaluado | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvaluado = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getEvaluadoById(parseInt(id));
        setEvaluado(data);
        setError(null);
      } catch (err) {
        setError("Error al cargar los datos del evaluado");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluado();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    navigate(`/evaluados/edit/${id}`);
  };

  if (loading) {
    return <div className="detalles-page loading">Cargando...</div>;
  }

  if (error || !evaluado) {
    return <div className="detalles-page error">{error || "No se encontró el evaluado"}</div>;
  }

  return (
    <>

    <Header title="Evaluados"/>
    <div className="detalles-page">
      <div className="detalles-container">
        <div className="detalles-header">
          <div className="header-left">
            <button className="back-button" onClick={handleBack}>
              <ArrowLeftIcon className="icon" />
            </button>
            <h2>Detalles del Evaluado</h2>
          </div>
          <button className="edit-button" onClick={handleEdit}>
            <PencilSquareIcon className="icon" />
            Editar
          </button>
        </div>

        <div className="detalles-content">
          <div className="detalles-card">
            <h3 className="section-title">Información Personal</h3>
            <div className="detalles-row">
              <div className="detalles-item">
                <span className="detalles-label">Nombre:</span>
                <span className="detalles-value">{evaluado.nombre}</span>
              </div>
              <div className="detalles-item">
                <span className="detalles-label">Apellidos:</span>
                <span className="detalles-value">{evaluado.apellidos}</span>
              </div>
            </div>

            <div className="detalles-divider"></div>

            <div className="detalles-row">
              <div className="detalles-item">
                <span className="detalles-label">Género:</span>
                <span className="detalles-value">{evaluado.genero}</span>
              </div>
              <div className="detalles-item">
                <span className="detalles-label">Graduado:</span>
                <span className="detalles-value">{evaluado.graduado}</span>
              </div>
            </div>

            <div className="detalles-divider"></div>

            <div className="detalles-row">
              <div className="detalles-item full-width">
                <span className="detalles-label">CURP:</span>
                <span className="detalles-value">{evaluado.curp}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default DetallesEvaluado;