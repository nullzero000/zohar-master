'use client';

import { useGematriaStore } from '@/stores/gematriaStore';
import '@/styles/VectorialData.css'; // Asegúrate de mover el CSS aquí

export const VectorDataView = () => {
    const { analysis } = useGematriaStore();

    if (!analysis) return <div className="vector-empty">SINCRONIZANDO VECTORES...</div>;

    const color = analysis.mixedColor || '#d4af37';

    return (
        <div className="vector-dashboard">
            {/* TARJETA SUPERIOR (Diagnóstico) */}
            <div className="vector-card header-card" style={{ borderTopColor: color }}>
                <h3 style={{ color: color }}>VECTOR ESPECTRAL</h3>
                
                <div className="diagnosis-block">
                    {/* Fallback de texto si no hay diagnóstico complejo */}
                    {analysis.diagnosis || "Análisis de frecuencia estable. Sin anomalías detectadas en el espectro vibracional."}
                </div>
            </div>

            {/* TARJETA INFERIOR (Grid Estadístico) */}
            <div className="vector-grid-container">
                <div className="vector-stat-box">
                    <span className="stat-label">DOMINANTE</span>
                    <span className="stat-value big">{analysis.dominant}</span>
                </div>
                
                <div className="vector-stat-box">
                    <span className="stat-label">MASA TOTAL</span>
                    <span className="stat-value">{analysis.total}</span>
                </div>
                
                <div className="vector-stat-box">
                    <span className="stat-label">IDENTIDAD</span>
                    <span className="stat-value small" style={{ color: color }}>
                        {analysis.mixedColorName || "ESPECTRO PURO"}
                    </span>
                </div>
            </div>
        </div>
    );
};