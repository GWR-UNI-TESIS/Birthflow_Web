import React from "react";

// 🔹 OdaSymbolRenderer
export const OdaSymbolRenderer = ({ cx, cy }) => {
  const radius = 10; // Radio del círculo
  const centerX = 12;
  const centerY = 12;

  // Punto diagonal derecha (45°)
  const xRightDiagonal = centerX + radius * Math.cos((45 * Math.PI) / 180);
  const yRightDiagonal = centerY + radius * Math.sin((45 * Math.PI) / 180);

  // Punto izquierdo (línea horizontal)
  const xLeft = centerX - radius;
  const yLeft = centerY;

  // Punto superior (línea vertical)
  const xTop = centerX;
  const yTop = centerY - radius;

  return (
    <svg x={cx - 10} y={cy - 10} width="32" height="32" viewBox="0 0 24 24">
      {/* Círculo principal */}
      <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" fill="transparent" />

      {/* Línea diagonal derecha (45°) */}
      <line x1={centerX} y1={centerY} x2={xRightDiagonal} y2={yRightDiagonal} stroke="black" strokeWidth="2" />

      {/* Línea horizontal hacia la izquierda */}
      <line x1={centerX} y1={centerY} x2={xLeft} y2={yLeft} stroke="black" strokeWidth="2" />

      {/* Línea vertical hacia arriba */}
      <line x1={centerX} y1={centerY} x2={xTop} y2={yTop} stroke="black" strokeWidth="2" />
    </svg>
  );
};

// 🔹 OdpSymbolRenderer
export const OdpSymbolRenderer = ({ cx, cy }) => {
  const radius = 10; // Radio del círculo
  const centerX = 12;
  const centerY = 12;

  // Punto diagonal derecha (315°)
  const xRightDiagonal = centerX + radius * Math.cos((315 * Math.PI) / 180);
  const yRightDiagonal = centerY + radius * Math.sin((315 * Math.PI) / 180);

  // Punto izquierdo (línea horizontal)
  const xLeft = centerX - radius;
  const yLeft = centerY;

  // Punto inferior (línea vertical)
  const xBottom = centerX;
  const yBottom = centerY + radius;

  return (
    <svg x={cx - 10} y={cy - 10} width="32" height="32" viewBox="0 0 24 24">
      {/* Círculo principal */}
      <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" fill="transparent" />

      {/* Línea diagonal derecha (315°) */}
      <line x1={centerX} y1={centerY} x2={xRightDiagonal} y2={yRightDiagonal} stroke="black" strokeWidth="2" />

      {/* Línea horizontal hacia la izquierda */}
      <line x1={centerX} y1={centerY} x2={xLeft} y2={yLeft} stroke="black" strokeWidth="2" />

      {/* Línea vertical hacia abajo */}
      <line x1={centerX} y1={centerY} x2={xBottom} y2={yBottom} stroke="black" strokeWidth="2" />
    </svg>
  );
};


// 🔹 OdtSymbolRenderer
export const OdtSymbolRenderer = ({ cx, cy }) => {
  const radius = 10; // Radio del círculo
  const centerX = 12;
  const centerY = 12;

  // Punto diagonal izquierda (225°)
  const xLeftDiagonal = centerX + radius * Math.cos((225 * Math.PI) / 180);
  const yLeftDiagonal = centerY + radius * Math.sin((225 * Math.PI) / 180);

  // Punto diagonal derecha (135°)
  const xRightDiagonal = centerX + radius * Math.cos((135 * Math.PI) / 180);
  const yRightDiagonal = centerY + radius * Math.sin((135 * Math.PI) / 180);

  // Punto derecho (línea horizontal)
  const xRight = centerX + radius;
  const yRight = centerY;

  return (
    <svg x={cx - 10} y={cy - 10} width="32" height="32" viewBox="0 0 24 24">
      {/* Círculo principal */}
      <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" fill="transparent" />

      {/* Línea horizontal hacia la derecha */}
      <line x1={centerX} y1={centerY} x2={xRight} y2={yRight} stroke="black" strokeWidth="2" />

      {/* Línea diagonal izquierda (225°) */}
      <line x1={centerX} y1={centerY} x2={xLeftDiagonal} y2={yLeftDiagonal} stroke="black" strokeWidth="2" />

      {/* Línea diagonal derecha (135°) */}
      <line x1={centerX} y1={centerY} x2={xRightDiagonal} y2={yRightDiagonal} stroke="black" strokeWidth="2" />
    </svg>
  );
};

// 🔹 OiaSymbolRenderer
export const OiaSymbolRenderer = ({ cx, cy }) => {
  const radius = 10; // Radio del círculo
  const centerX = 12;
  const centerY = 12;

  // Punto diagonal izquierda (135°)
  const xLeftDiagonal = centerX + radius * Math.cos((135 * Math.PI) / 180);
  const yLeftDiagonal = centerY + radius * Math.sin((135 * Math.PI) / 180);

  // Punto derecho (línea horizontal)
  const xRight = centerX + radius;
  const yRight = centerY;

  // Punto superior (línea vertical)
  const xTop = centerX;
  const yTop = centerY - radius;

  return (
    <svg x={cx - 10} y={cy - 10} width="32" height="32" viewBox="0 0 24 24">
      {/* Círculo principal */}
      <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" fill="transparent" />

      {/* Línea diagonal izquierda (135°) */}
      <line x1={centerX} y1={centerY} x2={xLeftDiagonal} y2={yLeftDiagonal} stroke="black" strokeWidth="2" />

      {/* Línea horizontal hacia la derecha */}
      <line x1={centerX} y1={centerY} x2={xRight} y2={yRight} stroke="black" strokeWidth="2" />

      {/* Línea vertical hacia arriba */}
      <line x1={centerX} y1={centerY} x2={xTop} y2={yTop} stroke="black" strokeWidth="2" />
    </svg>
  );
};

// 🔹 OipSymbolRenderer
export const OipSymbolRenderer = ({ cx, cy }) => {
  const radius = 10; // Radio del círculo
  const centerX = 12;
  const centerY = 12;

  // Punto diagonal izquierda (225°)
  const xLeftDiagonal = centerX + radius * Math.cos((225 * Math.PI) / 180);
  const yLeftDiagonal = centerY + radius * Math.sin((225 * Math.PI) / 180);

  // Punto derecho (línea horizontal)
  const xRight = centerX + radius;
  const yRight = centerY;

  // Punto inferior (línea vertical)
  const xBottom = centerX;
  const yBottom = centerY + radius;

  return (
    <svg x={cx - 10} y={cy - 10} width="32" height="32" viewBox="0 0 24 24">
      {/* Círculo principal */}
      <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" fill="transparent" />

      {/* Línea diagonal izquierda (225°) */}
      <line x1={centerX} y1={centerY} x2={xLeftDiagonal} y2={yLeftDiagonal} stroke="black" strokeWidth="2" />

      {/* Línea horizontal hacia la derecha */}
      <line x1={centerX} y1={centerY} x2={xRight} y2={yRight} stroke="black" strokeWidth="2" />

      {/* Línea vertical hacia abajo */}
      <line x1={centerX} y1={centerY} x2={xBottom} y2={yBottom} stroke="black" strokeWidth="2" />
    </svg>
  );
};


// 🔹 OitSymbolRenderer
// 🔹 OitSymbolRenderer (Corrección basada en el código Flutter)
export const OitSymbolRenderer = ({ cx, cy }) => {
  const radius = 10; // Radio del círculo
  const centerX = 12;
  const centerY = 12;

  // Punto izquierdo (línea horizontal)
  const xLeft = centerX - radius;
  const yLeft = centerY;

  // Punto diagonal derecha (315°)
  const xRight = centerX + radius * Math.cos((315 * Math.PI) / 180);
  const yRight = centerY + radius * Math.sin((315 * Math.PI) / 180);

  // Punto diagonal izquierda (45°)
  const xDiagLeft = centerX + radius * Math.cos((45 * Math.PI) / 180);
  const yDiagLeft = centerY + radius * Math.sin((45 * Math.PI) / 180);

  return (
    <svg x={cx - 10} y={cy - 10} width="32" height="32" viewBox="0 0 24 24">
      {/* Círculo principal */}
      <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" fill="transparent" />

      {/* Línea horizontal hacia la izquierda */}
      <line x1={centerX} y1={centerY} x2={xLeft} y2={yLeft} stroke="black" strokeWidth="2" />

      {/* Línea diagonal izquierda (45°) */}
      <line x1={centerX} y1={centerY} x2={xDiagLeft} y2={yDiagLeft} stroke="black" strokeWidth="2" />

      {/* Línea diagonal derecha (315°) */}
      <line x1={centerX} y1={centerY} x2={xRight} y2={yRight} stroke="black" strokeWidth="2" />
    </svg>
  );
};

// 🔹 OsSymbolRenderer 
export const OsSymbolRenderer = ({ cx, cy }) => {
  const radius = 10; // Radio del círculo
  const centerX = 12;
  const centerY = 12;

  // Punto superior (línea vertical)
  const xTop = centerX;
  const yTop = centerY - radius;

  // Punto diagonal izquierda (135°)
  const xLeft = centerX + radius * Math.cos((135 * Math.PI) / 180);
  const yLeft = centerY + radius * Math.sin((135 * Math.PI) / 180);

  // Punto diagonal derecha (45°)
  const xRight = centerX + radius * Math.cos((45 * Math.PI) / 180);
  const yRight = centerY + radius * Math.sin((45 * Math.PI) / 180);

  return (
    <svg x={cx - 10} y={cy - 10} width="32" height="32" viewBox="0 0 24 24">
      {/* Círculo principal */}
      <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" fill="transparent" />

      {/* Línea vertical hacia arriba */}
      <line x1={centerX} y1={centerY} x2={xTop} y2={yTop} stroke="black" strokeWidth="2" />

      {/* Línea diagonal izquierda (135°) */}
      <line x1={centerX} y1={centerY} x2={xLeft} y2={yLeft} stroke="black" strokeWidth="2" />

      {/* Línea diagonal derecha (45°) */}
      <line x1={centerX} y1={centerY} x2={xRight} y2={yRight} stroke="black" strokeWidth="2" />
    </svg>
  );
};

// 🔹 OpSymbolRenderer
export const OpSymbolRenderer = ({ cx, cy }) => {
  const radius = 10; // Tamaño del círculo
  const centerX = 12;
  const centerY = 12;

  // Punto inferior (línea vertical)
  const xBottom = centerX;
  const yBottom = centerY + radius;

  // Punto diagonal derecha (315°)
  const xRight = centerX + radius * Math.cos((315 * Math.PI) / 180);
  const yRight = centerY + radius * Math.sin((315 * Math.PI) / 180);

  // Punto diagonal izquierda (225°)
  const xLeft = centerX + radius * Math.cos((225 * Math.PI) / 180);
  const yLeft = centerY + radius * Math.sin((225 * Math.PI) / 180);

  return (
    <svg x={cx - 10} y={cy - 10} width="32" height="32" viewBox="0 0 24 24">
      {/* Círculo principal */}
      <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" fill="transparent" />

      {/* Línea vertical hacia abajo */}
      <line x1={centerX} y1={centerY} x2={xBottom} y2={yBottom} stroke="black" strokeWidth="2" />

      {/* Línea diagonal izquierda */}
      <line x1={centerX} y1={centerY} x2={xLeft} y2={yLeft} stroke="black" strokeWidth="2" />

      {/* Línea diagonal derecha */}
      <line x1={centerX} y1={centerY} x2={xRight} y2={yRight} stroke="black" strokeWidth="2" />
    </svg>
  );
};

