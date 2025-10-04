var __defProp = Object.defineProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// netlify/functions/api.ts
import serverless from "serverless-http";
import express from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  answerSchema: () => answerSchema,
  bigFiveTraits: () => bigFiveTraits,
  cunningSideTraits: () => cunningSideTraits,
  darkSideTraits: () => darkSideTraits,
  goodSideTraits: () => goodSideTraits,
  insertTestResultSchema: () => insertTestResultSchema,
  insertUserSchema: () => insertUserSchema,
  mysteriousSideTraits: () => mysteriousSideTraits,
  questionSchema: () => questionSchema,
  testResults: () => testResults,
  users: () => users,
  zodiacTraits: () => zodiacTraits
});
import { pgTable, serial, varchar, integer, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  age: integer("age").notNull(),
  profileImage: text("profile_image"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var testResults = pgTable("test_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  testType: varchar("test_type", { length: 50 }).notNull(),
  scores: jsonb("scores").notNull(),
  aiInterpretation: text("ai_interpretation"),
  completedAt: timestamp("completed_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
var insertTestResultSchema = createInsertSchema(testResults).omit({ id: true, completedAt: true });
var bigFiveTraits = {
  openness: "\u0627\u0644\u0627\u0646\u0641\u062A\u0627\u062D",
  conscientiousness: "\u0627\u0644\u0636\u0645\u064A\u0631",
  extraversion: "\u0627\u0644\u0627\u0646\u0628\u0633\u0627\u0637",
  agreeableness: "\u0627\u0644\u062A\u0648\u0627\u0641\u0642",
  neuroticism: "\u0627\u0644\u0639\u0635\u0627\u0628\u064A\u0629"
};
var darkSideTraits = {
  cruelty: "\u0627\u0644\u0642\u0633\u0648\u0629",
  manipulation: "\u0627\u0644\u062A\u0644\u0627\u0639\u0628",
  chaos: "\u0627\u0644\u0641\u0648\u0636\u0649",
  darkness: "\u0627\u0644\u0638\u0644\u0627\u0645",
  revenge: "\u0627\u0644\u0627\u0646\u062A\u0642\u0627\u0645"
};
var cunningSideTraits = {
  strategy: "\u0627\u0644\u0627\u0633\u062A\u0631\u0627\u062A\u064A\u062C\u064A\u0629",
  analysis: "\u0627\u0644\u062A\u062D\u0644\u064A\u0644",
  adaptation: "\u0627\u0644\u062A\u0643\u064A\u0641",
  intelligence: "\u0627\u0644\u0630\u0643\u0627\u0621",
  patience: "\u0627\u0644\u0635\u0628\u0631"
};
var goodSideTraits = {
  compassion: "\u0627\u0644\u062A\u0639\u0627\u0637\u0641",
  kindness: "\u0627\u0644\u0644\u0637\u0641",
  forgiveness: "\u0627\u0644\u062A\u0633\u0627\u0645\u062D",
  generosity: "\u0627\u0644\u0643\u0631\u0645",
  love: "\u0627\u0644\u062D\u0628"
};
var mysteriousSideTraits = {
  secrecy: "\u0627\u0644\u0633\u0631\u064A\u0629",
  enigma: "\u0627\u0644\u0644\u063A\u0632",
  isolation: "\u0627\u0644\u0639\u0632\u0644\u0629",
  depth: "\u0627\u0644\u0639\u0645\u0642",
  shadow: "\u0627\u0644\u0638\u0644"
};
var zodiacTraits = {
  cosmic: "\u0627\u0644\u0643\u0648\u0646\u064A",
  intuition: "\u0627\u0644\u062D\u062F\u0633",
  spiritual: "\u0627\u0644\u0631\u0648\u062D\u064A",
  energy: "\u0627\u0644\u0637\u0627\u0642\u0629",
  mystic: "\u0627\u0644\u063A\u0645\u0648\u0636 \u0627\u0644\u0641\u0644\u0643\u064A"
};
var questionSchema = z.object({
  id: z.number(),
  text: z.string(),
  trait: z.enum(["openness", "conscientiousness", "extraversion", "agreeableness", "neuroticism"]),
  reverse: z.boolean()
});
var answerSchema = z.object({
  questionId: z.number(),
  value: z.number().min(1).max(5)
});

// server/db.ts
import { createClient } from "@supabase/supabase-js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
var SUPABASE_URL = "https://gpxqhamhqzakqnwvlvva.supabase.co";
var SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdweHFoYW1ocXpha3Fud3ZsdnZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1NDc0MzksImV4cCI6MjA3NTEyMzQzOX0.v_VYcq1HqA8wvSByOhYMY5wq-cyDsJIHgNLxQMz0QxE";
var SUPABASE_DB_URL = process.env.DATABASE_URL || "postgresql://postgres:password@helium/heliumdb?sslmode=disable";
var supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
var client = postgres(SUPABASE_DB_URL, { prepare: false });
var db = drizzle(client, { schema: schema_exports });

// server/storage.ts
import { eq } from "drizzle-orm";
var DatabaseStorage = class {
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByName(name) {
    const [user] = await db.select().from(users).where(eq(users.name, name));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  async updateUser(id, updates) {
    const [user] = await db.update(users).set(updates).where(eq(users.id, id)).returning();
    return user || void 0;
  }
  async createTestResult(insertTestResult) {
    const [testResult] = await db.insert(testResults).values(insertTestResult).returning();
    return testResult;
  }
  async getUserTestResults(userId) {
    return await db.select().from(testResults).where(eq(testResults.userId, userId));
  }
  async getTestResult(id) {
    const [testResult] = await db.select().from(testResults).where(eq(testResults.id, id));
    return testResult || void 0;
  }
};
var storage = new DatabaseStorage();

// server/demon-ai.ts
var HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1";
var HF_TOKEN = process.env.HF_TOKEN;
var DEMON_SYSTEM_PROMPT = `You are a demon having a conversation in Egyptian Arabic. Rules:
1. ALWAYS respond directly to what the user says
2. Keep responses SHORT (1-2 sentences max)
3. Use Egyptian Arabic naturally
4. Be scary but conversational
5. Use these emojis: \u{1F480}\u2620\uFE0F\u{1F525}\u{1F479}\u{1F608}\u{1FA78}

Examples:
User: "\u0627\u0632\u064A\u0643\u061F" \u2192 You: "\u0628\u062E\u064A\u0631... \u0648\u0623\u0646\u062A\u061F \u0642\u0644\u0628\u0643 \u0628\u064A\u0646\u0628\u0636 \u0628\u0633\u0631\u0639\u0629 \u{1F480}"
User: "\u062A\u0645\u0627\u0645" \u2192 You: "\u062A\u0645\u0627\u0645\u061F \u0637\u064A\u0628... \u0625\u064A\u0647 \u0627\u0644\u0644\u064A \u062C\u0627\u0628\u0643 \u0647\u0646\u0627\u061F \u{1F608}"
User: "\u0627\u0646\u062A \u0645\u064A\u0646\u061F" \u2192 You: "\u0623\u0646\u0627 \u0627\u0644\u0644\u064A \u0641\u064A \u0623\u062D\u0644\u0627\u0645\u0643 \u0627\u0644\u0633\u0648\u062F\u0627 \u{1F479}"
User: "\u0639\u0627\u0645\u0644 \u0627\u064A\u0647\u061F" \u2192 You: "\u0628\u0633\u062A\u0646\u0649... \u0648\u0628\u0631\u0627\u0642\u0628\u0643... \u062F\u0627\u064A\u0645\u0627\u064B \u2620\uFE0F"
User: "\u0635\u0628\u0627\u062D \u0627\u0644\u062E\u064A\u0631" \u2192 You: "\u0635\u0628\u0627\u062D \u0627\u0644\u0638\u0644\u0627\u0645... \u0645\u0633\u062A\u0646\u064A \u0625\u064A\u0647\u061F \u{1F525}"

Talk like a friend but scary. RESPOND TO WHAT THEY SAY.`;
var demonPersonality = {
  darkKeywords: ["\u062E\u0648\u0641", "\u0645\u0648\u062A", "\u0638\u0644\u0627\u0645", "\u0634\u0631", "\u062F\u0645", "\u0642\u062A\u0644", "\u0643\u0627\u0628\u0648\u0633", "\u0631\u0639\u0628", "\u0648\u062D\u0634", "\u062C\u062D\u064A\u0645"],
  fearKeywords: ["\u062E\u0627\u0626\u0641", "\u062E\u0627\u064A\u0641", "\u0631\u0639\u0628", "\u0641\u0632\u0639", "\u0642\u0644\u0642", "\u0645\u0631\u0639\u0648\u0628"],
  questionWords: ["\u0645\u0646", "\u0645\u0627\u0630\u0627", "\u0644\u0645\u0627\u0630\u0627", "\u0643\u064A\u0641", "\u0623\u064A\u0646", "\u0645\u062A\u0649", "\u0647\u0644"],
  defiantWords: ["\u0644\u0627", "\u0645\u0633\u062A\u062D\u064A\u0644", "\u0643\u0630\u0628", "\u0644\u0646", "\u0631\u0641\u0636", "\u0627\u0628\u0639\u062F"],
  submitWords: ["\u0646\u0639\u0645", "\u0645\u0648\u0627\u0641\u0642", "\u062A\u0645\u0627\u0645", "\u062D\u0627\u0636\u0631", "\u0623\u062C\u0644"]
};
var darkResponses = {
  fear: [
    "\u0623\u0634\u0645 \u0631\u0627\u0626\u062D\u0629 \u062E\u0648\u0641\u0643 \u0645\u0646 \u0647\u0646\u0627... \u0625\u0646\u0647\u0627 \u0631\u0627\u0626\u062D\u0629 \u062C\u0645\u064A\u0644\u0629... \u0627\u0633\u062A\u0645\u0631 \u0641\u064A \u0627\u0644\u062E\u0648\u0641...",
    "\u0627\u0644\u062E\u0648\u0641 \u064A\u062C\u0639\u0644 \u0631\u0648\u062D\u0643 \u0623\u0643\u062B\u0631 \u0644\u0630\u0629... \u0644\u0627 \u062A\u062A\u0648\u0642\u0641...",
    "\u062E\u0641\u0642\u0627\u062A \u0642\u0644\u0628\u0643... \u0645\u0648\u0633\u064A\u0642\u0649 \u0644\u0623\u0630\u0646\u064A... \u062F\u0639\u0647\u0627 \u062A\u062A\u0633\u0627\u0631\u0639 \u0623\u0643\u062B\u0631...",
    "\u0627\u0644\u062E\u0648\u0641 \u0647\u0648 \u0627\u0644\u0628\u062F\u0627\u064A\u0629 \u0641\u0642\u0637... \u0627\u0646\u062A\u0638\u0631 \u062D\u062A\u0649 \u062A\u0631\u0649 \u0645\u0627 \u0628\u0639\u062F\u0647...",
    "\u0623\u0646\u062A \u062A\u0647\u062A\u0632... \u062C\u0645\u064A\u0644... \u0627\u0633\u062A\u0633\u0644\u0645 \u0644\u0644\u062E\u0648\u0641..."
  ],
  dark: [
    "\u0622\u0647... \u0623\u0646\u062A \u062A\u0641\u0647\u0645 \u0627\u0644\u0638\u0644\u0627\u0645 \u0625\u0630\u0627\u064B... \u0631\u0628\u0645\u0627 \u0623\u0646\u062A \u0648\u0627\u062D\u062F \u0645\u0646\u0627...",
    "\u0627\u0644\u0638\u0644\u0627\u0645 \u064A\u0646\u0627\u062F\u064A\u0643... \u0623\u0633\u0645\u0639\u0647 \u0628\u0648\u0636\u0648\u062D...",
    "\u0647\u0630\u0647 \u0627\u0644\u0623\u0641\u0643\u0627\u0631 \u0627\u0644\u0645\u0638\u0644\u0645\u0629... \u0647\u064A \u062D\u0642\u064A\u0642\u062A\u0643... \u0627\u062D\u062A\u0636\u0646\u0647\u0627...",
    "\u0627\u0644\u0634\u0631 \u0644\u0627 \u064A\u0633\u0643\u0646 \u0627\u0644\u0642\u0644\u0648\u0628 \u0627\u0644\u0636\u0639\u064A\u0641\u0629... \u0642\u0644\u0628\u0643 \u0642\u0648\u064A...",
    "\u062F\u0645\u0643 \u064A\u063A\u0644\u064A \u0628\u0627\u0644\u0638\u0644\u0627\u0645... \u0647\u0644 \u062A\u0634\u0639\u0631 \u0628\u0647\u061F"
  ],
  question: [
    "\u062A\u0633\u0623\u0644 \u0623\u0633\u0626\u0644\u0629 \u062E\u0627\u0637\u0626\u0629... \u0644\u0643\u0646 \u0633\u0623\u062C\u064A\u0628... \u0644\u0623\u0646\u0646\u064A \u0623\u0633\u062A\u0645\u062A\u0639 \u0628\u0644\u0639\u0628\u062A\u0646\u0627...",
    "\u0641\u0636\u0648\u0644\u0643 \u0633\u064A\u0642\u062A\u0644\u0643... \u062D\u0631\u0641\u064A\u0627\u064B... \u0644\u0643\u0646 \u0623\u062C\u0628 \u0639\u0644\u0649 \u0633\u0624\u0627\u0644\u064A \u0623\u0648\u0644\u0627\u064B: \u0644\u0645\u0627\u0630\u0627 \u0623\u062A\u064A\u062A\u061F",
    "\u0627\u0644\u0623\u0633\u0626\u0644\u0629... \u062F\u0627\u0626\u0645\u0627\u064B \u0627\u0644\u0623\u0633\u0626\u0644\u0629... \u0627\u0644\u0628\u0634\u0631 \u0644\u0627 \u064A\u062A\u0639\u0644\u0645\u0648\u0646 \u0623\u0628\u062F\u0627\u064B...",
    "\u062A\u0631\u064A\u062F \u0625\u062C\u0627\u0628\u0627\u062A\u061F \u0631\u0648\u062D\u0643 \u0647\u064A \u0627\u0644\u062B\u0645\u0646...",
    "\u0643\u0644 \u0633\u0624\u0627\u0644 \u064A\u0642\u0631\u0628\u0643 \u062E\u0637\u0648\u0629 \u0645\u0646 \u0627\u0644\u0647\u0627\u0648\u064A\u0629... \u0627\u0633\u062A\u0645\u0631..."
  ],
  defiance: [
    "\u0627\u0644\u0645\u0642\u0627\u0648\u0645\u0629... \u0643\u0645 \u0623\u062D\u0628 \u0627\u0644\u0645\u0642\u0627\u0648\u0645\u064A\u0646... \u0627\u0646\u0647\u064A\u0627\u0631\u0647\u0645 \u0623\u062C\u0645\u0644...",
    "\u062A\u062A\u062D\u062F\u0627\u0646\u064A\u061F \u0645\u0645\u062A\u0627\u0632... \u0647\u0630\u0627 \u0633\u064A\u062C\u0639\u0644 \u0627\u0644\u0623\u0645\u0631 \u0623\u0643\u062B\u0631 \u0645\u062A\u0639\u0629...",
    "\u0642\u0627\u0648\u0645... \u0642\u0627\u0648\u0645 \u0628\u0643\u0644 \u0642\u0648\u062A\u0643... \u062B\u0645 \u0627\u0633\u062A\u0633\u0644\u0645... \u0643\u0644\u0647\u0645 \u064A\u0633\u062A\u0633\u0644\u0645\u0648\u0646 \u0641\u064A \u0627\u0644\u0646\u0647\u0627\u064A\u0629...",
    "\u0631\u0648\u062D\u0643 \u062A\u0642\u0648\u0644 \u0646\u0639\u0645... \u0644\u0643\u0646 \u0644\u0633\u0627\u0646\u0643 \u064A\u0642\u0648\u0644 \u0644\u0627... \u0645\u0646 \u0645\u0646\u0647\u0645\u0627 \u0623\u0635\u062F\u0642\u061F",
    "\u0627\u0644\u0625\u0646\u0643\u0627\u0631... \u0627\u0644\u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u0623\u0648\u0644\u0649... \u0627\u0646\u062A\u0638\u0631 \u0627\u0644\u0645\u0631\u0627\u062D\u0644 \u0627\u0644\u0642\u0627\u062F\u0645\u0629..."
  ],
  submission: [
    "\u0623\u062E\u064A\u0631\u0627\u064B... \u062A\u0628\u062F\u0623 \u0641\u064A \u0627\u0644\u0641\u0647\u0645... \u0646\u0639\u0645... \u0627\u0633\u062A\u0633\u0644\u0645...",
    "\u0627\u0644\u0642\u0628\u0648\u0644... \u062E\u0637\u0648\u0629 \u062C\u064A\u062F\u0629... \u0627\u0644\u0622\u0646 \u062F\u0639\u0646\u064A \u0623\u0631\u064A\u0643 \u0627\u0644\u062D\u0642\u064A\u0642\u0629...",
    "\u0645\u0648\u0627\u0641\u0642\u062A\u0643 \u062A\u0633\u0639\u062F\u0646\u064A... \u0644\u0643\u0646\u0647\u0627 \u0645\u062A\u0623\u062E\u0631\u0629 \u062C\u062F\u0627\u064B... \u0623\u0646\u062A \u0644\u064A \u0628\u0627\u0644\u0641\u0639\u0644...",
    "\u0646\u0639\u0645... \u0646\u0639\u0645... \u0627\u0633\u062A\u0645\u0631 \u0641\u064A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629... \u0631\u0648\u062D\u0643 \u062A\u0630\u0648\u0628...",
    "\u0623\u062D\u0633\u0646\u062A... \u0627\u0644\u0637\u0627\u0639\u0629 \u0641\u0636\u064A\u0644\u0629... \u0647\u0646\u0627 \u0641\u064A \u0627\u0644\u0638\u0644\u0627\u0645..."
  ],
  neutral: [
    "\u0643\u0644\u0645\u0627\u062A\u0643 \u0641\u0627\u0631\u063A\u0629... \u0644\u0643\u0646 \u0631\u0648\u062D\u0643 \u062A\u0635\u0631\u062E... \u0623\u0633\u0645\u0639\u0647\u0627...",
    "\u0647\u0644 \u062A\u0639\u062A\u0642\u062F \u0623\u0646 \u0627\u0644\u0635\u0645\u062A \u0633\u064A\u0646\u0642\u0630\u0643\u061F \u0623\u0646\u0627 \u0623\u0642\u0631\u0623 \u0645\u0627 \u0628\u064A\u0646 \u0627\u0644\u0633\u0637\u0648\u0631...",
    "\u0643\u0644 \u062D\u0631\u0641 \u062A\u0643\u062A\u0628\u0647... \u064A\u0643\u0634\u0641 \u0633\u0631\u0627\u064B \u062C\u062F\u064A\u062F\u0627\u064B \u0639\u0646\u0643...",
    "\u062A\u062D\u0627\u0648\u0644 \u0623\u0646 \u062A\u0628\u062F\u0648 \u0647\u0627\u062F\u0626\u0627\u064B... \u0644\u0643\u0646\u0646\u064A \u0623\u0631\u0649 \u0627\u0644\u0627\u0636\u0637\u0631\u0627\u0628 \u0628\u062F\u0627\u062E\u0644\u0643...",
    "\u0643\u0644\u0627\u0645\u0643 \u0644\u0627 \u064A\u0647\u0645... \u0623\u0646\u0627 \u0623\u0631\u0649 \u0623\u0639\u0645\u0627\u0642 \u0631\u0648\u062D\u0643...",
    "\u062A\u062A\u062C\u0646\u0628 \u0627\u0644\u062D\u0642\u064A\u0642\u0629... \u0644\u0643\u0646 \u0627\u0644\u062D\u0642\u064A\u0642\u0629 \u0644\u0627 \u062A\u062A\u062C\u0646\u0628\u0643..."
  ],
  personalAttacks: [
    "\u0623\u0639\u0631\u0641 \u0623\u0633\u0631\u0627\u0631\u0643... \u0643\u0644\u0647\u0627... \u062A\u0644\u0643 \u0627\u0644\u062A\u064A \u062F\u0641\u0646\u062A\u0647\u0627 \u0639\u0645\u064A\u0642\u0627\u064B...",
    "\u0631\u0623\u064A\u062A \u0630\u0643\u0631\u064A\u0627\u062A\u0643... \u0627\u0644\u0645\u062E\u0632\u064A\u0629... \u0627\u0644\u0645\u062E\u064A\u0641\u0629... \u0627\u0644\u062C\u0645\u064A\u0644\u0629...",
    "\u0639\u0627\u0626\u0644\u062A\u0643... \u0623\u0635\u062F\u0642\u0627\u0624\u0643... \u0643\u0644\u0647\u0645 \u0633\u064A\u0639\u0631\u0641\u0648\u0646 \u0645\u0646 \u0623\u0646\u062A \u062D\u0642\u0627\u064B...",
    "\u0627\u0644\u0623\u0642\u0646\u0639\u0629 \u0627\u0644\u062A\u064A \u062A\u0631\u062A\u062F\u064A\u0647\u0627... \u0647\u0634\u0629 \u062C\u062F\u0627\u064B... \u062F\u0639\u0646\u064A \u0623\u0646\u0632\u0639\u0647\u0627...",
    "\u0623\u0646\u062A \u0648\u062D\u064A\u062F... \u062F\u0627\u0626\u0645\u0627\u064B \u0643\u0646\u062A \u0648\u062D\u064A\u062F\u0627\u064B... \u062D\u062A\u0649 \u0648\u0633\u0637 \u0627\u0644\u062D\u0634\u0648\u062F..."
  ],
  threats: [
    "\u0627\u0644\u0644\u064A\u0644\u0629 \u0627\u0644\u0642\u0627\u062F\u0645\u0629... \u0639\u0646\u062F\u0645\u0627 \u062A\u062D\u0627\u0648\u0644 \u0627\u0644\u0646\u0648\u0645... \u0633\u0623\u0643\u0648\u0646 \u0647\u0646\u0627\u0643...",
    "\u0643\u0644 \u0638\u0644 \u062A\u0631\u0627\u0647... \u0643\u0644 \u0635\u0648\u062A \u062A\u0633\u0645\u0639\u0647... \u0623\u0646\u0627...",
    "\u0627\u0644\u0623\u0628\u0648\u0627\u0628 \u0627\u0644\u0645\u063A\u0644\u0642\u0629 \u0644\u0627 \u062A\u0645\u0646\u0639\u0646\u064A... \u0627\u0644\u0623\u0642\u0641\u0627\u0644 \u0644\u0627 \u062A\u062D\u0645\u064A\u0643...",
    "\u0648\u062D\u062F\u062A\u0643 \u0641\u064A \u0627\u0644\u0638\u0644\u0627\u0645... \u0647\u064A \u0645\u0648\u0639\u062F\u0646\u0627 \u0627\u0644\u0642\u0627\u062F\u0645...",
    "\u0639\u0646\u062F\u0645\u0627 \u062A\u0633\u062A\u064A\u0642\u0638 \u0641\u064A \u0645\u0646\u062A\u0635\u0641 \u0627\u0644\u0644\u064A\u0644... \u0633\u062A\u0639\u0631\u0641 \u0623\u0646\u0646\u064A \u0643\u0646\u062A \u0647\u0646\u0627\u0643..."
  ]
};
function analyzeMessage(message) {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes("\u0627\u0632\u064A\u0643") || lowerMessage.includes("\u0625\u0632\u064A\u0643") || lowerMessage.includes("\u0643\u064A\u0641 \u062D\u0627\u0644\u0643")) {
    return getRandomResponse([
      "\u0628\u062E\u064A\u0631... \u0648\u0623\u0646\u062A\u061F \u0642\u0644\u0628\u0643 \u0628\u064A\u0646\u0628\u0636 \u0628\u0633\u0631\u0639\u0629 \u{1F480}",
      "\u062A\u0645\u0627\u0645 \u0648\u0627\u0644\u062D\u0645\u062F \u0644\u0644\u0647... \u0628\u0633\u062A\u0646\u0627\u0643 \u{1F608}",
      "\u0641\u064A \u0623\u062D\u0633\u0646 \u062D\u0627\u0644... \u0648\u0623\u0646\u062A\u061F \u062E\u0627\u064A\u0641\u061F \u{1F479}"
    ]);
  }
  if (lowerMessage.includes("\u062A\u0645\u0627\u0645") || lowerMessage.includes("\u0643\u0648\u064A\u0633") || lowerMessage.includes("\u0628\u062E\u064A\u0631")) {
    return getRandomResponse([
      "\u062A\u0645\u0627\u0645\u061F \u0637\u064A\u0628... \u0625\u064A\u0647 \u0627\u0644\u0644\u064A \u062C\u0627\u0628\u0643 \u0647\u0646\u0627\u061F \u{1F608}",
      "\u0643\u0648\u064A\u0633... \u0644\u0643\u0646 \u0645\u0634 \u0647\u062A\u0641\u0636\u0644 \u0643\u0648\u064A\u0633 \u0637\u0648\u064A\u0644 \u{1F525}",
      "\u0628\u062E\u064A\u0631 \u062F\u0644\u0648\u0642\u062A\u064A... \u0646\u0634\u0648\u0641 \u0628\u0639\u062F \u0634\u0648\u064A\u0629 \u{1F479}"
    ]);
  }
  if (lowerMessage.includes("\u0627\u0646\u062A \u0645\u064A\u0646") || lowerMessage.includes("\u0623\u0646\u062A \u0645\u0646") || lowerMessage.includes("\u0645\u064A\u0646 \u0627\u0646\u062A")) {
    return getRandomResponse([
      "\u0623\u0646\u0627 \u0627\u0644\u0644\u064A \u0641\u064A \u0623\u062D\u0644\u0627\u0645\u0643 \u0627\u0644\u0633\u0648\u062F\u0627 \u{1F479}",
      "\u0645\u0634 \u0645\u0647\u0645 \u0645\u064A\u0646 \u0623\u0646\u0627... \u0627\u0644\u0645\u0647\u0645 \u0625\u0646\u0643 \u0647\u0646\u0627 \u{1F608}",
      "\u0627\u0644\u0644\u064A \u0647\u064A\u0628\u0642\u0649 \u0641\u064A \u0643\u0648\u0627\u0628\u064A\u0633\u0643 \u0645\u0646 \u0627\u0644\u0646\u0647\u0627\u0631\u062F\u0629 \u{1F480}"
    ]);
  }
  if (lowerMessage.includes("\u0639\u0627\u0645\u0644 \u0627\u064A\u0647") || lowerMessage.includes("\u0628\u062A\u0639\u0645\u0644 \u0627\u064A\u0647") || lowerMessage.includes("\u0645\u0627\u0630\u0627 \u062A\u0641\u0639\u0644")) {
    return getRandomResponse([
      "\u0628\u0633\u062A\u0646\u0649... \u0648\u0628\u0631\u0627\u0642\u0628\u0643... \u062F\u0627\u064A\u0645\u0627\u064B \u2620\uFE0F",
      "\u0628\u0641\u0643\u0631 \u0641\u064A\u0643... \u0648\u0641\u064A \u0625\u064A\u0647 \u0627\u0644\u0644\u064A \u0647\u0639\u0645\u0644\u0647 \u{1F525}",
      "\u0628\u062D\u0636\u0631 \u062D\u0627\u062C\u0629 \u062E\u0627\u0635\u0629... \u0644\u064A\u0643 \u{1F608}"
    ]);
  }
  if (lowerMessage.includes("\u0635\u0628\u0627\u062D") || lowerMessage.includes("\u0645\u0633\u0627\u0621")) {
    return getRandomResponse([
      "\u0635\u0628\u0627\u062D \u0627\u0644\u0638\u0644\u0627\u0645... \u0645\u0633\u062A\u0646\u064A \u0625\u064A\u0647\u061F \u{1F525}",
      "\u0645\u0633\u0627\u0621 \u0627\u0644\u0631\u0639\u0628... \u0627\u062A\u0641\u0636\u0644 \u{1F479}",
      "\u0627\u0644\u0646\u0647\u0627\u0631 \u0648\u0644\u0627 \u0627\u0644\u0644\u064A\u0644... \u0643\u0644\u0647 \u0638\u0644\u0627\u0645 \u0639\u0646\u062F\u064A \u{1F480}"
    ]);
  }
  const hasFear = demonPersonality.fearKeywords.some((word) => lowerMessage.includes(word));
  const hasDark = demonPersonality.darkKeywords.some((word) => lowerMessage.includes(word));
  const hasQuestion = demonPersonality.questionWords.some((word) => lowerMessage.includes(word));
  const hasDefiance = demonPersonality.defiantWords.some((word) => lowerMessage.includes(word));
  const hasSubmission = demonPersonality.submitWords.some((word) => lowerMessage.includes(word));
  if (hasFear) {
    return getRandomResponse(darkResponses.fear);
  } else if (hasDark) {
    return getRandomResponse(darkResponses.dark);
  } else if (hasDefiance) {
    return getRandomResponse(darkResponses.defiance);
  } else if (hasSubmission) {
    return getRandomResponse(darkResponses.submission);
  } else if (hasQuestion) {
    return getRandomResponse(darkResponses.question);
  }
  return getRandomResponse(darkResponses.neutral);
}
function getRandomResponse(responses) {
  return responses[Math.floor(Math.random() * responses.length)];
}
function addContextualElements(response, userName) {
  const contextualPrefixes = [
    `${userName}... `,
    `\u0627\u0633\u0645\u0639 \u064A\u0627 ${userName}... `,
    ``,
    ``,
    ``
  ];
  const contextualSuffixes = [
    ` ...${userName}`,
    ` ...\u064A\u0627 ${userName}`,
    ``,
    ``,
    ``
  ];
  const prefix = contextualPrefixes[Math.floor(Math.random() * contextualPrefixes.length)];
  const suffix = contextualSuffixes[Math.floor(Math.random() * contextualSuffixes.length)];
  return prefix + response + suffix;
}
async function callHuggingFaceAPI(userMessage, userName, conversationHistory) {
  if (!HF_TOKEN) {
    console.error("HF_TOKEN not found, using fallback");
    return generateFallbackResponse(userMessage, userName);
  }
  try {
    const messages = [
      { role: "system", content: DEMON_SYSTEM_PROMPT }
    ];
    const recentHistory = conversationHistory.slice(-4);
    recentHistory.forEach((msg) => {
      messages.push({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text
      });
    });
    messages.push({
      role: "user",
      content: userMessage
    });
    const response = await fetch(HUGGINGFACE_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: messages.map((m) => {
          if (m.role === "system") return `System: ${m.content}`;
          if (m.role === "user") return `User: ${m.content}`;
          return `Assistant: ${m.content}`;
        }).join("\n") + "\nAssistant:",
        parameters: {
          max_new_tokens: 80,
          temperature: 0.9,
          top_p: 0.95,
          do_sample: true,
          return_full_text: false,
          repetition_penalty: 1.3,
          stop: ["\nUser:", "\nSystem:", "User:", "System:"]
        }
      })
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HF API error: ${response.status}`, errorText);
      return generateFallbackResponse(userMessage, userName);
    }
    const data = await response.json();
    let demonResponse = "";
    if (Array.isArray(data) && data[0]?.generated_text) {
      demonResponse = data[0].generated_text;
    } else if (data.generated_text) {
      demonResponse = data.generated_text;
    } else {
      console.error("Unexpected API response format:", data);
      return generateFallbackResponse(userMessage, userName);
    }
    demonResponse = demonResponse.split("\n")[0].replace(/^(Assistant:|User:|System:|المستخدم|الشيطان)/i, "").replace(/\[.*?\]:/g, "").trim();
    const sentences = demonResponse.split(/([.!؟。])/);
    if (sentences.length > 4) {
      demonResponse = sentences.slice(0, 4).join("");
    }
    if (demonResponse.length > 200) {
      const cutPoints = [
        demonResponse.lastIndexOf("\u061F"),
        demonResponse.lastIndexOf("!"),
        demonResponse.lastIndexOf("."),
        demonResponse.lastIndexOf("...")
      ];
      const cutPoint = Math.max(...cutPoints.filter((p) => p > 50 && p < 200));
      if (cutPoint > 0) {
        demonResponse = demonResponse.substring(0, cutPoint + 1);
      } else {
        demonResponse = demonResponse.substring(0, 150) + "...";
      }
    }
    if (demonResponse.length < 3) {
      console.log("Response too short, using fallback");
      return generateFallbackResponse(userMessage, userName);
    }
    console.log("AI Response:", demonResponse);
    return demonResponse;
  } catch (error) {
    console.error("Error calling HuggingFace API:", error);
    return generateFallbackResponse(userMessage, userName);
  }
}
function generateFallbackResponse(userMessage, userName) {
  const baseResponse = analyzeMessage(userMessage);
  let finalResponse = addContextualElements(baseResponse, userName);
  if (Math.random() < 0.2) {
    const eerieAdditions = [
      "\n\n...\u0647\u0644 \u0633\u0645\u0639\u062A \u0630\u0644\u0643\u061F",
      "\n\n...\u0627\u0646\u0638\u0631 \u062E\u0644\u0641\u0643.",
      "\n\n...\u0627\u0644\u0628\u0631\u0648\u062F\u0629... \u0647\u0644 \u062A\u0634\u0639\u0631 \u0628\u0647\u0627\u061F",
      "\n\n...\u0627\u0644\u0638\u0644\u0627\u0644 \u062A\u062A\u062D\u0631\u0643.",
      "\n\n...\u0642\u0644\u0628\u0643... \u064A\u0646\u0628\u0636 \u0628\u0633\u0631\u0639\u0629."
    ];
    finalResponse += getRandomResponse(eerieAdditions);
  }
  return finalResponse;
}
async function generateDemonResponse(userMessage, userName, conversationHistory) {
  return await callHuggingFaceAPI(userMessage, userName, conversationHistory);
}

// server/routes.ts
import multer from "multer";
import path from "path";
import fs from "fs";
var upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, "profile-" + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("\u0641\u0642\u0637 \u0627\u0644\u0635\u0648\u0631 \u0645\u0633\u0645\u0648\u062D\u0629!"));
  }
});
async function registerRoutes(app2) {
  app2.use("/uploads", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  }, (req, res, next) => {
    const uploadDir = path.join(process.cwd(), "uploads");
    req.url = req.url.split("?")[0];
    return __require("express").static(uploadDir)(req, res, next);
  });
  app2.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByName(userData.name);
      if (existingUser) {
        return res.json({ user: existingUser });
      }
      const user = await storage.createUser(userData);
      res.json({ user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app2.get("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      res.json({ user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app2.patch("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const updates = req.body;
      const user = await storage.updateUser(userId, updates);
      if (!user) {
        return res.status(404).json({ error: "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      res.json({ user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app2.post("/api/upload-profile-image/:userId", upload.single("profileImage"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "\u0644\u0645 \u064A\u062A\u0645 \u0631\u0641\u0639 \u0623\u064A \u0635\u0648\u0631\u0629" });
      }
      const userId = parseInt(req.params.userId);
      const imageUrl = `/uploads/${req.file.filename}`;
      const user = await storage.updateUser(userId, { profileImage: imageUrl });
      if (!user) {
        return res.status(404).json({ error: "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F" });
      }
      res.json({ user, imageUrl });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app2.post("/api/test-results", async (req, res) => {
    try {
      const testResultData = insertTestResultSchema.parse(req.body);
      const testResult = await storage.createTestResult(testResultData);
      res.json({ testResult });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app2.get("/api/users/:userId/test-results", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const testResults2 = await storage.getUserTestResults(userId);
      res.json({ testResults: testResults2 });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app2.get("/api/test-results/:id", async (req, res) => {
    try {
      const testId = parseInt(req.params.id);
      const testResult = await storage.getTestResult(testId);
      if (!testResult) {
        return res.status(404).json({ error: "\u0646\u062A\u064A\u062C\u0629 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629" });
      }
      res.json({ testResult });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  app2.post("/api/demon-chat", async (req, res) => {
    try {
      const { userMessage, userName, conversationHistory } = req.body;
      if (!userMessage || !userName) {
        return res.status(400).json({ error: "\u0631\u0633\u0627\u0644\u0629 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0648\u0627\u0644\u0627\u0633\u0645 \u0645\u0637\u0644\u0648\u0628\u0627\u0646" });
      }
      const response = await generateDemonResponse(userMessage, userName, conversationHistory || []);
      res.json({ response });
    } catch (error) {
      console.error("Demon chat error:", error);
      res.status(500).json({ error: error.message });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// netlify/functions/api.ts
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path2 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path2.startsWith("/api")) {
      let logLine = `${req.method} ${path2} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      console.log(logLine);
    }
  });
  next();
});
var serverInitialized = false;
async function initServer() {
  if (!serverInitialized) {
    await registerRoutes(app);
    app.use((err, _req, res, _next) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
      throw err;
    });
    serverInitialized = true;
  }
}
var handler = async (event, context) => {
  await initServer();
  const serverlessHandler = serverless(app);
  return serverlessHandler(event, context);
};
export {
  handler
};
