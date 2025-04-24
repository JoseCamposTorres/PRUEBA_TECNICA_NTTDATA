import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForms from './components/AuthForms';
import DashboardPage from './pages/DashboardPage';
import { AuthProvider, useAuth } from './auth/AuthContext';
import OficinasPage from './pages/OficinasPage';
import EmpleadosPage from './pages/EmpleadosPage';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<AuthForms />} />
          <Route path="/register" element={<AuthForms />} />
          <Route path="/dashboard/*" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}>
            <Route path="oficinas" element={<OficinasPage />} />
            <Route path="empleados" element={<EmpleadosPage />} />
            <Route index element={<div>Bienvenido al Dashboard</div>} />
          </Route>
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;