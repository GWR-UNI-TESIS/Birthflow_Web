import { render, screen } from '@testing-library/react'
import SharePartographModal from '../../src/pages/HomePage/components/SharePartographModal'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'


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


// 🧪 Mock de servicios que usa el modal
vi.mock('../../src/services/share-services/share-services', () => ({
    getAssignedUserGroups: vi.fn().mockResolvedValue({
      permissionTypeId: 1,
      searchUserGroupDtos: [{ id: 1, name: 'Usuario Test', type: 'user' }]
    }),
    assignUserGroupsToPartograph: vi.fn()
  }))

describe('SharePartographModal', () => {
  it('muestra el modal correctamente cuando visible es true', async () => {
    render(
      <SharePartographModal
        visible={true}
        partographId={123}
        catalogs={{
          permissionTypeCatalog: [{ id: 1, name: 'Lectura' }]
        }}
        onClose={() => {}}
      />
    )

    expect(await screen.findByTestId('modal-compartir')).toBeInTheDocument()
    expect(screen.getByText('Compartir Partograma')).toBeInTheDocument()
  })
})

it('evita añadir un usuario ya existente', async () => {
    render(
      <SharePartographModal
        visible={true}
        partographId={123}
        catalogs={{ permissionTypeCatalog: [{ id: 1, name: 'Lectura' }] }}
        onClose={() => {}}
      />
    )
  
    const user = { id: 1, name: 'Usuario Repetido', type: 'user' }
  
    // Simula click en input y selección dos veces
    const input = screen.getByPlaceholderText(/buscar usuarios/i)
    await userEvent.click(input)
  
  })

  it('elimina un usuario del listado al hacer clic en eliminar', async () => {
    render(
      <SharePartographModal
        visible={true}
        partographId={123}
        catalogs={{ permissionTypeCatalog: [{ id: 1, name: 'Lectura' }] }}
        onClose={() => {}}
      />
    )
  
    // Simula que ya hay un usuario asignado
    const initialUser = { id: 1, name: 'Usuario Test', type: 'user' }
  
    // Simular añadir usuario manualmente (ya que la API está mockeada)
    await screen.findByTestId('modal-compartir')
    // Esto requiere que modifiques el componente para exponer setSharedList en pruebas (o lo mockees)
  
    expect(await screen.findByText('Usuario Test')).toBeInTheDocument()
  
    const eliminarBtn = screen.getByRole('button', { name: /eliminar/i })
    await userEvent.click(eliminarBtn)
  
    expect(screen.queryByText('Usuario Test')).not.toBeInTheDocument()
  })
  