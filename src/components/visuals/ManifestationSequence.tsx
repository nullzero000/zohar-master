'use client';

import { motion, Variants } from 'framer-motion';
import { useGematriaStore } from '@/stores/gematriaStore';
import { getHebrewColor, isOntologicalBlack } from '@/lib/gematriaUtils';

interface Props {
  onComplete: () => void;
}

export const ManifestationSequence = ({ onComplete }: Props) => {
  const { inputText, school } = useGematriaStore();

  // FIX TYPESCRIPT: Definimos explícitamente el tipo Variants y usamos 'as const'
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    },
    exit: { 
      opacity: 0, 
      scale: 1.2, 
      filter: 'blur(15px)', 
      // 'easeInOut' debe ser constante para TS
      transition: { duration: 1, ease: "easeInOut" as const } 
    }
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5, y: 100 },
    visible: { 
      opacity: 1, scale: 1, y: 0,
      // 'spring' debe ser constante
      transition: { type: "spring" as const, stiffness: 80, damping: 12 }
    }
  };

  return (
    <motion.div
      className="manifestation-sequence-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onComplete}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', flexDirection: 'column', 
        alignItems: 'center', justifyContent: 'center',
        background: 'black', 
        cursor: 'pointer', 
        pointerEvents: 'auto' 
      }}
    >
      {/* Contenedor de Letras */}
      <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: '2vw', flexWrap: 'wrap', justifyContent: 'center', padding: '20px' }}>
        {inputText.split('').map((char, i) => {
          const color = getHebrewColor(char, school);
          const isBlack = isOntologicalBlack(color);

          return (
            <motion.span
              key={i}
              variants={letterVariants}
              style={{
                fontSize: 'min(18vw, 200px)', 
                fontFamily: 'Times New Roman, serif',
                fontWeight: 'bold',
                lineHeight: 1,
                color: color,
                textShadow: isBlack 
                    ? '0 0 30px rgba(255,255,255,0.9), 0 0 60px rgba(255,255,255,0.5)' 
                    : `0 0 40px ${color}, 0 0 80px ${color}`,
                display: 'inline-block',
                animation: 'float 6s ease-in-out infinite'
              }}
            >
              {char}
            </motion.span>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 3, duration: 1 }}
        style={{
            position: 'absolute', bottom: '50px',
            color: 'rgba(255,255,255,0.5)',
            fontFamily: 'Courier New', fontSize: '0.7rem', letterSpacing: '0.2em',
            textTransform: 'uppercase'
        }}
      >
        [ CLICK TO ANALYZE ]
      </motion.div>

      <style jsx>{`
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
      `}</style>
    </motion.div>
  );
};