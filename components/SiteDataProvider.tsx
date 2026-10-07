"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { Chatbot } from "./Chatbot";
import { StructuredData } from "./seo/StructuredData";
import { apiFetch } from "@/lib/http";
import type { ContactInfo } from "@/types/contact";
import type { ProfessionalProfile } from "@/types/profile";
import type { NaturalMedicineConsultation } from "@/types/natural-medicine";
import type { Promotion } from "@/types/promotion";
import type { Service } from "@/types/psychotherapy";
import type { FAQ } from "@/types/faq";
export interface SiteData {
  chatEnabled: boolean;
  contact: ContactInfo;
  profile: ProfessionalProfile;
  naturalMedicine: NaturalMedicineConsultation;
  promotion: Promotion | null;
  services: Service[];
  faqs: FAQ[];
}
const Context = createContext<SiteData | null>(null);
export function SiteDataProvider({
  children,
  initialData = null,
}: {
  children: ReactNode;
  initialData?: SiteData | null;
}) {
  const path = usePathname(),
    privatePage = path.startsWith("/admin") || path.startsWith("/panel");
  const [data, setData] = useState<SiteData | null>(initialData),
    [error, setError] = useState("");
  useEffect(() => {
    if (privatePage) return;
    let active = true;
    apiFetch<SiteData>("/api/site")
      .then((v) => {
        if (active) {
          setData(v);
          setError("");
        }
      })
      .catch(() => {
        if (active)
          setError("No pudimos cargar la información. Intenta de nuevo.");
      });
    return () => {
      active = false;
    };
  }, [privatePage, path]);
  if (privatePage) return children;
  if (error)
    return (
      <main className="p-10 text-center" role="alert">
        {error}
        <br />
        <button
          className="mt-4 underline"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </button>
      </main>
    );
  if (!data)
    return (
      <p role="status" className="p-10 text-center">
        Cargando información…
      </p>
    );
  return (
    <Context.Provider value={data}>
      <StructuredData />
      {children}
      {data.chatEnabled && <Chatbot />}
    </Context.Provider>
  );
}
export function useSiteData() {
  const data = useContext(Context);
  if (!data) throw new Error("Falta SiteDataProvider.");
  return data;
}
