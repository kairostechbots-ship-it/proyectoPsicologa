import { describe, it, expect } from "vitest";
import {
  bookingSchema,
  contactSchema,
  serviceSchema,
  contentSchemas,
  patientSchema,
} from "../lib/validators";
import { validateSchedule } from "../lib/appointments/schedule";
import { contactMock } from "../data/contact.mock";
import { profileMock } from "../data/profile.mock";
import { mockPromotion } from "../data/promotion.mock";
import { naturalMedicineMock } from "../data/natural-medicine.mock";
describe("contratos", () => {
  it("valida el contenido que inicializa el proyecto", () => {
    expect(contactSchema.safeParse(contactMock).success).toBe(true);
    expect(contentSchemas.profile.safeParse(profileMock).success).toBe(true);
    expect(contentSchemas.promotion.safeParse(mockPromotion).success).toBe(
      true,
    );
    expect(
      contentSchemas["natural-medicine"].safeParse(naturalMedicineMock).success,
    ).toBe(true);
  });
  it("normaliza teléfonos y rechaza campos internos", () => {
    expect(
      patientSchema.parse({ name: "Ana", phone: "(55) 1234-5678" }).phone,
    ).toBe("5512345678");
    expect(
      bookingSchema.safeParse({ patientId: "x", status: "confirmed" }).success,
    ).toBe(false);
  });
  it("rechaza precios negativos y fechas sin zona horaria", () => {
    expect(serviceSchema.safeParse({ priceCents: -1 }).success).toBe(false);
    expect(
      bookingSchema.safeParse({
        patient: { name: "Ana", phone: "5512345678" },
        serviceId: "00000000-0000-4000-8000-000000000001",
        startsAt: "2026-10-05T16:00:00",
      }).success,
    ).toBe(false);
  });
});
describe("horarios del consultorio", () => {
  const now = new Date("2026-10-01T00:00:00Z");
  it("acepta una cita dentro de horario de Jalisco", () => {
    expect(() =>
      validateSchedule(
        new Date("2026-10-05T16:00:00-06:00"),
        new Date("2026-10-05T17:00:00-06:00"),
        contactMock,
        now,
      ),
    ).not.toThrow();
  });
  it.each([
    ["2026-09-28T16:00:00-06:00", "2026-09-28T17:00:00-06:00"],
    ["2026-10-04T16:00:00-06:00", "2026-10-04T17:00:00-06:00"],
    ["2026-10-05T20:30:00-06:00", "2026-10-05T21:30:00-06:00"],
    ["2026-10-05T15:00:00-06:00", "2026-10-05T16:00:00-06:00"],
  ])("rechaza pasado, día cerrado o fuera de horario: %s", (a, b) => {
    expect(() =>
      validateSchedule(new Date(a), new Date(b), contactMock, now),
    ).toThrow();
  });
});
