import PublicarCurso from "@/components/Publicar";
import RequireAuth from "@/components/RequireAuth";

export default function Page() {
    return (
      <RequireAuth>
       <PublicarCurso />
      </RequireAuth>
  
  
  
    )
  }