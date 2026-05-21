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
import { APP_PATHS } from './config/paths.config';

const router = createBrowserRouter([
  {
    path: APP_PATHS.HOME,
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      // Remove the leading slash for React Router child paths
      { path: APP_PATHS.SEARCH.replace('/', ''), element: <Search /> },
      {
        path: APP_PATHS.TREE.replace('/', ''),
        element: <Tree />,
        children: [
          { index: true, element: <NodeView /> },
          { path: "*", element: <NodeView /> }
        ]
      },
      { path: "*", element: <NotFound /> }
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);