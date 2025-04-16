import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ListEvaluadoPage from "../pages/ListEvaluadoPage";
import ErrorPage from "../pages/ErrorPage";
import GraphsPage from "../pages/GraphsPage";
import AgregarEvaluado from "../pages/agregarEvaluadoPage";

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
      ],
      errorElement: <ErrorPage />,
    },
  ]);
export default router;
