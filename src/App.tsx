import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// main
import GlobalNavBar from './components/GlobalNavBar';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import MainPage from './pages/MainPage';

// lazy loading
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const TodoPage = lazy(() => import('./pages/TodoPage'));

function App() {
  return (
    <>
      <GlobalNavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          }
        />
        <Route
          path="/todo"
          element={
            <PrivateRoute>
              <TodoPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
