import { sql } from "drizzle-orm";
import {
  pgTable,
  pgEnum,
  uuid,
  text,
  varchar,
  boolean,
  timestamp,
  integer,
  jsonb,
  index,
  check,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("user_role", [
  "admin",
  "receptionist",
  "editor",
]);
export const statusEnum = pgEnum("appointment_status", [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
]);
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 254 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: roleEnum("role").default("editor").notNull(),
  active: boolean("active").default(true).notNull(),
  sessionVersion: integer("session_version").default(1).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
export const content = pgTable("content", {
  key: varchar("key", { length: 40 }).primaryKey(),
  data: jsonb("data").$type<Record<string, unknown>>().notNull(),
  version: integer("version").default(1).notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
export const services = pgTable(
  "services",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: varchar("slug", { length: 120 }).notNull().unique(),
    name: varchar("name", { length: 160 }).notNull(),
    description: text("description").notNull(),
    type: varchar("type", { length: 30 }).notNull(),
    icon: varchar("icon", { length: 60 }).notNull().default("brain"),
    modality: varchar("modality", { length: 120 })
      .notNull()
      .default("Presencial"),
    priceCents: integer("price_cents").notNull().default(0),
    durationMinutes: integer("duration_minutes").notNull().default(60),
    active: boolean("active").default(true).notNull(),
    displayOrder: integer("display_order").default(0).notNull(),
  },
  (t) => [
    check("service_price", sql`${t.priceCents} >= 0`),
    check("service_duration", sql`${t.durationMinutes} BETWEEN 15 AND 240`),
  ],
);
export const faqs = pgTable("faqs", {
  id: uuid("id").defaultRandom().primaryKey(),
  question: varchar("question", { length: 500 }).notNull(),
  answer: text("answer").notNull(),
  category: varchar("category", { length: 30 }).notNull(),
  active: boolean("active").default(true).notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
});
export const patients = pgTable(
  "patients",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 160 }).notNull(),
    phone: varchar("phone", { length: 20 }).notNull(),
    email: varchar("email", { length: 254 }),
    active: boolean("active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [index("patients_phone_idx").on(t.phone)],
);
export const appointments = pgTable(
  "appointments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    patientId: uuid("patient_id")
      .notNull()
      .references(() => patients.id),
    serviceId: uuid("service_id")
      .notNull()
      .references(() => services.id),
    startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
    endsAt: timestamp("ends_at", { withTimezone: true }).notNull(),
    status: statusEnum("status").default("pending").notNull(),
    modality: varchar("modality", { length: 20 })
      .default("presencial")
      .notNull(),
    createdBy: uuid("created_by").references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    index("appointments_start_idx").on(t.startsAt),
    index("appointments_patient_idx").on(t.patientId),
    check("appointment_duration", sql`${t.endsAt} > ${t.startsAt}`),
  ],
);
export const notes = pgTable("patient_notes", {
  id: uuid("id").defaultRandom().primaryKey(),
  patientId: uuid("patient_id")
    .notNull()
    .references(() => patients.id),
  body: text("body").notNull(),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
export const visitorQuestions = pgTable("visitor_questions", {
  id: uuid("id").defaultRandom().primaryKey(),
  question: varchar("question", { length: 1000 }).notNull(),
  status: varchar("status", { length: 20 }).default("pending").notNull(),
  answer: text("answer"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
export const patientForms = pgTable("patient_forms", {
  id: uuid("id").defaultRandom().primaryKey(),
  patientId: uuid("patient_id")
    .notNull()
    .references(() => patients.id),
  title: varchar("title", { length: 160 }).notNull(),
  status: varchar("status", { length: 20 }).default("pending").notNull(),
  answers: jsonb("answers")
    .$type<Record<string, string>>()
    .default({})
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  patientId: uuid("patient_id")
    .notNull()
    .references(() => patients.id),
  body: text("body").notNull(),
  direction: varchar("direction", { length: 20 }).default("internal").notNull(),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
export const rateLimits = pgTable("rate_limits", {
  key: text("key").primaryKey(),
  count: integer("count").default(1).notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});
export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  actorId: uuid("actor_id")
    .notNull()
    .references(() => users.id),
  action: varchar("action", { length: 30 }).notNull(),
  resource: varchar("resource", { length: 80 }).notNull(),
  resourceId: text("resource_id").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
