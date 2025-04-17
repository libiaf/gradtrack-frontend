import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ListEvaluadoPage from "../pages/ListEvaluadoPage";
import ErrorPage from "../pages/ErrorPage";
import GraphsPage from "../pages/GraphsPage";
import AgregarEvaluado from "../pages/AgregarEvaluadoPage";
import DetallesEvaluado from "../pages/DetallesEvaluado";
import EditarEvaluado from "../pages/EditarEvaluado";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/graphs",
          element: <GraphsPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/pageevaluado",
          element: <ListEvaluadoPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/agregar-evaluado",
          element: <AgregarEvaluado />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/getdetalles/:id",
          element: <DetallesEvaluado />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/evaluados/edit/:id",
          element: <EditarEvaluado />,
          errorElement: <ErrorPage />,
        },
      ],
      errorElement: <ErrorPage />,
    },
  ]);
export default router;
