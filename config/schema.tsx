import { integer, json, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits:integer()
});

export const SessionChatTable = pgTable('sessionChatTable',{
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sessionId: varchar().notNull(),
  notes: text(),
  selectedDoctor: json(),
  conversation:json(),
  report:json(),
  createdBy:varchar().references(()=>usersTable.email),
  createdOn: varchar()
})

export const MedicalRecordsTable = pgTable('medicalRecordsTable', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fileName: varchar({ length: 255 }).notNull(),
  fileUrl: varchar({ length: 500 }).notNull(),
  fileType: varchar({ length: 100 }).notNull(),
  fileSize: integer(),
  summary: text(),
  originalContent: text(),
  createdBy: varchar().references(() => usersTable.email),
  createdOn: varchar()
})
