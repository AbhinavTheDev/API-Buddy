import { MikroORM } from "@mikro-orm/core";
import config from "@/lib/mickro-orm.config";
import { History } from "@/db/entities/history";

export async function fetchHistory() {
  try {
    // Initialize MikroORM
    const orm = await MikroORM.init(config);

    // Get the EntityManager
    const em = orm.em.fork();
    const historyRepository = em.getRepository(History);
    const fullhistory = await historyRepository.findAll();
    console.log(
      "\n==================+Fetched history+=================\n",
      fullhistory
    );
    await orm.close(true);
    return fullhistory;
  } catch (error) {
    console.error("Error while fetching history:", error);
  }
}

export async function addHistory(request: Request) {
  try {
    const data = await request.json();
    const orm = await MikroORM.init(config);
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
    console.log("\n==================+Added history+=================\n");
    return history;
    await orm.close();
  } catch (error) {
    console.error("Error while adding history:", error);
  }
}

export async function deleteHistory() {
  try {
    const orm = await MikroORM.init(config);
    const em = orm.em.fork();
    await em.nativeDelete(History, {});
    console.log("\n==================+Deleted history+=================\n");
    await orm.close(true);
  } catch (error) {
    console.error("Error while deleting history:", error);
  }
}
