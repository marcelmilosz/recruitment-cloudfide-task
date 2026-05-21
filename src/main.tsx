// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Layout from './layout';
import Tree from './pages/Tree';
import NodeDetails from './pages/NodeDetails';

// Define the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "tree",
        element: <Tree />,
        children: [
          // This renders inside the <Outlet /> in Tree.tsx
          { path: "*", element: <NodeDetails /> }
        ]
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);