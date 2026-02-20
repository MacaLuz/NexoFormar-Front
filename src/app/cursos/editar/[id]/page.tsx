import EditarCursoCliente from "@/components/cursos/EditarCurso";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditarCursoCliente id={id} />;
}
