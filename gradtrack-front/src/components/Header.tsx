import perfilImg from "../images/admin.png";
import "../styles/headerStyles.css";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <header className="header-fixed d-flex justify-content-between p-3 bg-white shadow-sm">
      <h1 className="fs-2 mt-3 ms-4 evaluados">{title}</h1>
      <div className="d-flex align-items-center perfil">
        <img src={perfilImg} alt="Foto de Perfil" className="img-fluid" />
        <div>
          <h2 className="mb-0 mt-2">Bienvenido, Emilio Castro</h2>
          <h3 className="mt-0">Administrador</h3>
        </div>
      </div>
    </header>
  );
}