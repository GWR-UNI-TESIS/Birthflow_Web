import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, beforeEach, expect, vi } from 'vitest'
import LoginComponent from '../../src/pages/Auth/components/LoginComponent'

// Simula matchMedia para evitar errores con AntD
beforeAll(() => {
  window.matchMedia = window.matchMedia || function () {
    return {
      matches: false,
      media: '',
      onchange: null,
      addListener: () => { },
      removeListener: () => { },
      addEventListener: () => { },
      removeEventListener: () => { },
      dispatchEvent: () => { },
    };
  };
})

describe('LoginComponent', () => {
  const mockHandleLogin = vi.fn()

  beforeEach(() => {
    render(
      <MemoryRouter>
        <LoginComponent authError="" handleLogin={mockHandleLogin} loading={false} />
      </MemoryRouter>
    )
  })

  it('renderiza correctamente los campos y el botón', () => {
    expect(screen.getByPlaceholderText(/Ingresa tu nombre de usuario/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Ingresa tu contraseña/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument()
  })

  it('envía el formulario correctamente', async () => {
    const user = userEvent.setup()

    await user.type(screen.getByPlaceholderText(/Ingresa tu nombre de usuario/i), 'usuario@example.com')
    await user.type(screen.getByPlaceholderText(/Ingresa tu contraseña/i), '123456')
    await user.click(screen.getByRole('button', { name: /Iniciar Sesión/i }))

    expect(mockHandleLogin).toHaveBeenCalled()
    expect(mockHandleLogin).toHaveBeenCalledWith({
      email: 'usuario@example.com',
      password: '123456'
    })
  })

  it('muestra un mensaje de error si `authError` está presente', () => {
    render(
      <MemoryRouter>
        <LoginComponent
          authError="Credenciales inválidas"
          handleLogin={vi.fn()}
          loading={false}
        />
      </MemoryRouter>
    )

    expect(screen.getByText(/Credenciales inválidas/i)).toBeInTheDocument()
  })
})
