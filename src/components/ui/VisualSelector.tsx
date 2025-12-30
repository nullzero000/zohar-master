'use client';

import '@/styles/UIControls.css';

interface Props {
    currentMode: 'GALAXY' | 'GLITCH' | 'PARTICLES' | 'VOID';
    onModeChange: (mode: any) => void;
    embedded?: boolean; // Prop para saber si está dentro de la barra
}

export const VisualSelector = ({ currentMode, onModeChange, embedded }: Props) => {
    
    // Iconos minimalistas (Geometric Shapes)
    const MODES = [
        { id: 'GALAXY', icon: '✦', label: 'Galaxy' },
        { id: 'GLITCH', icon: '⚡', label: 'Glitch' },
        { id: 'PARTICLES', icon: '∴', label: 'Dust' },
        { id: 'VOID', icon: '○', label: 'Void' },
    ];

    // Si está embebido, solo devolvemos los fragmentos, si no, el contenedor
    const content = MODES.map((m) => (
        <button
            key={m.id}
            onClick={() => onModeChange(m.id)}
            className={`bg-option ${currentMode === m.id ? 'active' : ''}`}
            title={m.label}
        >
            <span style={{ fontSize: '1rem', lineHeight: 1 }}>{m.icon}</span>
        </button>
    ));

    if (embedded) {
        return <>{content}</>;
    }

    return (
        <div className="bg-selector-panel">
            {content}
        </div>
    );
};