import EditarCursoCliente from "@/components/EditarCurso";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditarCursoCliente id={id} />;
}
