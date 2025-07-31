import { NextRequest, NextResponse } from "next/server";
import { MikroORM } from "@mikro-orm/core";
import config from "@/lib/mickro-orm.config";
import { History } from "@/db/entities/history";

// GET: fetch all history
export async function GET() {
  const orm = await MikroORM.init({
    ...config,
    entities: [History], // explicit
    entitiesTs: undefined, // disable TS discovery
  });
  const em = orm.em.fork();
  const repo = em.getRepository(History);
  const records = await repo.findAll();
  await orm.close();
  return NextResponse.json(records);
}

// POST: add new history
export async function POST(req: NextRequest) {
  const data = await req.json();
  const orm = await MikroORM.init({
    ...config,
    entities: [History], // explicit
    entitiesTs: undefined, // disable TS discovery
  });
  const em = orm.em.fork();
  const history = em.create(History, {
    method: data.method,
    url: data.url,
    headers: JSON.stringify(data.headers),
    body: data.body,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await em.persistAndFlush(history);
  await orm.close();
  return NextResponse.json(history);
}

// DELETE: clear all history
export async function DELETE() {
  const orm = await MikroORM.init({
    ...config,
    entities: [History], // explicit
    entitiesTs: undefined, // disable TS discovery
  });
  const em = orm.em.fork();
  await em.nativeDelete(History, {});
  await orm.close();
  return NextResponse.json({ ok: true });
}
