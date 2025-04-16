import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ListEvaluadoPage from "../pages/ListEvaluadoPage";
import ErrorPage from "../pages/ErrorPage";
import GraphsPage from "../pages/GraphsPage";
// import PageEvaluado from "../components/PageEvaluado";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        // {
        //   path: "/evaluados",
        //   element: <ListEvaluadoPage />,
        //   errorElement: <ErrorPage />,
        // },
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
      ],
      errorElement: <ErrorPage />,
    },
  ]);
export default router;
