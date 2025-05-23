import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import '@testing-library/jest-dom';
import PartogramCards from '../../src/pages/HomePage/components/PartogramCards';


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
});

vi.mock('../../src/utils/datetime-format', () => ({
  formatTimeNumeric: vi.fn((date) => `formatted-${date}`),
}));

describe('PartogramCards component', () => {
  const mockData = [
    {
      key: '1',
      name: 'Paciente A',
      recordName: 'EXP001',
      date: '2023-01-01T10:00:00Z',
      updateAt: '2023-01-02T12:00:00Z',
      nameCreatedBy: 'Dr. Smith',
    },
  ];

  it('renders a card with correct information', () => {
    render(<PartogramCards data={mockData} />);

    expect(screen.getByText('Paciente A')).toBeInTheDocument();
    expect(screen.getByText('EXP001')).toBeInTheDocument();
    expect(screen.getByText('formatted-2023-01-01T10:00:00Z')).toBeInTheDocument();
    expect(screen.getByText('formatted-2023-01-02T12:00:00Z')).toBeInTheDocument();
    expect(screen.getByText('Dr. Smith')).toBeInTheDocument();
  });
});
