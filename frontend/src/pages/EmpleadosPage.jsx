import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../auth/AuthContext';
import Swal from 'sweetalert2';

const EmployeesContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const EmployeeList = styled.ul`
  list-style: none;
  padding: 0;
`;

const EmployeeItem = styled.li`
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

const CreateEmployeeForm = styled.form`
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
  flex-direction: column;
  gap: 10px;
`;

const EditInput = styled(Input)`
  margin-bottom: 10px;
`;

const OficinasAsignadas = styled.div`
  margin-top: 10px;
  font-size: 0.85em;
  color: #777;

  strong {
    font-weight: bold;
    color: #555;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 5px 0;
  }

  li {
    margin-left: 15px;
  }
`;

const EmpleadosPage = () => {
  const [empleados, setEmpleados] = useState([]);
  const [oficinasDisponibles, setOficinasDisponibles] = useState([]);
  const [nombres, setNombres] = useState('');
  const [telefono, setTelefono] = useState('');
  const [dni, setDni] = useState('');
  const [direccion, setDireccion] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [oficinasSeleccionadas, setOficinasSeleccionadas] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [empleadoEditando, setEmpleadoEditando] = useState(null);
  const [editNombres, setEditNombres] = useState('');
  const [editTelefono, setEditTelefono] = useState('');
  const [editDni, setEditDni] = useState('');
  const [editDireccion, setEditDireccion] = useState('');
  const [editFechaNacimiento, setEditFechaNacimiento] = useState('');
  const [editOficinasSeleccionadas, setEditOficinasSeleccionadas] = useState([]);

  const { token } = useAuth();
  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

  useEffect(() => {
    fetchEmpleados();
    fetchOficinasDisponibles();
  }, []);

  const fetchOficinasDisponibles = async () => {
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
      setOficinasDisponibles(data);
    } catch (error) {
      console.error("Error al cargar oficinas:", error);
      Swal.fire({ icon: 'error', title: 'Error al cargar oficinas', text: error.message });
    }
  };

  const fetchEmpleados = async () => {
    try {
      const response = await fetch(`${baseURL}/empleados`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEmpleados(data);
    } catch (error) {
      console.error("Error al listar empleados:", error);
      Swal.fire({ icon: 'error', title: 'Error al listar', text: error.message });
    }
  };

  const crearEmpleado = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseURL}/empleados`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombres,
          telefono,
          dni,
          direccion,
          fechaNacimiento,
          oficinas: oficinasSeleccionadas.map(id => ({ idOficina: id })),
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      setNombres('');
      setTelefono('');
      setDni('');
      setDireccion('');
      setFechaNacimiento('');
      setOficinasSeleccionadas([]);
      Swal.fire({ icon: 'success', title: 'Empleado creado', text: 'Empleado registrado correctamente.', timer: 1500, showConfirmButton: false }).then(() => {
        fetchEmpleados(); // Re-fetch employees after successful creation
      });
    } catch (error) {
      console.error("Error al crear empleado:", error);
      Swal.fire({ icon: 'error', title: 'Error al crear', text: error.message });
    }
  };

  const handleEditar = (empleado) => {
    setIsEditing(empleado.idEmpleado);
    setEmpleadoEditando(empleado);
    setEditNombres(empleado.nombres);
    setEditTelefono(empleado.telefono);
    setEditDni(empleado.dni);
    setEditDireccion(empleado.direccion);
    setEditFechaNacimiento(empleado.fechaNacimiento ? empleado.fechaNacimiento.split('T')[0] : '');
    setEditOficinasSeleccionadas(empleado.oficinas ? empleado.oficinas.map(oficina => oficina.idOficina) : []);
  };

  const guardarEdicion = async (id) => {
    try {
      const response = await fetch(`${baseURL}/empleados/${id}/oficinas`, {
        method: 'POST', // Assuming your backend expects POST for updating offices
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editOficinasSeleccionadas),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const empleadoActualizado = await response.json();
      setEmpleados(empleados.map(emp =>
        emp.idEmpleado === id ? { ...emp, oficinas: empleadoActualizado.oficinas } : emp
      ));
      setIsEditing(null);
      setEmpleadoEditando(null);
      setEditOficinasSeleccionadas([]);
      Swal.fire({ icon: 'success', title: '¡Oficinas Asignadas!', text: 'Las oficinas del empleado han sido actualizadas.', icon: 'success' });
    } catch (error) {
      console.error("Error al asignar oficinas:", error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudieron asignar las oficinas.' });
    }
  };

  const eliminarEmpleado = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar este empleado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${baseURL}/empleados/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
          }
          setEmpleados(empleados.filter(empleado => empleado.idEmpleado !== id));
          Swal.fire('¡Eliminado!', 'El empleado ha sido eliminado.', 'success');
        } catch (error) {
          console.error("Error al eliminar empleado:", error);
          Swal.fire({ icon: 'error', title: 'Error al eliminar', text: error.message });
        }
      }
    });
  };

  const handleOficinaChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => parseInt(option.value));
    setOficinasSeleccionadas(selectedOptions);
  };

  const handleEditOficinaChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => parseInt(option.value));
    setEditOficinasSeleccionadas(selectedOptions);
  };

  return (
    <EmployeesContainer>
      <Title>Gestión de Empleados</Title>

      <CreateEmployeeForm onSubmit={crearEmpleado}>
        <h3>Registrar Nuevo Empleado</h3>
        <InputGroup>
          <Label htmlFor="nombres">Nombres:</Label>
          <Input type="text" id="nombres" value={nombres} onChange={(e) => setNombres(e.target.value)} required />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="telefono">Teléfono:</Label>
          <Input type="text" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="dni">DNI:</Label>
          <Input type="text" id="dni" value={dni} onChange={(e) => setDni(e.target.value)} required />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="direccion">Dirección:</Label>
          <Input type="text" id="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="fechaNacimiento">Fecha de Nacimiento:</Label>
          <Input type="date" id="fechaNacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="oficinas">Oficinas Asignadas:</Label>
          <select
            id="oficinas"
            multiple
            value={oficinasSeleccionadas}
            onChange={handleOficinaChange}
          >
            {oficinasDisponibles.map(oficina => (
              <option key={oficina.idOficina} value={oficina.idOficina}>
                {oficina.nombreOficina} ({oficina.direccionOficina})
              </option>
            ))}
          </select>
        </InputGroup>
        <SubmitButton type="submit">Registrar Empleado</SubmitButton>
      </CreateEmployeeForm>

      <h3>Listado de Empleados</h3>
      {empleados.length === 0 ? (
        <p>No hay empleados registrados.</p>
      ) : (
        <EmployeeList>
          {empleados.map((empleado) => (
            <EmployeeItem key={empleado.idEmpleado}>
              <div>
                <strong>{empleado.nombres}</strong>
                <p>Teléfono: {empleado.telefono}</p>
                <p>DNI: {empleado.dni}</p>
                <p>Dirección: {empleado.direccion}</p>
                <p>Fecha de Nacimiento: {empleado.fechaNacimiento ? empleado.fechaNacimiento.split('T')[0] : 'N/A'}</p>
                <OficinasAsignadas>
                  <strong>Oficinas:</strong>
                  <ul>
                    {empleado.oficinas && empleado.oficinas.length > 0 ? (
                      empleado.oficinas.map((oficina) => (
                        <li key={oficina.idOficina}>{oficina.nombreOficina} ({oficina.direccionOficina})</li>
                      ))
                    ) : (
                      <li>Trabajo Remoto</li>
                    )}
                  </ul>
                </OficinasAsignadas>
              </div>
              <div>
                {isEditing === empleado.idEmpleado ? (
                  <EditFormContainer>
                    <EditInput type="text" value={editNombres} onChange={(e) => setEditNombres(e.target.value)} placeholder="Nombres" />
                    <EditInput type="text" value={editTelefono} onChange={(e) => setEditTelefono(e.target.value)} placeholder="Teléfono" />
                    <EditInput type="text" value={editDni} onChange={(e) => setEditDni(e.target.value)} placeholder="DNI" />
                    <EditInput type="text" value={editDireccion} onChange={(e) => setEditDireccion(e.target.value)} placeholder="Dirección" />
                    <EditInput type="date" value={editFechaNacimiento} onChange={(e) => setEditFechaNacimiento(e.target.value)} />
                    <InputGroup>
                      <Label htmlFor={`edit-oficinas-${empleadoEditando?.idEmpleado}`}>Oficinas Asignadas:</Label>
                      <select
                        id={`edit-oficinas-${empleadoEditando?.idEmpleado}`}
                        multiple
                        value={editOficinasSeleccionadas}
                        onChange={handleEditOficinaChange}
                      >
                        {oficinasDisponibles.map(oficina => (
                          <option key={oficina.idOficina} value={oficina.idOficina}>
                            {oficina.nombreOficina} ({oficina.direccionOficina})
                          </option>
                        ))}
                      </select>
                    </InputGroup>
                    <ActionButton onClick={() => guardarEdicion(empleadoEditando.idEmpleado)}>Guardar</ActionButton>
                    <ActionButton onClick={() => setIsEditing(null)}>Cancelar</ActionButton>
                  </EditFormContainer>
                ) : (
                  <>
                    <ActionButton className="edit" onClick={() => handleEditar(empleado)}>Editar</ActionButton>
                    <ActionButton className="delete" onClick={() => eliminarEmpleado(empleado.idEmpleado)}>Eliminar</ActionButton>
                  </>
                )}
              </div>
            </EmployeeItem>
          ))}
        </EmployeeList>
      )}
    </EmployeesContainer>
  );
};

export default EmpleadosPage;