import '../styles/eliminarPopupStyles.css';

interface EliminarPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const EliminarPopup = ({ isOpen, onClose, onConfirm}: EliminarPopupProps) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2 className="popup-title">Eliminar evaluado</h2>
        <div className="popup-divider"></div>
        <p className="popup-message">¿Estás seguro de que quieres eliminar a este evaluado?</p>
        <div className="popup-buttons">
          <button className="popup-cancel-btn" onClick={onClose}>
            Cancelar
          </button>
          <button className="popup-delete-btn" onClick={onConfirm}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EliminarPopup;