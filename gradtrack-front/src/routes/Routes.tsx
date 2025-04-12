import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ListEvaluadoPage from "../pages/ListEvaluadoPage";
import ErrorPage from "../pages/ErrorPage";
import Graphs from "../pages/Graphs";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/evaluados",
          element: <ListEvaluadoPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "/graphs",
          element: <Graphs />,
          errorElement: <ErrorPage />,
        },
      ],
      errorElement: <ErrorPage />,
    },
  ]);
export default router;
