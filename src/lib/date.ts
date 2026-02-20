const AR_TZ = "America/Argentina/Buenos_Aires";

function toDateSafe(input?: string | Date | null): Date | null {
  if (!input) return null;
  if (input instanceof Date) return Number.isNaN(input.getTime()) ? null : input;

  const d = new Date(input);
  if (!Number.isNaN(d.getTime())) return d;

  const s = String(input);
  const onlyDate = s.split(" ")[0];
  if (/^\d{4}-\d{2}-\d{2}$/.test(onlyDate)) {
    const [y, m, day] = onlyDate.split("-").map(Number);
    const local = new Date(y, m - 1, day);
    return Number.isNaN(local.getTime()) ? null : local;
  }

  return null;
}

export function formatFechaAR(input?: string | Date | null) {
  const d = toDateSafe(input);
  if (!d) return "-";

  return new Intl.DateTimeFormat("es-AR", {
    timeZone: AR_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}
