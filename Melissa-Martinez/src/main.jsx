import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from 'react-router-dom';

import { Home } from './pages/home/home';
import { UserCreate } from "./pages/user-create/user-create";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/crear",
    element: <UserCreate />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
