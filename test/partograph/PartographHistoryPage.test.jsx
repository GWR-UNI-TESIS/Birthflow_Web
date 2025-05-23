import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { vi } from 'vitest'
import PartographHistoryPage from '../../src/pages/PartographHistoryPage/index'

import { vi } from 'vitest'

beforeAll(() => {
  // Mock para Ant Design que usa getComputedStyle
  window.getComputedStyle = window.getComputedStyle || (() => ({
    getPropertyValue: () => '',
    display: 'block',
    position: 'static',
    overflow: 'auto',
    height: 'auto',
    width: 'auto'
  }));
});
// Mock del servicio de historial
vi.mock('../../src/services/partograph-history/partograph-history-service', () => ({
  getPartographHistory: vi.fn().mockResolvedValue([
    {
      id: 1,
      changedAt: new Date().toISOString(),
      changedByName: 'Usuario Prueba',
      partographDataJson: JSON.stringify({
        partographLog: {
          Name: 'Test Partograma',
          RecordName: 'EXP-001',
          Date: new Date().toISOString(),
          WorkTime: '4h',
          Observation: 'Observación test'
        },
        cervicalDilationLog: [],
        medicalSurveillanceTableLog: [],
        presentationPositionVarietyLog: [],
        contractionFrequencyLog: [],
        fetalHeartRateLog: [],
        childbirthNoteLog: null
      })
    }
  ])
}))

// Mock del contexto de catálogos
vi.mock('../../src/contexts/catalog-context', () => ({
  useCatalog: () => ({
    catalogs: {
      hodgePlanesCatalog: [],
      positionCatalog: []
    },
    loading: false,
    error: null
  })
}))

describe('PartographHistoryPage', () => {
  it('renderiza la pantalla y muestra el Drawer al hacer clic en Historial', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/historial/123']}>
        <Routes>
          <Route path="/historial/:partographId" element={<PartographHistoryPage />} />
        </Routes>
      </MemoryRouter>
    )

    // Verifica que cargó la info general
    expect(await screen.findByText('Informacion General')).toBeInTheDocument()

    // Clic en botón "Historial"
    const botonHistorial = screen.getByRole('button', { name: /Historial/i })
    await user.click(botonHistorial)

    // Validar que aparece el Drawer
    expect(await screen.findByText('Historial de Cambios')).toBeInTheDocument()
  })
})
