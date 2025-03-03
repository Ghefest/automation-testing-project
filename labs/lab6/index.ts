import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { eq } from 'drizzle-orm';

// Define schema
const companies = sqliteTable('company', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  industry: text('industry'),
});

const addresses = sqliteTable('address', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  city: text('city').notNull(),
  state: text('state'),
});

const projects = sqliteTable('project', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  duration: integer('duration'),
});

const persons = sqliteTable('person', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  isWorking: integer('isWorking', { mode: 'boolean' }).notNull(),
  timestamp: integer('timestamp').notNull(),
  friends: text('friends', { mode: 'json' }),
  addressId: integer('address_id').references(() => addresses.id),
  companyId: integer('company_id').references(() => companies.id),
  projectId: integer('project_id').references(() => projects.id),
});

// Connect to SQLite
const sqlite = new Database('lab6.db');
const db = drizzle(sqlite);

// Lab logic
async function main() {
  console.log('🛠 Syncing schema...');
  sqlite.exec(`PRAGMA foreign_keys = ON`);
  sqlite.exec(`
      CREATE TABLE IF NOT EXISTS company (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        industry TEXT
      )
  `);
  sqlite.exec(`
      CREATE TABLE IF NOT EXISTS address (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        city TEXT NOT NULL,
        state TEXT
      )
  `);
  sqlite.exec(`
      CREATE TABLE IF NOT EXISTS project (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        duration INTEGER
      )
  `);
  sqlite.exec(`
      CREATE TABLE IF NOT EXISTS person (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        isWorking BOOLEAN NOT NULL,
        timestamp INTEGER NOT NULL,
        friends TEXT,
        address_id INTEGER,
        company_id INTEGER,
        project_id INTEGER,
        FOREIGN KEY (address_id) REFERENCES address(id),
        FOREIGN KEY (company_id) REFERENCES company(id),
        FOREIGN KEY (project_id) REFERENCES project(id)
      )
  `);

  console.log('📦 Inserting related data...');
  const company = await db.insert(companies).values({ name: 'TechCorp', industry: 'Software' }).returning();
  const address = await db.insert(addresses).values({ city: 'Kyiv', state: 'Kyivska' }).returning();
  const project = await db.insert(projects).values({ title: 'Migration', duration: 6 }).returning();

  const person = await db
    .insert(persons)
    .values({
      name: 'Alex',
      isWorking: true,
      timestamp: 1645532452,
      friends: ['Emily', 'Michael', 'David'],
      addressId: address[0].id,
      companyId: company[0].id,
      projectId: project[0].id,
    })
    .returning();

  console.log('👤 Created person:', person);

  console.log('✏️ Updating person...');
  await db.update(persons).set({ name: 'Alexander' }).where(eq(persons.id, person[0].id));

  const updated = await db.select().from(persons).where(eq(persons.id, person[0].id));
  console.log('🔄 Updated person:', updated);

  console.log('🗑 Deleting person...');
  await db.delete(persons).where(eq(persons.id, person[0].id));

  const afterDelete = await db.select().from(persons);
  console.log('❌ Remaining persons:', afterDelete);
}

main();
