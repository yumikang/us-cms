import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'consultations.db');
const db = new Database(dbPath);

// Create consultations table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS consultations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    position TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    service TEXT NOT NULL,
    message TEXT NOT NULL,
    confirmed BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export interface Consultation {
  id: number;
  name: string;
  company: string;
  position: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  confirmed: boolean;
  created_at: string;
}

export interface CreateConsultationInput {
  name: string;
  company: string;
  position: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

// Create a new consultation
export function createConsultation(input: CreateConsultationInput): number {
  const stmt = db.prepare(`
    INSERT INTO consultations (name, company, position, phone, email, service, message)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    input.name,
    input.company,
    input.position,
    input.phone,
    input.email,
    input.service,
    input.message
  );

  return result.lastInsertRowid as number;
}

// Get all consultations with optional filtering
export function getConsultations(confirmed?: boolean): Consultation[] {
  let query = 'SELECT * FROM consultations';
  const params: unknown[] = [];

  if (confirmed !== undefined) {
    query += ' WHERE confirmed = ?';
    params.push(confirmed ? 1 : 0);
  }

  query += ' ORDER BY created_at DESC';

  const stmt = db.prepare(query);
  const rows = params.length > 0 ? stmt.all(...params) : stmt.all();

  return rows.map((row: unknown) => {
    const consultation = row as {
      id: number;
      name: string;
      company: string;
      position: string;
      phone: string;
      email: string;
      service: string;
      message: string;
      confirmed: number;
      created_at: string;
    };

    return {
      ...consultation,
      confirmed: consultation.confirmed === 1
    };
  });
}

// Get a single consultation by ID
export function getConsultationById(id: number): Consultation | null {
  const stmt = db.prepare('SELECT * FROM consultations WHERE id = ?');
  const row = stmt.get(id);

  if (!row) return null;

  const consultation = row as {
    id: number;
    name: string;
    company: string;
    position: string;
    phone: string;
    email: string;
    service: string;
    message: string;
    confirmed: number;
    created_at: string;
  };

  return {
    ...consultation,
    confirmed: consultation.confirmed === 1
  };
}

// Update consultation confirmed status
export function updateConsultationStatus(id: number, confirmed: boolean): boolean {
  const stmt = db.prepare('UPDATE consultations SET confirmed = ? WHERE id = ?');
  const result = stmt.run(confirmed ? 1 : 0, id);

  return result.changes > 0;
}

export default db;