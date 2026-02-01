import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const MailIcon = () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-400 hover:text-white transition"
    >
      <path
        d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <footer className="w-full bg-darkblue text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full">
          <Image
            src="/logo_actualizado.png"
            alt="Logo NexoFormar"
            width={180}
            height={40}
            priority
          />
          <div className="hidden md:block h-12 w-px bg-gray-600"></div>
          <div className="flex flex-col gap-3 text-sm w-full md:w-auto items-center md:items-start">
            <nav className="flex flex-col md:flex-row gap-3 text-gray-400 text-center md:text-left">
              <Link href="/" className="hover:text-white">
                Inicio
              </Link>
              <Link href="/faq" className="hover:text-white">
                Preguntas frecuentes
              </Link>
              <Link href="/tyc" className="hover:text-white">
                Términos y condiciones
              </Link>
              <a
                href="mailto:nexoformar@gmail.com"
                className="hover:text-white"
              >
                Contacto
              </a>
            </nav>

            <p className="text-gray-500 text-center md:text-left">
              © 2025 NexoFormar. Todos los derechos reservados.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 text-sm w-full md:w-auto">
          <div className="flex gap-4">
            <MailIcon />
          </div>

          <a href="mailto:nexoformar@gmail.com" className="hover:text-white">
            nexoformar@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
