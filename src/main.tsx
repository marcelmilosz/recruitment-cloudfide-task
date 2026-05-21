import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Home from './pages/Home';
import Tree from './pages/Tree';
import NodeView from './pages/NodeView';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import Layout from './layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search /> },
      {
        path: "tree",
        element: <Tree />,
        children: [
          // 1. ADD THIS: When the user is at exactly `/tree`, show NodeView 
          // (This triggers the "Select an item" state in NodeView)
          { index: true, element: <NodeView /> },

          // 2. KEEP THIS: When the user is at `/tree/some/file.txt`, show NodeView
          // (This triggers the actual file details in NodeView)
          { path: "*", element: <NodeView /> }
        ]
      },
      // Catch-all 404 page
      { path: "*", element: <NotFound /> }
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);