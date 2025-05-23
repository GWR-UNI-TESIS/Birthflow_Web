import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import PartographPage from '../../src/pages/PartographPage/index'

if (!window.matchMedia) {
    window.matchMedia = () => ({
        matches: false,
        media: '',
        onchange: null,
        addListener: vi.fn(), // obsoleto pero usado en AntD internamente
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    });
}

// 🔧 Mock de hooks necesarios
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

vi.mock('../../src/hooks/use-partograph', () => ({
    default: () => ({
        data: {
            response: {
                name: 'Partograma Prueba',
                recordName: 'EXP123',
                date: new Date().toISOString(),
                workTime: '5h',
                observation: 'Observación test',
                cervicalDilations: [],
                medicalSurveillanceTable: [],
                presentationPositionVarieties: [],
                contractionFrequencies: [],
                fetalHeartRates: [],
                childbirthNote: null
            }
        },
        loading: false,
        error: null
    })
}))

// Mocks de componentes secundarios pesados
vi.mock('../../src/components/PDF/PdfPreviewLoader', () => ({
    default: () => <div data-testid="mock-pdf-loader">PDF Loader</div>
}))

vi.mock('../../src/components/NotificacionDrawer/NotificationDrawer', () => ({
    default: () => <div data-testid="mock-drawer">Drawer</div>
}))

vi.mock('../../src/components/Charts/chart', () => ({
    default: () => <div data-testid="mock-chart">Chart</div>
}))

describe('PartographPage', () => {
    it('renderiza correctamente el título y las secciones', () => {
        render(
            <MemoryRouter initialEntries={['/partograph/123']}>
                <Routes>
                    <Route path="/partograph/:partographId" element={<PartographPage />} />
                </Routes>
            </MemoryRouter>
        )

        expect(screen.getByText('Informacion General')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Editar/i })).toBeInTheDocument()
        expect(screen.getByText('Dilataciones Cervicales')).toBeInTheDocument()
        expect(screen.getByText('Vigilancia Médica')).toBeInTheDocument()
        expect(screen.getByText('Variaciones de Posición de Presentación')).toBeInTheDocument()
        expect(screen.getAllByText('Frecuencia de Contracciones')).toHaveLength(2)
        expect(screen.getByText('Frecuencia Cardíaca Fetal')).toBeInTheDocument()
    })
})

// Mocks de todos los modales
vi.mock('../../src/pages/PartographPage/modals/CervicalDilationModal', () => ({
    default: ({ visible }) => visible ? <div data-testid="cervical-modal" /> : null
}))

vi.mock('../../src/pages/PartographPage/modals/MedicalSurveillanceModal', () => ({
    default: ({ visible }) => visible ? <div data-testid="medical-modal" /> : null
}))

vi.mock('../../src/pages/PartographPage/modals/PresentationPositionVarietyModal', () => ({
    default: ({ visible }) => visible ? <div data-testid="position-modal" /> : null
}))

vi.mock('../../src/pages/PartographPage/modals/ContractionFrequencyModal', () => ({
    default: ({ visible }) => visible ? <div data-testid="contraction-modal" /> : null
}))

vi.mock('../../src/pages/PartographPage/modals/FetalHeartRateModal', () => ({
    default: ({ visible }) => visible ? <div data-testid="fetal-modal" /> : null
}))

describe('PartographPage modals', () => {
    const setup = () => {
        render(
            <MemoryRouter initialEntries={['/partograph/123']}>
                <Routes>
                    <Route path="/partograph/:partographId" element={<PartographPage />} />
                </Routes>
            </MemoryRouter>
        )
        return userEvent.setup()
    }

    it('Abre todos los modales al hacer clic en sus botones', async () => {
        const user = setup()

        const buttons = [
            { text: /Agregar Dilatación Cervical/, testId: 'cervical-modal' },
            { text: /Agregar elemento a tabla/, testId: 'medical-modal' },
            { text: /Agregar altura de la presentación/, testId: 'position-modal' },
            { text: /Agregar Frecuencia de Contracciones/, testId: 'contraction-modal' },
            { text: /Agregar Frecuencia Cardíaca Fetal/, testId: 'fetal-modal' }
        ]

        for (const { text, testId } of buttons) {
            await user.click(screen.getByRole('button', { name: text }))
            expect(await screen.findByTestId(testId)).toBeInTheDocument()
        }
    })
})