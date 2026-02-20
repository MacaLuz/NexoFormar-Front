'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CursoCard from '@/components/cursos/MainCard';
import { Curso } from '@/interfaces/Curso';
import { buscarCursos, obtenerCursos } from '@/connect/cursos';

export default function BuscarResultado() {
  const searchParams = useSearchParams();

  const categoriaId = searchParams.get('categoria_id');
  const keywords = searchParams.get('keywords');

  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        if (!categoriaId && !keywords) {
          const data = await obtenerCursos();
          setCursos(Array.isArray(data) ? data : []);
          return;
        }
        const data = await buscarCursos(
          categoriaId ? categoriaId.split(',') : undefined,
          keywords ?? undefined
        );

        setCursos(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error buscando cursos:', err);
        setCursos([]);
      }
    };

    fetchCursos();
  }, [categoriaId, keywords]);

  return (
    <main className="bg-darkbackground min-h-screen px-6 py-8">
      <div className="mx-auto max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
        {cursos.length === 0 ? (
          <p>No se encontraron cursos.</p>
        ) : (
          cursos.map((curso) => <CursoCard key={curso.id} data={curso} />)
        )}
      </div>
    </main>
  );
}
