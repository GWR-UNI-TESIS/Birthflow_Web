import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // ✅ Aquí importamos correctamente userEvent
import '@testing-library/jest-dom';
import { describe, it, beforeEach, beforeAll, expect, vi } from 'vitest';
import LoginComponent from '../../src/pages/Auth/components/LoginComponent';

describe('LoginComponent', () => {
  const mockHandleLogin = vi.fn();

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
    mockHandleLogin.mockClear(); // Limpiar entre tests
    render(<LoginComponent authError="" handleLogin={mockHandleLogin} loading={false} />);
  });

  it('renderiza correctamente los campos y el botón', () => {
    expect(screen.getByLabelText(/Nombre de Usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
  });

  it('envía el formulario correctamente', async () => {
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/Nombre de Usuario/i), 'usuario@example.com');
    await user.type(screen.getByLabelText(/Contraseña/i), '123456');
    await user.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

    expect(mockHandleLogin).toHaveBeenCalled();
    expect(mockHandleLogin).toHaveBeenCalledWith({
      email: 'usuario@example.com',
      password: '123456'
    });
  });

  it('muestra un mensaje de error si `authError` está presente', () => {
    render(
      <LoginComponent
        authError="Credenciales inválidas"
        handleLogin={mockHandleLogin}
        loading={false}
      />
    );
    expect(screen.getByText(/Credenciales inválidas/i)).toBeInTheDocument();
  });
});
