import { render, screen } from '@testing-library/react'
import HomePage from '../../src/pages/HomePage/index'
import { BrowserRouter } from 'react-router-dom'


vi.mock('firebase/messaging', async () => {
    return await import('../mocks/firebase/messaging.js')
})


// 🧠 MOCKS con rutas exactamente iguales a las que usa HomePage.jsx
vi.mock('../../src/contexts/auth-context', () => {
    return {
        useAuth: () => ({
            isTemporalPassword: false,
            user: { id: 1 },
            login: vi.fn(),
            logout: vi.fn(),
            validateAccessToken: vi.fn(),
            accessToken: 'mock-token',
            authChecked: true,
            loading: false,
        })
    }
})

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

vi.mock('../../src/contexts/catalog-context', () => {
    return {
        useCatalog: () => ({
            catalogs: {
                filterCatalog: [{ id: 1, description: 'Todos' }],
                activityCatalog: [{ id: 1, description: 'Actividad 1' }],
                hourFilterCatalog: [{ id: 1, description: 'Hora 1' }]
            },
            loading: false,
            error: null
        })
    }
})

// Mocks visuales para evitar que falle por hijos
vi.mock('../../src/pages/HomePage/components/PinPartograms', () => ({
    default: () => <div data-testid="mock-pin-partograms">Mock PinPartograms</div>
}))

vi.mock('../../src/pages/HomePage/components/PartogramTabs', () => ({
    default: () => <div data-testid="mock-partogram-tabs">Mock PartogramTabs</div>
}))

describe('HomePage', () => {
    test('renderiza el botón Crear Partogramas', () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        )
        const link = screen.getByRole('link', { name: /crear partogramas/i })
        expect(link).toBeInTheDocument()
    })

    test('muestra los componentes mockeados', () => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        )
        expect(screen.getByTestId('mock-pin-partograms')).toBeInTheDocument()
        expect(screen.getByTestId('mock-partogram-tabs')).toBeInTheDocument()
    })
})
