import { sqliteTable, integer, text, primaryKey } from 'drizzle-orm/sqlite-core';

export const companies = sqliteTable('company', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  industry: text('industry'),
});

export const addresses = sqliteTable('address', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  city: text('city').notNull(),
  state: text('state'),
});

export const projects = sqliteTable('project', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  duration: integer('duration'),
});

export const persons = sqliteTable('person', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  isWorking: integer('isWorking', { mode: 'boolean' }).notNull(),
  timestamp: integer('timestamp').notNull(),
  friends: text('friends', { mode: 'json' }),
  addressId: integer('address_id').references(() => addresses.id),
  companyId: integer('company_id').references(() => companies.id),
  projectId: integer('project_id').references(() => projects.id),
});

export const personProjects = sqliteTable(
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
