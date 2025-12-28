'use client';

import { useGematriaStore } from '@/stores/gematriaStore';
import { SCHOOL_MODES } from '@/lib/constants'; // IMPORTACIÓN CRÍTICA: Fuente de Verdad
import '@/styles/SchoolSelector.css';

export const SchoolSelector = () => {
    const { school, setSchool } = useGematriaStore();

    return (
        <div 
            className="school-selector-container"
            role="radiogroup" 
            aria-label="Seleccionar escuela de Kabbalah"
        >
            {/* Usamos el array maestro importado, no una lista local propensa a errores */}
            {SCHOOL_MODES.map((mode) => {
                const isActive = school === mode.id;
                
                return (
                    <button
                        key={mode.id}
                        onClick={() => setSchool(mode.id)}
                        className={`school-btn ${isActive ? 'active' : ''}`}
                        aria-pressed={isActive}
                        aria-label={`Activar modo ${mode.label}`}
                    >
                        {mode.label}
                        
                        {/* Indicador visual de estado activo (Punto de Luz) */}
                        {isActive && <div className="active-dot" aria-hidden="true" />}
                    </button>
                );
            })}
        </div>
    );
};