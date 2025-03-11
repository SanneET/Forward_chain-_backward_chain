import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import "./App.css";
import ForwardChain from "./views/ForwardChain";
import Home from "./views/Home";
import Energidrik from "./views/Energidrik";

const router = createBrowserRouter([
  {
    path: "/aisystems/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "first",
        element: <ForwardChain />,
      },{
        path: "second",
        element: <Energidrik />,
      },
      
      
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
