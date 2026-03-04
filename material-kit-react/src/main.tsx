import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client/react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router';

import App from './app';
import client from './graphql/apolloClient';
import { routesSection } from './routes/sections';
import { ErrorBoundary } from './routes/components';

// ----------------------------------------------------------------------

const router = createBrowserRouter([
  {
    Component: () => (
      <App>
        <Outlet />
      </App>
    ),
    errorElement: <ErrorBoundary />,
    children: routesSection,
  },
]);

const root = createRoot(document.getElementById('root')!);

root.render(
    <ApolloProvider client={client}>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </ApolloProvider>
);
