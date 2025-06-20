import { publicRoutes } from '@/app/routes/routeType/public';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([...publicRoutes]);

export function AppRoutes() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
