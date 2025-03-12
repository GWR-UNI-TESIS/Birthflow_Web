import React from "react";

// 🔹 OdaSymbolRenderer
export const OdaSymbolRenderer = ({ cx, cy }) => (
  <svg x={cx - 10} y={cy - 10} width="20" height="20" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" fill="transparent" />
    <line x1="12" y1="12" x2="20" y2="20" stroke="black" strokeWidth="2" />
    <line x1="12" y1="12" x2="4" y2="12" stroke="black" strokeWidth="2" />
    <line x1="12" y1="12" x2="12" y2="4" stroke="black" strokeWidth="2" />
  </svg>
);

// 🔹 OdpSymbolRenderer
export const OdpSymbolRenderer = ({ cx, cy }) => (
  <svg x={cx - 10} y={cy - 10} width="20" height="20" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" fill="transparent" />
    <line x1="12" y1="12" x2="20" y2="4" stroke="black" strokeWidth="2" />
    <line x1="12" y1="12" x2="4" y2="12" stroke="black" strokeWidth="2" />
    <line x1="12" y1="12" x2="12" y2="20" stroke="black" strokeWidth="2" />
  </svg>
);

// 🔹 OdtSymbolRenderer
export const OdtSymbolRenderer = ({ cx, cy }) => (
  <svg x={cx - 10} y={cy - 10} width="20" height="20" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" fill="transparent" />
    <line x1="12" y1="12" x2="20" y2="20" stroke="black" strokeWidth="2" />
    <line x1="12" y1="12" x2="4" y2="4" stroke="black" strokeWidth="2" />
    <line x1="12" y1="12" x2="20" y2="12" stroke="black" strokeWidth="2" />
  </svg>
);

// 🔹 OiaSymbolRenderer
export const OiaSymbolRenderer = ({ cx, cy }) => (
  <svg x={cx - 10} y={cy - 10} width="20" height="20" viewBox="0 0 24 24">
    <polygon points="12,2 22,12 12,22 2,12" stroke="black" strokeWidth="2" fill="transparent" />
  </svg>
);

// 🔹 OipSymbolRenderer
export const OipSymbolRenderer = ({ cx, cy }) => (
  <svg x={cx - 10} y={cy - 10} width="20" height="20" viewBox="0 0 24 24">
    <rect x="4" y="4" width="16" height="16" stroke="black" strokeWidth="2" fill="transparent" />
  </svg>
);

// 🔹 OitSymbolRenderer
export const OitSymbolRenderer = ({ cx, cy }) => (
  <svg x={cx - 10} y={cy - 10} width="20" height="20" viewBox="0 0 24 24">
    <polygon points="12,2 22,12 12,22 2,12" stroke="black" strokeWidth="2" fill="transparent" />
    <line x1="12" y1="2" x2="12" y2="22" stroke="black" strokeWidth="2" />
  </svg>
);

// 🔹 OsSymbolRenderer
export const OsSymbolRenderer = ({ cx, cy }) => (
  <svg x={cx - 10} y={cy - 10} width="20" height="20" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="2" fill="transparent" />
  </svg>
);

// 🔹 OpSymbolRenderer
export const OpSymbolRenderer = ({ cx, cy }) => (
  <svg x={cx - 10} y={cy - 10} width="20" height="20" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="8" stroke="black" strokeWidth="2" fill="transparent" />
    <line x1="12" y1="4" x2="12" y2="20" stroke="black" strokeWidth="2" />
  </svg>
);
