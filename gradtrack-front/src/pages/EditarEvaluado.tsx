import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Evaluado } from "my-types";
import { getEvaluadoById, updateEvaluado } from "../api/EvaluadoAPI";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import "../styles/editarEvaluado.css";
import Header from "../components/Header";

const EditarEvaluado = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Evaluado>>({
    nombre: "",
    apellidos: "",
    curp: "",
    genero: "",
    graduado: ""
  });
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    const fetchEvaluado = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getEvaluadoById(parseInt(id));
        setFormData({
          nombre: data.nombre,
          apellidos: data.apellidos,
          curp: data.curp,
          genero: data.genero,
          graduado: data.graduado
        });
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
    
    if (!id) return;
    
    try {
      setSaving(true);
      await updateEvaluado(parseInt(id), formData);
      navigate("/pageevaluado");
    } catch (err) {
      setError("Error al actualizar el evaluado");
      console.error(err);
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/pageevaluado");
  };

  if (loading) {
    return <div className="editar-page loading">Cargando...</div>;
  }

  if (error && !loading) {
    return <div className="editar-page error">{error}</div>;
  }

  return (
    <>
      <Header title="Evaluados" />
      <div className="editar-page">
        <div className="editar-container">
          <div className="editar-header">
            <div className="header-left">
              <button className="back-button" onClick={handleBack}>
                <ArrowLeftIcon className="icon" />
              </button>
              <h2>Editar</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="editar-form">
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
                {saving ? "Guardando..." : "Modificar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditarEvaluado;