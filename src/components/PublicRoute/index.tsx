import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Auth Context
import useAuthContext from '../../contexts/Auth';

type Props = { children: JSX.Element };

const PublicRoute = ({ children }: Props) => {
  const location = useLocation();
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PublicRoute;
