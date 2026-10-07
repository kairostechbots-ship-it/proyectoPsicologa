"use client";
import { useEffect, useState } from "react";
export function SaveStatus() {
  const [status, setStatus] = useState<{
    message: string;
    error?: boolean;
    busy?: boolean;
  } | null>(null);
  useEffect(() => {
    const handler = (event: Event) => setStatus((event as CustomEvent).detail);
    window.addEventListener("save-status", handler);
    return () => window.removeEventListener("save-status", handler);
  }, []);
  if (!status) return null;
  return (
    <div
      role={status.error ? "alert" : "status"}
      className={
        "fixed bottom-5 right-5 z-[100] max-w-md rounded-xl p-4 shadow-lg " +
        (status.error ? "bg-red-100 text-red-900" : "bg-white text-slate-800")
      }
    >
      {status.message}
      {!status.busy && (
        <button onClick={() => setStatus(null)} className="ml-4 underline">
          Cerrar
        </button>
      )}
    </div>
  );
}
export function reportSave(message: string, error = false, busy = false) {
  window.dispatchEvent(
    new CustomEvent("save-status", { detail: { message, error, busy } }),
  );
}
