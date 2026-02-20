import { Suspense } from "react";
import Main from '../components/cursos/Main'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Main />
    </Suspense>
  );
}