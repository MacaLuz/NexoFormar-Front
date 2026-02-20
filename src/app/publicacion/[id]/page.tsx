import DetailCard from "@/components/cursos/DetailCard";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DetailCard id={id} />;
}
