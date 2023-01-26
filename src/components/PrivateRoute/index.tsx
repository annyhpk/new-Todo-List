import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import Loading from '../../components/Loading';

// Auth Context
import useAuthContext from '../../contexts/Auth';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
