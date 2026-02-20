type LegalSection = {
  id: string;
  title: string;
  content: React.ReactNode;
};

export default function TerminosPage() {
  const sections: LegalSection[] = [
    {
      id: "objetivo",
      title: "1. Objetivo de la plataforma",
      content: (
        <>
          <p>
            La plataforma tiene como finalidad <strong>reunir, mostrar y difundir cursos gratuitos</strong>{" "}
            disponibles en sitios externos. La plataforma <strong>no dicta cursos propios</strong>, ni gestiona
            inscripciones, pagos o certificados.
          </p>
          <p className="mt-3">
            El acceso a los cursos se realiza mediante <strong>enlaces externos</strong> que redirigen a la
            página oficial de cada curso.
          </p>
        </>
      ),
    },
    {
      id: "aceptacion",
      title: "2. Aceptación de los Términos y Condiciones",
      content: (
        <p>
          Al utilizar la plataforma, el usuario acepta los presentes Términos y Condiciones. Si no está de
          acuerdo, deberá abstenerse de utilizar el sitio.
        </p>
      ),
    },
    {
      id: "uso",
      title: "3. Uso de la plataforma",
      content: (
        <>
          <p>El usuario se compromete a:</p>
          <ul className="mt-3 list-disc pl-5 space-y-2">
            <li>Utilizar la plataforma de forma responsable.</li>
            <li>No publicar contenido falso, engañoso o ilegal.</li>
            <li>No utilizar la plataforma con fines comerciales no autorizados.</li>
          </ul>
          <p className="mt-3">
            La plataforma se reserva el derecho de eliminar contenido que incumpla estas normas.
          </p>
        </>
      ),
    },
    {
      id: "enlaces",
      title: "4. Contenido y enlaces externos",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Todos los cursos publicados pertenecen a <strong>terceros</strong>.</li>
          <li>
            La plataforma <strong>no es responsable</strong> del contenido, calidad, disponibilidad, cambios o
            condiciones de los cursos externos.
          </li>
          <li>
            Al hacer clic en un enlace, el usuario acepta los términos y políticas del sitio externo.
          </li>
        </ul>
      ),
    },
    {
      id: "publicacion",
      title: "5. Publicación de cursos por usuarios",
      content: (
        <>
          <p>Los usuarios pueden compartir cursos gratuitos mediante enlaces externos.</p>
          <p className="mt-3">Al publicar un curso, el usuario declara que:</p>
          <ul className="mt-3 list-disc pl-5 space-y-2">
            <li>El curso es <strong>gratuito</strong>.</li>
            <li>El enlace dirige a una página legítima.</li>
            <li>No infringe derechos de autor ni normas legales.</li>
          </ul>
          <p className="mt-3">
            La plataforma puede <strong>moderar, editar o eliminar</strong> publicaciones sin previo aviso.
          </p>
        </>
      ),
    },
    {
      id: "inscripcion",
      title: "6. Inscripción a los cursos",
      content: (
        <>
          <p>
            La inscripción a los cursos se realiza <strong>exclusivamente</strong> en la plataforma externa que
            ofrece el curso.
          </p>
          <p className="mt-3">
            La página externa determinará los <strong>requisitos</strong> para la inscripción al curso referenciado.
          </p>
        </>
      ),
    },
    {
      id: "propiedad",
      title: "7. Propiedad intelectual",
      content: (
        <>
          <p>
            Los logos, nombres, marcas y contenidos de los cursos pertenecen a sus respectivos propietarios.
          </p>
          <p className="mt-3">
            El contenido propio de la plataforma (diseño, estructura, textos) es de uso exclusivo y no puede
            ser copiado sin autorización.
          </p>
        </>
      ),
    },
    {
      id: "responsabilidad",
      title: "8. Responsabilidad de la página ",
      content: (
        <>
        <p>NexoFormar no se hace cargo de:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Cambios o eliminación de cursos externos.</li>
          <li>Problemas técnicos de sitios enlazados.</li>
          <li>Resultados obtenidos a partir de los cursos.</li>
        </ul>
        </>
      ),
    },
    {
      id: "modificaciones",
      title: "9. Modificaciones",
      content: (
        <p>
          La plataforma puede modificar estos Términos y Condiciones en cualquier momento. Las modificaciones
          entrarán en vigencia desde su publicación.
        </p>
      ),
    },
    {
      id: "contacto",
      title: "10. Contacto",
      content: (
        <p>
          Para consultas, reportes de enlaces o solicitudes de eliminación de contenido, el usuario puede
          comunicarse a través el mail de la plataforma nexoformar@gmail.com
        </p>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-[#0b1c32] text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm text-slate-300">Última actualización: 29 / 12 / 2025</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Términos y Condiciones
          </h1>
        </div>

        <section className="rounded-2xl border border-white/10 bg-[#1a2f4b]/60 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-8 p-6 sm:p-8">
            <nav className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">Contenido</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="text-sm text-slate-300 hover:text-[#93c5fd] transition"
                  >
                    {s.title}
                  </a>
                ))}
              </div>
            </nav>

            <div className="space-y-8">
              {sections.map((s) => (
                <article
                  key={s.id}
                  id={s.id}
                  className="scroll-mt-24 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6"
                >
                  <h2 className="text-lg font-semibold text-white">{s.title}</h2>
                  <div className="mt-3 text-sm leading-7 text-slate-300">
                    {s.content}
                  </div>
                </article>
              ))}
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-300">
                Si encontrás un enlace caído o un curso que dejó de ser gratuito, podés reportarlo desde la
                sección de contacto.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
