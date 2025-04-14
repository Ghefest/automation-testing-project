import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { eq } from 'drizzle-orm';
import { companies, addresses, projects, persons, personProjects } from '../lab6/schema';

const sqlite = new Database('lab6.db');
const db = drizzle(sqlite);

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS person_project (
    person_id INTEGER NOT NULL,
    project_id INTEGER NOT NULL,
    PRIMARY KEY (person_id, project_id),
    FOREIGN KEY (person_id) REFERENCES person(id),
    FOREIGN KEY (project_id) REFERENCES project(id)
  );
`);

async function main() {
  console.log('🧪 Lab 7: Testing Relations (OneToOne, OneToMany, ManyToMany)');

  const [address] = await db
    .insert(addresses)
    .values({
      city: 'Odesa',
      state: 'Odeska',
    })
    .returning();

  const [company] = await db
    .insert(companies)
    .values({
      name: 'GlobalSoft',
      industry: 'Consulting',
    })
    .returning();

  const [project1] = await db
    .insert(projects)
    .values({
      title: 'Cloud System',
      duration: 12,
    })
    .returning();
  const [project2] = await db
    .insert(projects)
    .values({
      title: 'Security Revamp',
      duration: 9,
    })
    .returning();

  const [person] = await db
    .insert(persons)
    .values({
      name: 'Yulia',
      isWorking: true,
      timestamp: Date.now(),
      friends: ['Oleh', 'Anna'],
      addressId: address.id,
      companyId: company.id,
      projectId: project1.id,
    })
    .returning();

  await db.insert(personProjects).values([
    { personId: person.id, projectId: project1.id },
    { personId: person.id, projectId: project2.id },
  ]);

  const links = await db.select().from(personProjects).where(eq(personProjects.personId, person.id));
  console.log('📎 Person-project links:', links);

  await db.delete(personProjects).where(eq(personProjects.personId, person.id));
  await db.delete(persons).where(eq(persons.id, person.id));
  await db.delete(projects).where(eq(projects.id, project1.id));
  await db.delete(projects).where(eq(projects.id, project2.id));
  await db.delete(companies).where(eq(companies.id, company.id));
  await db.delete(addresses).where(eq(addresses.id, address.id));

  console.log('✅ Lab 7 complete');
}

main();
