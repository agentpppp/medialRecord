import { PGlite } from '@electric-sql/pglite'
import { PGliteWorker } from '@electric-sql/pglite/worker'

let db: PGliteWorker | null = null
// Creates the schema (table + index) if not already created

const creationschema = async (database: PGliteWorker) => {
  await database.query(`
    CREATE TABLE IF NOT EXISTS patients (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
       email TEXT,
      age TEXT NOT NULL,
      phone TEXT,
      gender TEXT,
      address TEXT,
      emergencyContact TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await database.query(`
    CREATE INDEX IF NOT EXISTS idx_patient_name ON patients (email,name);
  `);

  console.log("Database schema initialized");
};
// Initializes the database only once 
export const initDatabase = async (): Promise<PGliteWorker> => {
  if (!db) {
    try {
      const workerInstance = new Worker(new URL('/pglite.js', import.meta.url), {
        type: 'module',
      });
      db = new PGliteWorker(workerInstance);
      await creationschema(db);// Ensure schema is created before any queries
    } catch (error) {
      console.error("Failed to initialize database:", error);
      throw error;
    }
  }
  return db;
};
  // Inserts a new patient into the database
export const registation = async (patientData: any): Promise<any> => {
  const database = await initDatabase();
  const {
    name,
 email,
    age,
    phone,
    gender ,
    address ,
    emergencyContact
  
  } = patientData;

  const result = await database.query(
    `INSERT INTO patients 
      (name,email,age,phone,gender,address,emergencyContact) 
     VALUES 
      ($1, $2, $3, $4,$5,$6,$7)
     RETURNING id`,
    [
      name,
      email || null,
      age,
      phone || null,
      gender || null,
      address|| null,
      emergencyContact||null
    ]
  );

  return result.rows?.[0];
};