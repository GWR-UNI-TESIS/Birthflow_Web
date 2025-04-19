import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, expect, beforeEach, beforeAll } from 'vitest';
import '@testing-library/jest-dom'; 

import UserForm from '../../src/pages/Configuration/components/Form/UpdatePasswordForm';
import { message } from 'antd';
import { useAuth } from '../../src/contexts/auth-context';

vi.mock('../../src/services/account-services/account-service', () => ({
  updateUserPassword: vi.fn(),
}));
import { updateUserPassword } from '../../src/services/account-services/account-service';

vi.mock('../../src/contexts/auth-context', () => ({
  useAuth: () => ({
    setIsTemporalPassword: vi.fn(),
  }),
}));

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

describe('UserForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('muestra errores si los campos están vacíos', async () => {
    render(<UserForm />);
    fireEvent.click(screen.getByRole('button', { name: 'Actualizar Contraseña'}));

    expect(await screen.findByText('Ingrese su contraseña actual')).toBeInTheDocument();
    expect(screen.getByText('Ingrese la nueva contraseña')).toBeInTheDocument();
    expect(screen.getByText('Confirme la nueva contraseña')).toBeInTheDocument();
  });

  it('muestra error si las contraseñas no coinciden', async () => {
    const user = userEvent.setup();
    render(<UserForm />);

    await user.type(screen.getByLabelText('Contraseña Actual'), '123456');
    await user.type(screen.getByLabelText('Nueva Contraseña'), 'abcdef');
    await user.type(screen.getByLabelText('Confirmar Contraseña'), 'ghijkl');

    fireEvent.click(screen.getByRole('button', { name: 'Actualizar Contraseña'}));

    expect(await screen.findByText('Las contraseñas no coinciden')).toBeInTheDocument();
  });

  it('llama a updateUserPassword con los datos correctos y muestra mensaje de éxito', async () => {
    const user = userEvent.setup();
    updateUserPassword.mockResolvedValue({});

    render(<UserForm />);

    await user.type(screen.getByLabelText('Contraseña Actual'), '123456');
    await user.type(screen.getByLabelText('Nueva Contraseña'), 'abcdef');
    await user.type(screen.getByLabelText('Confirmar Contraseña'), 'abcdef');

    fireEvent.click(screen.getByRole('button', { name: 'Actualizar Contraseña' }));

    await waitFor(() => {
      expect(updateUserPassword).toHaveBeenCalledWith({
        oldPassword: '123456',
        newPassword: 'abcdef',
      });
      expect(message.success).toHaveBeenCalledWith('Contraseña actualizada exitosamente');
    });
  });

  it('muestra mensaje de error si updateUserPassword falla', async () => {
    const user = userEvent.setup();
    updateUserPassword.mockRejectedValue(new Error('Error del servidor'));

    render(<UserForm />);

    await user.type(screen.getByLabelText('Contraseña Actual'), '123456');
    await user.type(screen.getByLabelText('Nueva Contraseña'), 'abcdef');
    await user.type(screen.getByLabelText('Confirmar Contraseña'), 'abcdef');

    fireEvent.click(screen.getByRole('button', { name: 'Actualizar Contraseña'}));

    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith('Error del servidor');
    });
  });
});
