import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// main
import PrivateRoute from './components/PrivateRoute';
import MainPage from './pages/MainPage';
import GlobalNavBar from './components/GlobalNavBar';

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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/todo" element={<PrivateRoute />}>
          <Route path="/todo" element={<TodoPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
