// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Layout from './layout';

// Define the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // The Layout wraps everything
    children: [
      { index: true, element: <Home /> }, // Home page at "/"
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);