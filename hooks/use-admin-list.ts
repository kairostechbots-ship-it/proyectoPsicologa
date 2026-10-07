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
import {
  serviceView,
  serviceInput,
  type ServiceRecord,
} from "@/lib/service-view";
import type { Service } from "@/types/psychotherapy";
type Item = { id: number };
export function useAdminList<T extends Item>(
  key: "services" | "faq",
  initial: T[],
) {
  const [value, setValue] = useState<T[]>(initial),
    [ready, setReady] = useState(false);
  const current = useRef<T[]>([]),
    ids = useRef(new Map<number, string>()),
    saving = useRef(false);
  const fetchRows = useCallback(
    () =>
      apiFetch<Array<{ id: string } & Record<string, unknown>>>(
        "/api/admin/" + key + "?limit=100",
      ),
    [key],
  );
  const applyRows = useCallback(
    (records: Array<{ id: string } & Record<string, unknown>>) => {
      ids.current = new Map(records.map((r, i) => [i + 1, r.id]));
      const data = records.map((r, i) =>
        key === "services"
          ? serviceView(r as unknown as ServiceRecord, i + 1)
          : { ...r, id: i + 1 },
      ) as T[];
      current.current = data;
      setValue(data);
      setReady(true);
    },
    [key],
  );
  const load = useCallback(
    () => fetchRows().then(applyRows),
    [fetchRows, applyRows],
  );
  useEffect(() => {
    let active = true;
    fetchRows()
      .then((rows) => {
        if (active) applyRows(rows);
      })
      .catch((e) => reportSave(e.message, true));
    return () => {
      active = false;
    };
  }, [fetchRows, applyRows]);
  const save = useCallback(
    (action: SetStateAction<T[]>) => {
      if (!ready || saving.current) {
        reportSave("Espera a que termine la operación actual.", true);
        return;
      }
      const next =
        typeof action === "function" ? action(current.current) : action;
      saving.current = true;
      reportSave("Guardando cambios…", false, true);
      const run = async () => {
        for (const item of next) {
          const previous = current.current.find((x) => x.id === item.id);
          if (JSON.stringify(previous) === JSON.stringify(item)) continue;
          const uuid = ids.current.get(item.id);
          const { id: localId, ...rest } = item;
          void localId;
          const data =
            key === "services"
              ? serviceInput(item as unknown as Service)
              : rest;
          await apiFetch("/api/admin/" + key + (uuid ? "/" + uuid : ""), {
            method: uuid ? "PATCH" : "POST",
            body: JSON.stringify(data),
          });
        }
        for (const old of current.current) {
          if (!next.some((x) => x.id === old.id))
            await apiFetch(
              "/api/admin/" + key + "/" + ids.current.get(old.id),
              { method: "DELETE" },
            );
        }
        await load();
        reportSave("Cambios guardados.");
      };
      run()
        .catch(async (e) => {
          reportSave(e.message, true);
          await load().catch(() => {});
        })
        .finally(() => {
          saving.current = false;
        });
    },
    [key, ready, load],
  );
  return [value, save, ready] as const;
}
