import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

const App = () => {
  return (
    <div className="d-flex flex-column flex-lg-row min-vh-100">
      <Nav />
      <div className="flex-grow-1">
        <Outlet />
      </div>
    </div>
  );
};

export default App;