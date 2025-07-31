import { Entity, PrimaryKey, Property, types } from "@mikro-orm/core";

@Entity({ tableName: "history" })
export class History {
  @PrimaryKey({ type: types.integer, autoincrement: true })
  id!: number;

  @Property({ type: types.string, length: 8 })
  method!: string;

  @Property({ type: types.string, length: 100 })
  url!: string;

  @Property({ type: types.string, length: 100 })
  headers!: string;

  @Property({ type: types.string, length: 255 })
  body!: string;

  @Property({ type: types.datetime })
  createdAt: Date = new Date();

  @Property({ type: types.datetime, onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  // Method to get history details
  getDetails(): string {
    return `${this.method} by ${this.url} - ${this.headers} at ${this.createdAt.toISOString()}`;
  }
}
