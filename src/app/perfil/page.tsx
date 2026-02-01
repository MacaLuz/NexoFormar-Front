import RequireAuth from "@/components/RequireAuth";
import PerfilPage from "@/components/Perfil";

export default function Page() {
  return (
    <RequireAuth nextOverride="/perfil">
      <PerfilPage />
    </RequireAuth>
  );
}
