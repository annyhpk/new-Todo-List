import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// main
import Loading from './components/Loading';
import MainPage from './pages/MainPage';
import GlobalNavBar from './components/GlobalNavBar';

// lazy loading
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const TodoPage = lazy(() => import('./pages/TodoPage'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <GlobalNavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
