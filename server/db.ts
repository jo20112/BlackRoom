import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "@shared/schema";

const SUPABASE_URL = 'https://gpxqhamhqzakqnwvlvva.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdweHFoYW1ocXpha3Fud3ZsdnZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1NDc0MzksImV4cCI6MjA3NTEyMzQzOX0.v_VYcq1HqA8wvSByOhYMY5wq-cyDsJIHgNLxQMz0QxE';

const SUPABASE_DB_URL = process.env.DATABASE_URL || 'postgresql://postgres:password@helium/heliumdb?sslmode=disable';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const client = postgres(SUPABASE_DB_URL, { prepare: false });
export const db = drizzle(client, { schema });
