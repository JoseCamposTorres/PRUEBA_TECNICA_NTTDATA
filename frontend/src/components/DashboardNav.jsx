import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background-color: #343a40; /* Un gris oscuro para la barra de navegación */
  color: white;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #f8f9fa; /* Un gris más claro al pasar el ratón */
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: bold;
  transition: color 0.3s ease;
  font-size: inherit;

  &:hover {
    color: #dc3545; /* Rojo al pasar el ratón para indicar peligro */
  }
`;

const DashboardNav = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <NavContainer>
      <NavLinks>
        <NavLink to="/dashboard/oficinas">Oficinas</NavLink>
        <NavLink to="/dashboard/empleados">Empleados</NavLink>
      </NavLinks>
      <LogoutButton onClick={handleLogout}>Cerrar Sesión</LogoutButton>
    </NavContainer>
  );
};

export default DashboardNav;