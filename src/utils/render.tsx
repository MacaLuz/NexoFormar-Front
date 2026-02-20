import { Curso } from "@/interfaces/Curso";
import CursoCard from "../components/cursos/MainCard";

function renderizarCursos(cursos?: Curso[]) {
  const lista = Array.isArray(cursos) ? cursos : [];

  return lista.map((curso) => (
    <div key={curso.id} className="h-full">
      <CursoCard data={curso} />
    </div>
  ));
}

export const renderUtils = {
  renderizarCursos,
};
