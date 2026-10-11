'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import { usePathname } from 'next/navigation';

import { Chatbot } from './Chatbot';
import { StructuredData } from './seo/StructuredData';

import { apiFetch } from '@/lib/http';

import type { ContactInfo } from '@/types/contact';
import type { ProfessionalProfile } from '@/types/profile';
import type { NaturalMedicineConsultation } from '@/types/natural-medicine';
import type { Promotion } from '@/types/promotion';
import type { Service } from '@/types/psychotherapy';
import type { FAQ } from '@/types/faq';

export interface SiteData {
  chatEnabled: boolean;
  contact: ContactInfo;
  profile: ProfessionalProfile;
  naturalMedicine: NaturalMedicineConsultation;
  promotion: Promotion | null;
  services: Service[];
  faqs: FAQ[];
}

interface SiteDataProviderProps {
  children: ReactNode;
  initialData?: SiteData | null;
}

const Context = createContext<SiteData | null>(null);

function isPrivatePath(path: string): boolean {
  return (
    path === '/admin' ||
    path.startsWith('/admin/') ||
    path === '/panel' ||
    path.startsWith('/panel/')
  );
}

export function SiteDataProvider({
  children,
  initialData = null,
}: SiteDataProviderProps) {
  const pathname = usePathname();
  const privatePage = isPrivatePath(pathname ?? '');

  const [data, setData] = useState<SiteData | null>(
    initialData,
  );

  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (initialData) {
      setData(initialData);
      setError('');
    }
  }, [initialData]);

  useEffect(() => {
    if (privatePage || data) {
      return;
    }

    let active = true;

    setError('');

    apiFetch<SiteData>('/api/site')
      .then((result) => {
        if (!active) {
          return;
        }

        if (!result) {
          throw new Error('La respuesta no contiene datos.');
        }

        setData(result);
        setError('');
      })
      .catch(() => {
        if (active) {
          setError(
            'No pudimos cargar la información. Intenta de nuevo.',
          );
        }
      });

    return () => {
      active = false;
    };
  }, [privatePage, data, retryCount]);

  if (privatePage) {
    return <>{children}</>;
  }

  if (!data && error) {
    return (
      <main
        className="p-10 text-center"
        role="alert"
      >
        <p>{error}</p>

        <button
          type="button"
          className="mt-4 underline"
          onClick={() => {
            setError('');
            setRetryCount((value) => value + 1);
          }}
        >
          Reintentar
        </button>
      </main>
    );
  }

  if (!data) {
    return (
      <p
        role="status"
        className="p-10 text-center"
      >
        Cargando información…
      </p>
    );
  }

  return (
    <Context.Provider value={data}>
      <StructuredData />

      {children}

      {data.chatEnabled && <Chatbot />}
    </Context.Provider>
  );
}

export function useSiteData(): SiteData {
  const data = useContext(Context);

  if (!data) {
    throw new Error('Falta SiteDataProvider.');
  }

  return data;
}