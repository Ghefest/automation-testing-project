import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { eq } from 'drizzle-orm';
import { companies, addresses, projects, persons } from './schema';

// Підключаємось до спільної бази lab6.db
const sqlite = new Database('lab6.db');
const db = drizzle(sqlite);

// Створюємо таблиці, якщо вони ще не створені (без person_project, оскільки Lab 6 її не використовує)
sqlite.exec(`
  PRAGMA foreign_keys = ON;
  CREATE TABLE IF NOT EXISTS company (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    industry TEXT
  );
  CREATE TABLE IF NOT EXISTS address (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city TEXT NOT NULL,
    state TEXT
  );
  CREATE TABLE IF NOT EXISTS project (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    duration INTEGER
  );
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
  );
`);

async function main() {
  console.log('🛠️ Lab 6: Basic CRUD with shared schema');

  const [company] = await db
    .insert(companies)
    .values({
      name: 'TechCorp',
      industry: 'Software',
    })
    .returning();

  const [address] = await db
    .insert(addresses)
    .values({
      city: 'Kyiv',
      state: 'Kyivska',
    })
    .returning();

  const [project] = await db
    .insert(projects)
    .values({
      title: 'Migration',
      duration: 6,
    })
    .returning();

  const [person] = await db
    .insert(persons)
    .values({
      name: 'Alex',
      isWorking: true,
      timestamp: Date.now(),
      // Якщо Drizzle обробляє JSON автоматично, можна передати масив; інакше – JSON.stringify()
      friends: ['Emily', 'Michael', 'David'],
      companyId: company.id,
      addressId: address.id,
      projectId: project.id,
    })
    .returning();

  console.log('👤 Created person:', person);

  await db.update(persons).set({ name: 'Alexander' }).where(eq(persons.id, person.id));

  const updated = await db.select().from(persons).where(eq(persons.id, person.id));
  console.log('✏️ Updated person:', updated);

  await db.delete(persons).where(eq(persons.id, person.id));

  const remaining = await db.select().from(persons);
  console.log('🗑 Remaining persons:', remaining);

  console.log('✅ Lab 6 complete');
}

main();
