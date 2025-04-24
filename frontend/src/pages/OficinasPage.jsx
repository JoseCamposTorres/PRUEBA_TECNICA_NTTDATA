import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../auth/AuthContext';
import Swal from 'sweetalert2';

const OfficesContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const OfficeList = styled.ul`
  list-style: none;
  padding: 0;
`;

const OfficeItem = styled.li`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ActionButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.9em;
  margin-left: 10px;

  &:hover {
    background-color: #0056b3;
  }

  &.edit {
    background-color: #ffc107;
    &:hover {
      background-color: #e0a800;
    }
  }

  &.delete {
    background-color: #dc3545;
    &:hover {
      background-color: #c82333;
    }
  }
`;

const CreateOfficeForm = styled.form`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9em;
  color: #555;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled(ActionButton)`
  width: fit-content;
`;

const EditFormContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const EditInput = styled(Input)`
  flex-grow: 1;
`;

const OficinasPage = () => {
  const [oficinas, setOficinas] = useState([]);
  const [nombreOficina, setNombreOficina] = useState('');
  const [direccionOficina, setDireccionOficina] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editNombre, setEditNombre] = useState('');
  const [editDireccion, setEditDireccion] = useState('');

  const { token } = useAuth();
  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

  useEffect(() => {
    fetchOficinas();
  }, []);

  const fetchOficinas = async () => {
    try {
      const response = await fetch(`${baseURL}/oficinas`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setOficinas(data);
    } catch (error) {
      console.error("Error al listar oficinas:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error al listar',
        text: error.message,
      });
    }
  };

  const crearOficina = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseURL}/oficinas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ nombreOficina, direccionOficina }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const nuevaOficina = await response.json();
      setOficinas([...oficinas, nuevaOficina]);
      setNombreOficina('');
      setDireccionOficina('');
      Swal.fire({
        icon: 'success',
        title: 'Oficina creada',
        text: 'La oficina se ha creado correctamente.',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error al crear oficina:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error al crear',
        text: error.message,
      });
    }
  };

  const handleEditar = (oficina) => {
    setIsEditing(oficina.idOficina);
    setEditNombre(oficina.nombreOficina);
    setEditDireccion(oficina.direccionOficina);
  };

  const guardarEdicion = async (id) => {
    try {
      const response = await fetch(`${baseURL}/oficinas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ nombreOficina: editNombre, direccionOficina: editDireccion }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const oficinaEditada = await response.json();
      setOficinas(oficinas.map(oficina =>
        oficina.idOficina === id ? oficinaEditada : oficina
      ));
      setIsEditing(null);
      Swal.fire({
        icon: 'success',
        title: 'Oficina actualizada',
        text: 'La oficina se ha actualizado correctamente.',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error al editar oficina:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error al editar',
        text: error.message,
      });
    }
  };

  const eliminarOficina = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar esta oficina?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${baseURL}/oficinas/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
          }
          setOficinas(oficinas.filter(oficina => oficina.idOficina !== id));
          Swal.fire(
            '¡Eliminado!',
            'La oficina ha sido eliminada.',
            'success'
          );
        } catch (error) {
          console.error("Error al eliminar oficina:", error);
          Swal.fire({
            icon: 'error',
            title: 'Error al eliminar',
            text: error.message,
          });
        }
      }
    });
  };

  return (
    <OfficesContainer>
      <Title>Gestión de Oficinas</Title>

      <CreateOfficeForm onSubmit={crearOficina}>
        <h3>Crear Nueva Oficina</h3>
        <InputGroup>
          <Label htmlFor="nombreOficina">Nombre:</Label>
          <Input
            type="text"
            id="nombreOficina"
            value={nombreOficina}
            onChange={(e) => setNombreOficina(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="direccionOficina">Dirección:</Label>
          <Input
            type="text"
            id="direccionOficina"
            value={direccionOficina}
            onChange={(e) => setDireccionOficina(e.target.value)}
            required
          />
        </InputGroup>
        <SubmitButton type="submit">Crear Oficina</SubmitButton>
      </CreateOfficeForm>

      <h3>Listado de Oficinas</h3>
      {oficinas.length === 0 ? (
        <p>No hay oficinas registradas.</p>
      ) : (
        <OfficeList>
          {oficinas.map((oficina) => (
            <OfficeItem key={oficina.idOficina}>
              <div>
                <strong>{oficina.nombreOficina}</strong>
                <p>{oficina.direccionOficina}</p>
              </div>
              <div>
                {isEditing === oficina.idOficina ? (
                  <EditFormContainer>
                    <EditInput
                      type="text"
                      value={editNombre}
                      onChange={(e) => setEditNombre(e.target.value)}
                    />
                    <EditInput
                      type="text"
                      value={editDireccion}
                      onChange={(e) => setEditDireccion(e.target.value)}
                    />
                    <ActionButton onClick={() => guardarEdicion(oficina.idOficina)}>Guardar</ActionButton>
                    <ActionButton onClick={() => setIsEditing(null)}>Cancelar</ActionButton>
                  </EditFormContainer>
                ) : (
                  <>
                    <ActionButton className="edit" onClick={() => handleEditar(oficina)}>Editar</ActionButton>
                    <ActionButton className="delete" onClick={() => eliminarOficina(oficina.idOficina)}>Eliminar</ActionButton>
                  </>
                )}
              </div>
            </OfficeItem>
          ))}
        </OfficeList>
      )}
    </OfficesContainer>
  );
};

export default OficinasPage;