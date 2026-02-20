import PublicarCurso from "@/components/cursos/Publicar";
import RequireAuth from "@/components/auth/RequireAuth";

export default function Page() {
    return (
      <RequireAuth nextOverride="/publicar">
       <PublicarCurso />
      </RequireAuth>
  
  
  
    )
  }