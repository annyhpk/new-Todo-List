import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

// component
import GlobalNavBar from './components/GlobalNavBar';
import Loading from './components/Loading';
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
            <Suspense fallback={<Loading />}>
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<Loading />}>
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            </Suspense>
          }
        />
        <Route
          path="/todo"
          element={
            <Suspense fallback={<Loading />}>
              <PrivateRoute>
                <TodoPage />
              </PrivateRoute>
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;
