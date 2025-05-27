// PartogramChart.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import PartogramChart from "../../src/pages/PartographHistoryPage/components/chart";
import { useCatalog } from "../../src/contexts/catalog-context";
import { describe, it, expect, vi, beforeAll } from 'vitest';
import '@testing-library/jest-dom';

// Mock de useCatalog
vi.mock("../../src/contexts/catalog-context", () => ({
    useCatalog: vi.fn()
}));

describe("PartogramChart", () => {
    beforeEach(() => {
        useCatalog.mockReturnValue({
            catalogs: {
                hodgePlanesCatalog: [{ id: 1, chartPosition: 3 }],
                positionCatalog: [{ id: 1, code: "OIDA" }]
            },
            loading: false,
            error: null
        });
    });

    it("muestra mensaje cuando no hay datos", () => {
        render(<PartogramChart partograph={{ cervicalDilationLog: [] }} />);
        expect(screen.getByText('No hay datos de curvas disponibles.')).toBeInTheDocument();
    });    

    it("renderiza correctamente con datos mínimos", () => {
        const mockPartograph = {
            cervicalDilationLog: [
                { Value: 4, Hour: new Date().toISOString() }
            ],
            curves: {
                AlertCurve: [{ CervicalDilation: 4, Time: new Date().toISOString() }],
                newAlertCurve: []
            },
            medicalSurveillanceTableLog: [],
            fetalHeartRatesLog: [],
            contractionFrequencyLog: [],
            presentationPositionVarietyLog: []
        };

        render(<PartogramChart partograph={mockPartograph} />);
        expect(screen.queryByText('No hay datos de curvas disponibles')).not.toBeInTheDocument()
        // Se puede agregar más si se desea verificar que el canvas o etiquetas clave están en el DOM
    });
});
