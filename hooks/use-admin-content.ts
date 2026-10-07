"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type SetStateAction,
} from "react";
import { apiFetch } from "@/lib/http";
import { reportSave } from "@/components/admin/SaveStatus";
export function useAdminContent<T>(key: string, initial: T | (() => T)) {
  const [value, setValue] = useState(initial),
    [ready, setReady] = useState(false);
  const current = useRef(value),
    version = useRef(0),
    saving = useRef(false);
  useEffect(() => {
    let active = true;
    apiFetch<{ data: T; version: number }>("/api/admin/content/" + key)
      .then((r) => {
        if (active) {
          current.current = r.data;
          version.current = r.version;
          setValue(r.data);
          setReady(true);
        }
      })
      .catch((e) => reportSave(e.message, true));
    return () => {
      active = false;
    };
  }, [key]);
  const save = useCallback(
    (action: SetStateAction<T>) => {
      if (!ready || saving.current) {
        reportSave("Espera a que termine la operación actual.", true);
        return;
      }
      const next =
        typeof action === "function"
          ? (action as (v: T) => T)(current.current)
          : action;
      saving.current = true;
      reportSave("Guardando cambios…", false, true);
      apiFetch<{ data: T; version: number }>("/api/admin/content/" + key, {
        method: "PUT",
        body: JSON.stringify({ data: next, version: version.current }),
      })
        .then((r) => {
          current.current = r.data;
          version.current = r.version;
          setValue(r.data);
          reportSave("Cambios guardados.");
        })
        .catch((e) => reportSave(e.message, true))
        .finally(() => {
          saving.current = false;
        });
    },
    [key, ready],
  );
  return [value, save, ready] as const;
}
