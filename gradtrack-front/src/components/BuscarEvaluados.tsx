import "../styles/buscadorStyles.css";

type Props = {
  searchTerm: string;
  onSearch: (term: string) => void;
};

const BuscarEvaluados = ({ searchTerm, onSearch }: Props) => {
  return (
    <div className="buscador-container">
      <input
        type="text"
        className="buscador-input"
        placeholder="Buscar evaluado..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default BuscarEvaluados;



