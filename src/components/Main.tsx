"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { obtenerCursos, buscarCursos } from "@/connect/cursos";
import { renderUtils } from "@/utils/render";
import { Curso } from "@/interfaces/Curso";

const Main: React.FC = () => {
  const searchParams = useSearchParams();

  const categoriaId = searchParams.get("categoria_id");
  const keywords = searchParams.get("keywords");

  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        if (!categoriaId && !keywords) {
          const data = await obtenerCursos();
          setCursos(Array.isArray(data) ? data : []);
          return;
        }

      
        const data = await buscarCursos(
          categoriaId ? categoriaId.split(",") : undefined,
          keywords ?? undefined
        );

        setCursos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al obtener cursos:", error);
        setCursos([]);
      }
    };

    fetchData();
  }, [categoriaId, keywords]);

  return (
    <main className="bg-darkbackground min-h-screen px-6 py-8">
      <div className="mx-auto max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
        {renderUtils.renderizarCursos(cursos)}
      </div>
    </main>
  );
};

export default Main;
