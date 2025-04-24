import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import styled from 'styled-components';

const AuthContainer = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f3f6f9;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Asegura que ocupe al menos la altura de la ventana */
  width: 100%; /* Asegura que ocupe todo el ancho */
  margin: 0;
  padding: 20px;
`;

const FormWrapper = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 40px;
  width: 400px;
  max-width: 95%;

  @media (max-width: 480px) {
    padding: 30px;
  }
`;

const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.95em;
  color: #555;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const Button = styled.button`
  background-color: ${({ isLogin }) => (isLogin ? '#28a745' : '#007bff')};
  color: white;
  padding: 14px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1em;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ isLogin }) => (isLogin ? '#1e7e34' : '#0056b3')};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const LinkContainer = styled.p`
  text-align: center;
  margin-top: 25px;
  font-size: 0.9em;
  color: #777;
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
  font-size: inherit;
`;

const Message = styled.div`
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 0.95em;
  text-align: center;

  &.success {
    background-color: #e6ffec;
    color: #28a745;
    border: 1px solid #c3e6cb;
  }

  &.error {
    background-color: #ffe2e6;
    color: #dc3545;
    border: 1px solid #f5c6cb;
  }
`;

const AuthForms = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1/auth';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const endpoint = isLogin ? `${baseURL}/sign-in` : `${baseURL}/sign-up`;
    const method = 'POST';
    const body = JSON.stringify(formData);
    const headers = { 'Content-Type': 'application/json' };

    try {
      const response = await fetch(endpoint, { method, headers, body });

      if (!response.ok) {
        const error = await response.json();
        setMessage({ text: error.message || `Error en ${isLogin ? 'inicio de sesión' : 'registro'}`, type: 'error' });
        return;
      }

      const data = await response.json();

      if (isLogin) {
        login(data.token, data.user);
        setMessage({ text: `¡Bienvenido, ${data.user.firstName}! Redirigiendo...`, type: 'success' });
        setTimeout(() => navigate('/dashboard'), 1500); // Reducción del tiempo de redirección
      } else {
        setMessage({ text: 'Registro exitoso. ¡Ahora puedes iniciar sesión!', type: 'success' });
        setTimeout(() => setIsLogin(true), 1500);
      }
    } catch (error) {
      console.error(`Error en ${isLogin ? 'inicio de sesión' : 'registro'}`, error);
      setMessage({ text: `Error de red al ${isLogin ? 'iniciar sesión' : 'registrar'}`, type: 'error' });
    }
  };

  const switchAuthMode = () => {
    setIsLogin(!isLogin);
    setMessage(null);
    setFormData({ firstName: '', lastName: '', email: '', password: '' });
  };

  return (
    <AuthContainer>
      <FormWrapper>
        <Title>{isLogin ? 'Iniciar Sesión' : 'Registro'}</Title>
        {message && <Message className={message.type}>{message.text}</Message>}
        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <InputGroup>
                <Label htmlFor="firstName">Nombre:</Label>
                <Input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="lastName">Apellido:</Label>
                <Input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </InputGroup>
            </>
          )}
          <InputGroup>
            <Label htmlFor="email">Correo Electrónico:</Label>
            <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="password">Contraseña:</Label>
            <Input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </InputGroup>
          <Button type="submit" isLogin={isLogin}>
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </Button>
        </Form>
        <LinkContainer>
          {isLogin ? (
            <>
              ¿No tienes una cuenta? <LinkButton onClick={switchAuthMode}>Regístrate</LinkButton>
            </>
          ) : (
            <>
              ¿Ya tienes una cuenta? <LinkButton onClick={switchAuthMode}>Inicia sesión</LinkButton>
            </>
          )}
        </LinkContainer>
      </FormWrapper>
    </AuthContainer>
  );
};

export default AuthForms;