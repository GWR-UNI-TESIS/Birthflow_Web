import React from "react";
import {
    LineChart,
    Line,
    ComposedChart,
    ScatterChart,
    Scatter,
    ReferenceLine,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import { Typography } from "antd";
import { OdaSymbolRenderer, OdpSymbolRenderer, OdtSymbolRenderer, OiaSymbolRenderer, OipSymbolRenderer, OitSymbolRenderer, OsSymbolRenderer, OpSymbolRenderer } from "./CustomSymbols";
import { useCatalog } from "../../../contexts/catalog-context";
const symbolMap = {
    OIDA: OdaSymbolRenderer,
    OIDP: OdpSymbolRenderer,
    OIDT: OdtSymbolRenderer,
    OIIA: OiaSymbolRenderer,
    OIIP: OipSymbolRenderer,
    OIIT: OitSymbolRenderer,
    OS: OsSymbolRenderer,
    OP: OpSymbolRenderer
};

const mapFetalHeartRate = (value) => {
    const minInput = 90;
    const maxInput = 200;
    const minOutput = 0;
    const maxOutput = 11;
    return ((value - minInput) / (maxInput - minInput)) * (maxOutput - minOutput) + minOutput;
};


const PartogramChart = ({ partograph }) => {

    const { catalogs, loading: catalogsLoading, error: catalogsError } = useCatalog();

    if (!partograph) {
        return (
            <div style={{ width: "100%", height: "200px", display: "flex", alignItems: "center", justifyContent: "center", borderColor: "gainsboro", borderStyle: 'dotted' }}>
                <Typography.Title level={3}>No hay datos de curvas disponibles.</Typography.Title>
            </div>
        );
    }
    // Obtener el tiempo de inicio para normalizar el eje X
    const startTime = new Date(partograph.curves.alertCurve[0].time).getTime();

    // Transformar `alertCurve`
    const formattedAlertCurve = partograph.curves.alertCurve.map((point) => ({
        cervicalDilation: point.cervicalDilation,
        timeRelative: (new Date(point.time).getTime() - startTime) / (60 * 60 * 1000), // Convertimos a horas relativas
        realTime: new Date(point.time)
    }));

    // Transformar `cervicalDilations` para la Curva Real
    const formattedRealCurve = partograph.cervicalDilations.map((point) => ({
        cervicalDilation: point.value,
        timeRelative: (new Date(point.hour).getTime() - startTime) / (60 * 60 * 1000),
        realTime: new Date(point.hour)
    }));


    let formattedNewAlertCurve = [];
    if (partograph.curves.newAlertCurve && partograph.curves.newAlertCurve.length > 0) {
        formattedNewAlertCurve = partograph.curves.newAlertCurve.map((point) => ({
            cervicalDilation: point.cervicalDilation,
            timeRelative: (new Date(point.time).getTime() - startTime) / (60 * 60 * 1000),
            realTime: new Date(point.time)
        }));
    }

    let formattedMedicalSurveillance = partograph.medicalSurveillanceTable.map((point) => {
        const fetalHeartRate = parseFloat(point.fetalHeartRate.split("x")[0]); // Extraer el número
        const frequencyContractions = parseFloat(point.frequencyContractions);

        return {
            timeRelative: (new Date(point.time).getTime() - startTime) / (60 * 60 * 1000),
            fetalHeartRate: mapFetalHeartRate(fetalHeartRate), // Convertir el rango a 0-11
            frequencyContractions: frequencyContractions
        };
    });

    // Agregar datos de `fetalHeartRates` si existen
    if (partograph.fetalHeartRates && partograph.fetalHeartRates.length > 0) {
        const formattedFetalHeartRates = partograph.fetalHeartRates.map((point) => ({
            timeRelative: (new Date(point.time).getTime() - startTime) / (60 * 60 * 1000),
            fetalHeartRate: mapFetalHeartRate(parseFloat(point.value))
        }));
        formattedMedicalSurveillance = [...formattedMedicalSurveillance, ...formattedFetalHeartRates];
    }

    // Agregar datos de `contractionFrequencies` si existen
    if (partograph.contractionFrequencies && partograph.contractionFrequencies.length > 0) {
        const formattedContractionFrequencies = partograph.contractionFrequencies.map((point) => ({
            timeRelative: (new Date(point.time).getTime() - startTime) / (60 * 60 * 1000),
            frequencyContractions: parseFloat(point.value)
        }));
        formattedMedicalSurveillance = [...formattedMedicalSurveillance, ...formattedContractionFrequencies];
    }

    // Transformar `presentationPositionVarieties`
    const formattedPresentationVarieties = partograph.presentationPositionVarieties.map((point) => {
        // Buscar `hodgePlane` en el catálogo
        const hodgePlaneCatalogItem = catalogs?.hodgePlanesCatalog?.find((item) => item.id === point.hodgePlane);
        const positionCatalogItem = catalogs?.positionCatalog?.find((item) => item.id === point.position);

        return {
            timeRelative: (new Date(point.time).getTime() - startTime) / (60 * 60 * 1000),
            hodgePlane: hodgePlaneCatalogItem ? hodgePlaneCatalogItem.chartPosition : point.hodgePlane, // Valor en el eje Y
            symbol: positionCatalogItem ? positionCatalogItem.code : "ODA"
        };
    });

    // Formateador del eje X: Muestra la hora real
    const formatXAxis = (tick) => {
        const date = new Date(startTime + tick * 60 * 60 * 1000);
        return date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
    };

    return (

        <ResponsiveContainer width="100%" height={700}>
            <ComposedChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="timeRelative"
                    type="number"
                    domain={[0, 11]} // Asegurar que el eje X vaya de 0 a 11
                    tickCount={13} // Para que muestre de 0 a 11
                    tickFormatter={formatXAxis} // Muestra las horas reales
                    label={{ value: "Hora", position: "insideBottom", offset: -5 }}
                />
                <YAxis
                    domain={[0, 11]}
                    tickCount={12}
                    label={{ value: "Dilatación Cervical (cm)", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                    content={({ label }) => (
                        <div style={{ background: "white", color: "black", padding: "5px", border: "1px solid black" }}>
                            <strong>{formatXAxis(label)}</strong>
                        </div>
                    )}
                />
                <Legend />


                <ReferenceLine y={4.5} label="Linea de creacion de curva de alerta" position="insideTop" stroke="black" strokeDasharray="5 5" />
                {/* Línea de la Curva de Alerta */}
                <Line
                    type="monotone"
                    dataKey="cervicalDilation"
                    data={formattedAlertCurve}
                    stroke="#8884d8"
                    strokeWidth={3}
                    name="Curva de Alerta"
                />

                {/* Línea de la Curva Real */}
                <Line
                    type="monotone"
                    dataKey="cervicalDilation"
                    data={formattedRealCurve}
                    stroke="#FF5733"
                    strokeWidth={3}
                    name="Curva Real"
                />

                {/* Línea de la Nueva Curva de Alerta (si existe) */}
                {formattedNewAlertCurve.length > 0 && (
                    <Line
                        type="monotone"
                        dataKey="cervicalDilation"
                        data={formattedNewAlertCurve}
                        stroke="#4CAF50"
                        strokeWidth={3}
                        name="Nueva Curva de Alerta"
                    />
                )}

                <Scatter data={formattedMedicalSurveillance} dataKey="fetalHeartRate" fill="blue" shape="square" name="Frecuencia Cardíaca Fetal" />

                {/* 🔥 Puntos de Frequency Contractions (Triángulos) */}
                <Scatter data={formattedMedicalSurveillance} dataKey="frequencyContractions" fill="orange" shape="triangle" name="Frecuencia de Contracciones" />
                <Scatter
                    data={formattedPresentationVarieties}
                    dataKey="hodgePlane"
                    name="Plano de Hodge"
                    shape={({ cx, cy, payload }) => {
                        const SymbolComponent = symbolMap[payload.symbol] || OdaSymbolRenderer;
                        return <SymbolComponent cx={cx} cy={cy} />;
                    }}
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default PartogramChart;
