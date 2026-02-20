import RequireAuth from "@/components/auth/RequireAuth";
import PerfilPage from "@/components/Perfil";

export default function Page() {
  return (
    <RequireAuth nextOverride="/perfil">
      <PerfilPage />
    </RequireAuth>
  );
}
