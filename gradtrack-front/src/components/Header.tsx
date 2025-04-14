import perfilImg from "../images/admin.png";

type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <header className="header-fixed d-flex justify-content-between p-3 bg-white shadow-sm">
      <h1 className="fs-1 mt-3 ms-4 evaluados">{title}</h1>
      <div className="d-flex align-items-center perfil">
        <img src={perfilImg} alt="Foto de Perfil" className="img-fluid" style={{ maxWidth: "130px" }} />
        <div>
          <h2 className="fs-4 mb-0 mt-2">Bienvenido, Emilio Castro</h2>
          <h3 className="fs-4 mt-0">Administrador</h3>
        </div>
      </div>
    </header>
  );
}
