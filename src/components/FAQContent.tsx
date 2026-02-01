import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQContent() {
  return (
    <>
      <div className="flex flex-col items-center text-center pt-10">
        <h1 className="text-2xl font-bold mb-4 font-sans">
          Preguntas Frecuentes
        </h1>
        <div className="space-y-6"></div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-[70%]">
          <Accordion sx={{ backgroundColor: "#151c25" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span" sx={{ color: "white" }}>
                ¿Qué es NexoFormar y cómo funciona?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ color: "white" }}>
              NexoFormar es una plataforma que permite a los usuarios publicar cursos que se disponibilizarán de forma gratuita para que otros usuarios puedan acceder a ellos a través del panel principal.
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-[70%]">
          <Accordion sx={{ backgroundColor: "#151c25" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span" sx={{ color: "white" }}>
                ¿Es necesario registrarse para usar la plataforma?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ color: "white" }}>
              Si, debes crear una cuenta para publicar cursos y acceder a todas las funcionalidades de la plataforma.
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-[70%]">
          <Accordion sx={{ backgroundColor: "#151c25" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span" sx={{ color: "white" }}>
                ¿Qué tipo de cursos puedo publicar?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ color: "white" }}>
             Las categorías de cursos son variadas y se modifican constantemente para adaptarse a las necesidades de los usuarios. Podés encontrar las categorías disponibles tanto a la hora de buscar como a la hora de publicar un curso.
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-[70%]">
          <Accordion sx={{ backgroundColor: "#151c25" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span" sx={{ color: "white" }}>
                ¿Cuánto tiempo permanece activo mi publicación?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ color: "white" }}>
              Las publicaciones no tienen tiempo de expiración, por lo que estarán disponibles hasta que decidas eliminarlas o se infrinjan las normas de la plataforma.
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-[70%]">
          <Accordion sx={{ backgroundColor: "#151c25" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span" sx={{ color: "white" }}>
                ¿Hay alguna comisión por usar la plataforma?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ color: "white" }}>
              No, el servicio utilizado es gratuito y libre para todo el
              público.
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-[70%]">
          <Accordion sx={{ backgroundColor: "#151c25" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span" sx={{ color: "white" }}>
                ¿Qué tipo de publicaciones están prohibidas?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ color: "white" }}>
              Las publicaciones de cursos deben ser de contenido educativo y gratuito, de lo contrario serán eliminadas y el usuario inhabilitado.
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      <div className="flex justify-center mt-10 pb-8">
        <div className="w-[70%]">
          <Accordion sx={{ backgroundColor: "#151c25" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span" sx={{ color: "white" }}>
                Que debo hacer si inhabilitan mi usuario?
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ color: "white" }}>
              En caso de que tu usuario sea bloqueado como penalización por
              infringir las normas, deberás mandar un mail para consultar sobre
              el estado de tu cuenta y si existe o no posibilidad de devolver la
              actividad de la misma
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
}