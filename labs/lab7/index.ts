import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { integer, sqliteTable, text, primaryKey } from 'drizzle-orm/sqlite-core';
import { eq } from 'drizzle-orm';

// Define tables
const companies = sqliteTable('company', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
});

const addresses = sqliteTable('address', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  city: text('city').notNull(),
});

const projects = sqliteTable('project', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
});

const persons = sqliteTable('person', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  companyId: integer('company_id').references(() => companies.id),
  addressId: integer('address_id').references(() => addresses.id),
});

const personProjects = sqliteTable(
  'person_project',
  {
    personId: integer('person_id')
      .notNull()
      .references(() => persons.id),
    projectId: integer('project_id')
      .notNull()
      .references(() => projects.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.personId, table.projectId] }),
  })
);

// Set up SQLite + Drizzle
const sqlite = new Database('lab7.db');
const db = drizzle(sqlite);

async function main() {
  sqlite.exec(`PRAGMA foreign_keys = ON`);

  console.log('📦 Inserting company, address, and projects...');
  const [company] = await db.insert(companies).values({ name: 'SoftServe' }).returning();
  const [address] = await db.insert(addresses).values({ city: 'Lviv' }).returning();
  const [project1] = await db.insert(projects).values({ title: 'AI Research' }).returning();
  const [project2] = await db.insert(projects).values({ title: 'Mobile App' }).returning();

  console.log('👤 Inserting person with relations...');
  const [person] = await db
    .insert(persons)
    .values({
      name: 'Ivan',
      companyId: company.id,
      addressId: address.id,
    })
    .returning();

  await db.insert(personProjects).values([
    { personId: person.id, projectId: project1.id },
    { personId: person.id, projectId: project2.id },
  ]);

  console.log('📋 Fetching person with relations...');
  const people = await db.select().from(persons).where(eq(persons.id, person.id));
  console.log(people);

  console.log('🧹 Cleaning up...');
  await db.delete(personProjects).where(eq(personProjects.personId, person.id));
  await db.delete(persons).where(eq(persons.id, person.id));
  await db.delete(companies).where(eq(companies.id, company.id));
  await db.delete(addresses).where(eq(addresses.id, address.id));
  await db.delete(projects).where(eq(projects.id, project1.id));
  await db.delete(projects).where(eq(projects.id, project2.id));

  console.log('✅ Lab 7 complete.');
}

main();
