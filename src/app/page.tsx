import { BlackHole3D } from '@/components/visuals/BlackHole3D';

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* CAPA 1: MOTOR VISUAL (Fondo) */}
      <div className="absolute inset-0 z-0">
        <BlackHole3D />
      </div>

      {/* CAPA 2: INTERFAZ DE USUARIO (Sobrepuesta) */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        
        {/* Aquí inyectaremos los componentes Input y Dashboard más adelante */}
        <div className="pointer-events-auto p-8 bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl">
          <h1 className="text-4xl font-bold text-white tracking-widest text-center mb-2" style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>
            ZOHAR
          </h1>
          <p className="text-white/60 text-center text-sm tracking-[0.2em]">SISTEMA DE ANÁLISIS ESPECTRAL</p>
        </div>

      </div>
    </main>
  );
}