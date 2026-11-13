
function obtenerDiagnostico(error: unknown) {
  const principal = error instanceof Error ? error : null;
  const causa = principal?.cause;

  const sourceError =
    causa && typeof causa === "object" && "sourceError" in causa
      ? causa.sourceError
      : undefined;

  const sourceCause =
    sourceError instanceof Error ? sourceError.cause : undefined;

  const codigo = (valor: unknown): string | null => {
    if (valor && typeof valor === "object" && "code" in valor) {
      return typeof valor.code === "string" ? valor.code : null;
    }
    return null;
  };

  const mensaje = (valor: unknown): string => {
    if (!(valor instanceof Error)) return "";

    const texto = valor.message.toLowerCase();

    if (texto.includes("fetch failed")) return "FETCH_FAILED";
    if (texto.includes("password authentication")) return "AUTH_FAILED";
    if (texto.includes("connection")) return "CONNECTION_ERROR";
    if (texto.includes("relation") && texto.includes("does not exist"))
      return "RELATION_NOT_FOUND";
    if (texto.includes("column") && texto.includes("does not exist"))
      return "COLUMN_NOT_FOUND";

    return "OTRO_ERROR";
  };

  return {
    tipo: principal?.name ?? typeof error,
    causaTipo: causa instanceof Error ? causa.name : typeof causa,
    causaCodigo: codigo(causa),
    causaMensaje: mensaje(causa),

    sourceErrorTipo:
      sourceError instanceof Error ? sourceError.name : null,
    sourceErrorMensaje: mensaje(sourceError),
    sourceCauseCodigo: codigo(sourceCause),
    sourceCauseMensaje: mensaje(sourceCause),
  };
}
