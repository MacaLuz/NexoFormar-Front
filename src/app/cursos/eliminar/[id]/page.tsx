import EliminarCursoCliente from "@/components/EliminarCurso";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EliminarCursoCliente id={id} />;
}
