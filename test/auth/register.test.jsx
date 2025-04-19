import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { describe, it, beforeEach, beforeAll, expect, vi } from 'vitest';
import RegisterComponent from '../../src/pages/Auth/components/RegisterComponent';

describe('RegisterComponent', () => {
  const mockHandleRegister = vi.fn();

  beforeAll(() => {
    window.matchMedia = window.matchMedia || function () {
      return {
        matches: false,
        media: '',
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      };
    };
  });

  beforeEach(() => {
    mockHandleRegister.mockClear();
    render(<RegisterComponent authError="" handleRegister={mockHandleRegister} loading={false} />);
  });

  it('renderiza correctamente todos los campos y el botón', () => {
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByLabelText('Apellido')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Nombre de Usuario')).toBeInTheDocument();
    expect(screen.getByLabelText('Número de Teléfono')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Registrarse/i })).toBeInTheDocument();
  });

  it('envía el formulario correctamente', async () => {
    const user = userEvent.setup();

    await user.type(screen.getByLabelText('Nombre'), 'Juan');
    await user.type(screen.getByLabelText('Apellido'), 'Pérez');
    await user.type(screen.getByLabelText('Email'), 'juan@example.com');
    await user.type(screen.getByLabelText('Nombre de Usuario'), 'juanp');
    await user.type(screen.getByLabelText('Número de Teléfono'), '123456789');

    await user.click(screen.getByRole('button', { name: /Registrarse/i }));

    expect(mockHandleRegister).toHaveBeenCalled();
    expect(mockHandleRegister).toHaveBeenCalledWith({
      name: 'Juan',
      secondName: 'Pérez',
      email: 'juan@example.com',
      username: 'juanp',
      phoneNumber: '123456789',
    });
  });

  it('muestra un mensaje de error si `authError` está presente', () => {
    render(
      <RegisterComponent
        authError="Este correo ya está en uso"
        handleRegister={mockHandleRegister}
        loading={false}
      />
    );
    expect(screen.getByText(/Este correo ya está en uso/i)).toBeInTheDocument();
  });
});
