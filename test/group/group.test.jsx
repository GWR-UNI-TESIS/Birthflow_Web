import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { describe, it, vi, beforeEach, expect } from 'vitest';


import GroupForm from '../../src/pages/groups/components/Form/GroupForm';
import { createGroup, updateGroup } from '../../src/services/groups/groups-service';
import { message } from 'antd';

beforeAll(() => {
  window.matchMedia = window.matchMedia || function () {
    return {
      matches: false,
      media: '',
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  };
});

vi.mock('antd', async () => {
  const antd = await vi.importActual('antd');
  return {
    ...antd,
    message: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

vi.mock('../../src/services/groups/groups-service', () => ({
  createGroup: vi.fn(),
  updateGroup: vi.fn(),
}));



describe('GroupForm', () => {
  const mockOnRefresh = vi.fn();
  const mockSetEditingGroup = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('muestra el botón para crear grupo', () => {
    render(<GroupForm onRefresh={mockOnRefresh} editingGroup={null} setEditingGroup={mockSetEditingGroup} />);
    expect(screen.getByRole('button', { name: /Crear grupo/i })).toBeInTheDocument();
  });

  it('abre el modal al hacer clic en "Crear grupo"', async () => {
    render(<GroupForm onRefresh={mockOnRefresh} editingGroup={null} setEditingGroup={mockSetEditingGroup} />);
    fireEvent.click(screen.getByRole('button', { name: /Crear grupo/i }));
    expect(await screen.findByText('Crear Grupo')).toBeInTheDocument();
  });

  it('crea un grupo exitosamente', async () => {
    createGroup.mockResolvedValue({});
    const user = userEvent.setup();

    render(<GroupForm onRefresh={mockOnRefresh} editingGroup={null} setEditingGroup={mockSetEditingGroup} />);
    fireEvent.click(screen.getByRole('button', { name: /Crear grupo/i }));

    await user.type(screen.getByLabelText(/Nombre del grupo/i), 'Grupo Nuevo');
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    await waitFor(() => {
      expect(createGroup).toHaveBeenCalledWith({ Id: 0, groupName: 'Grupo Nuevo' });
      expect(message.success).toHaveBeenCalledWith('Grupo creado con éxito!');
      expect(mockOnRefresh).toHaveBeenCalled();
      expect(mockSetEditingGroup).toHaveBeenCalledWith(null);
    });
  });

  it('actualiza un grupo exitosamente', async () => {
    updateGroup.mockResolvedValue({});
    const user = userEvent.setup();
    const editingGroup = { id: 5, groupName: 'Grupo Viejo' };

    render(<GroupForm onRefresh={mockOnRefresh} editingGroup={editingGroup} setEditingGroup={mockSetEditingGroup} />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('Grupo Viejo')).toBeInTheDocument();
    });

    await user.clear(screen.getByLabelText(/Nombre del grupo/i));
    await user.type(screen.getByLabelText(/Nombre del grupo/i), 'Grupo Editado');
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    await waitFor(() => {
      expect(updateGroup).toHaveBeenCalledWith({ Id: 5, groupName: 'Grupo Editado' });
      expect(message.success).toHaveBeenCalledWith('Grupo actualizado con éxito!');
      expect(mockOnRefresh).toHaveBeenCalled();
      expect(mockSetEditingGroup).toHaveBeenCalledWith(null);
    });
  });

  it('muestra error si no se completa el campo requerido', async () => {
    const user = userEvent.setup();

    render(<GroupForm onRefresh={mockOnRefresh} editingGroup={null} setEditingGroup={mockSetEditingGroup} />);
    fireEvent.click(screen.getByRole('button', { name: /Crear grupo/i }));
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    expect(await screen.findByText('Por favor ingrese un nombre!')).toBeInTheDocument();
    expect(createGroup).not.toHaveBeenCalled();
  });

  it('muestra mensaje de error si la API falla', async () => {
    createGroup.mockRejectedValue(new Error('Error del servidor'));
    const user = userEvent.setup();

    render(<GroupForm onRefresh={mockOnRefresh} editingGroup={null} setEditingGroup={mockSetEditingGroup} />);
    fireEvent.click(screen.getByRole('button', { name: /Crear grupo/i }));
    await user.type(screen.getByLabelText(/Nombre del grupo/i), 'Grupo Fallido');
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));

    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith('Error en la validación o al guardar');
    });
  });
});
