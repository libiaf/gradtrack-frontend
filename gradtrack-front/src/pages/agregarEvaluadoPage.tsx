import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { createEvaluado, getZonas, getPoblacionesByZona } from "../api/EvaluadoAPI";
import "../styles/crearEvaluadoStyles.css";
import Header from "../components/Header";

const AgregarEvaluado = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { zonaId, poblacionId } = location.state || {};
  
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    curp: "",
    genero: "Mujer",
    graduado: "SI",
    poblacionId: poblacionId || null
  });
  const [saving, setSaving] = useState<boolean>(false);
  const [zonaInfo, setZonaInfo] = useState<{ zonaName: string, poblacionInfo: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchZonaInfo = async () => {
      if (!zonaId || !poblacionId) return;
      
      try {
        setLoading(true);
        const zonas = await getZonas();
        const zona = zonas.find((z: any) => z.id === zonaId);
        
        const poblaciones = await getPoblacionesByZona(zonaId);
        const poblacion = poblaciones.find((p: any) => p.id === poblacionId);
        
        if (zona && poblacion) {
          setZonaInfo({
            zonaName: `${zona.nombre}, ${zona.estado}`,
            poblacionInfo: `${poblacion.edad} años - Nivel socioeconómico: ${poblacion.nivelSocioeconomico}`
          });
        }
      } catch (err) {
        console.error("Error al obtener información de zona y población:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchZonaInfo();
  }, [zonaId, poblacionId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGeneroChange = (genero: string) => {
    setFormData((prev) => ({
      ...prev,
      genero
    }));
  };

  const handleGraduadoChange = (graduado: string) => {
    setFormData((prev) => ({
      ...prev,
      graduado
    }));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!poblacionId) {
      setError("No se ha seleccionado una población");
      return;
    }
    
    try {
      setSaving(true);
      await createEvaluado({
        ...formData,
        poblacionId
      });
      alert(`Evaluado ${formData.nombre} ${formData.apellidos} creado con éxito`);
      navigate("/pageevaluado");
    } catch (err) {
      setError("Error al crear el evaluado");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/pageevaluado");
  };

  if (!poblacionId) {
    return (
      <>
        <Header title="Evaluados" />
        <div className="agregar-page error">
          Para agregar un evaluado, primero debe seleccionar una zona y una población
          <div className="mt-4">
            <button 
              className="cancel-button" 
              onClick={() => navigate("/pageevaluado")}
            >
              Volver
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="Evaluados" />
      <div className="agregar-page">
        <div className="agregar-container">
          <div className="agregar-header">
            <div className="header-left">
              <button className="back-button" onClick={handleBack}>
                <ArrowLeftIcon className="icon" />
              </button>
              <h2>Nuevo evaluado</h2>
            </div>
          </div>
          
          {zonaInfo && (
            <div className="zona-info-container">
              <div className="zona-info">
                <span className="zona-label">Zona:</span> {zonaInfo.zonaName}
              </div>
              <div className="poblacion-info">
                <span className="poblacion-label">Población:</span> {zonaInfo.poblacionInfo}
              </div>
            </div>
          )}
          
          {loading && (
            <div className="zona-info-loading">
              Cargando información...
            </div>
          )}

          <form onSubmit={handleSubmit} className="agregar-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="apellidos">Apellidos</label>
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Género</label>
                <div className="button-group">
                  <button
                    type="button"
                    className={`option-button ${formData.genero === "Mujer" ? "active" : ""}`}
                    onClick={() => handleGeneroChange("Mujer")}
                  >
                    Mujer
                  </button>
                  <button
                    type="button"
                    className={`option-button ${formData.genero === "Hombre" ? "active" : ""}`}
                    onClick={() => handleGeneroChange("Hombre")}
                  >
                    Hombre
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Graduado</label>
                <div className="button-group">
                  <button
                    type="button"
                    className={`option-button ${formData.graduado === "SI" ? "active" : ""}`}
                    onClick={() => handleGraduadoChange("SI")}
                  >
                    SI
                  </button>
                  <button
                    type="button"
                    className={`option-button ${formData.graduado === "NO" ? "active" : ""}`}
                    onClick={() => handleGraduadoChange("NO")}
                  >
                    NO
                  </button>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="curp">CURP</label>
                <input
                  type="text"
                  id="curp"
                  name="curp"
                  value={formData.curp}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-divider"></div>

            <div className="form-buttons">
              <button 
                type="button" 
                className="cancel-button" 
                onClick={handleCancel}
                disabled={saving}
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="submit-button"
                disabled={saving}
              >
                {saving ? "Creando..." : "Crear"}
              </button>
            </div>
          </form>
          
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </>
  );
};

export default AgregarEvaluado;