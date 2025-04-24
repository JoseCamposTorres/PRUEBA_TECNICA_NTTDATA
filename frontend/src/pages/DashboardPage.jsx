import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import DashboardNav from '../components/DashboardNav';

const DashboardContainer = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f3f6f9;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  padding: 30px;
  flex-grow: 1; /* Para que el contenido ocupe el espacio restante */
`;

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <div>No autenticado. Redirigiendo...</div>;
  }

  return (
    <DashboardContainer>
      <DashboardNav />
      <ContentContainer>
        <Outlet /> {/* Aquí se renderizarán los componentes de las rutas anidadas */}
      </ContentContainer>
    </DashboardContainer>
  );
};

export default DashboardPage;