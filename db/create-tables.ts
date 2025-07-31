import { MikroORM } from '@mikro-orm/core';
import { History } from './entities/history';
import config from '../lib/mickro-orm.config';

// Make sure reflect-metadata is imported at the entry point
import 'reflect-metadata';

export async function createTables() {
  try {
    // Initialize MikroORM
    const orm = await MikroORM.init(config);

    // Get the schema generator
    const generator = orm.getSchemaGenerator();

    // Drop existing tables if they exist and create them fresh
    await generator.dropSchema();
    await generator.createSchema();

    console.log('Database tables created successfully!');

    // Close the connection
    await orm.close(true);
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

createTables();
