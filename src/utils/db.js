import { openDB } from "idb";

const DB_NAME = "quizHistoryDB";
const STORE_NAME = "history";

async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    },
  });
}

export async function saveQuizResult(score, total) {
  const db = await getDB();
  const timestamp = new Date().toISOString();
  await db.add(STORE_NAME, { score, total, timestamp });
}

export async function getQuizHistory() {
  const db = await getDB();
  return await db.getAll(STORE_NAME);
}

// Function to clear history
export async function clearHistory() {
  const db = await getDB();
  await db.clear(STORE_NAME);
}
