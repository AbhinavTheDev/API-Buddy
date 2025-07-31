import { MikroORM } from '@mikro-orm/core';
import { History } from './entities/history';
import config from '@/lib/mickro-orm.config';

export default async function queryHistory() {
  try {
    // Initialize MikroORM
    const orm = await MikroORM.init(config);

    // Get the EntityManager
    const em = orm.em.fork();

    // Get a reference to the History repository
    const historyRepository = em.getRepository(History);

    // Find all history records
    console.log("==== All History ====");
    const allHistory = await historyRepository.findAll();
    allHistory.forEach(record => {
      console.log(`Method: ${record.method}, URL: ${record.url}, Created At: ${record.createdAt}`);
    });
    // Close the connection
    await orm.close(true);
    return allHistory;
  } catch (error) {
    console.error('Error querying books:', error);
  }
}
