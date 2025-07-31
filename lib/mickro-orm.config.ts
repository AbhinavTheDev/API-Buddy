import { defineConfig } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { SqliteDriver } from "@mikro-orm/sqlite";
import path from "path";

const config = defineConfig({
  entities: ["./dist/entities"], // for production (compiled JS)
  entitiesTs: ["./db/entities"], // for development (TS sources)
  baseDir: process.cwd(),
  dbName: path.join(process.cwd(), "/database.sqlite"),
  driver: SqliteDriver,
  metadataProvider: TsMorphMetadataProvider, // Using ts-morph reflection provider
  migrations: {
    path: "./dist/migrations/*.js",
    pathTs: "./db/migrations/*.ts",
  },
  debug: true, // set to false in production
});

export default config;
