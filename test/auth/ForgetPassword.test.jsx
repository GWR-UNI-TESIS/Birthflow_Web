import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ForgetPassword from '../../src/pages/Auth/ForgetPassword'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import * as ResetService from '../../src/services/reset-password-services/reset-password-service'



// ✅ Registro del mock con factory
vi.mock('../../src/services/reset-password-services/reset-password-service', () => {
    return {
        requestResetCode: vi.fn().mockResolvedValue({ id: 'user-id-123' }),
        validateOtp: vi.fn().mockResolvedValue(),
        resetPassword: vi.fn().mockResolvedValue()
    }
})

describe('ForgetPassword - Paso 1', () => {
    it('envía el correo electrónico y avanza al paso 2', async () => {
        const user = userEvent.setup()

        render(
            <MemoryRouter>
                <ForgetPassword />
            </MemoryRouter>
        )

        // Ingresar el correo
        const inputEmail = screen.getByPlaceholderText(/usuario@ejemplo.com/i)
        await user.type(inputEmail, 'test@example.com')

        // Hacer clic en "Siguiente"
        const botonSiguiente = screen.getByRole('button', { name: /siguiente/i })
        await user.click(botonSiguiente)

        // Esperar a que se muestre el input OTP (paso 2)
        const inputOtp = await screen.findByPlaceholderText(/123456/i)
        expect(inputOtp).toBeInTheDocument()
    })
})

describe('ForgetPassword - Paso 2', () => {
    it('valida el código OTP y avanza al paso 3', async () => {
        const user = userEvent.setup()

        render(
            <MemoryRouter>
                <ForgetPassword />
            </MemoryRouter>
        )

        // Paso 1: simula entrada de correo y envío
        await user.type(screen.getByPlaceholderText(/usuario@ejemplo.com/i), 'test@example.com')
        await user.click(screen.getByRole('button', { name: /siguiente/i }))

        // Paso 2: OTP
        const otpInput = await screen.findByPlaceholderText(/123456/i)
        await user.type(otpInput, '654321')
        await user.click(screen.getByRole('button', { name: /siguiente/i }))

        // Paso 3: espera campos de nueva contraseña
        expect(await screen.findByLabelText(/nueva contraseña/i)).toBeInTheDocument()
        expect(await screen.findByLabelText(/confirmar contraseña/i)).toBeInTheDocument()

        // Validar que se llamó a validateOtp
        const validateOtpMock = vi.mocked(ResetService.validateOtp)

        expect(validateOtpMock).toHaveBeenCalledWith({
          userId: 'user-id-123',
          otpCode: '654321'
        })
    })
})