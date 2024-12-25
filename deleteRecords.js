import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const deleteRecords = async () => {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  try {
    await db.run('DELETE FROM users WHERE id IN (SELECT id FROM users ORDER BY id LIMIT 2)');
    console.log('Первые две записи удалены');
  } catch (err) {
    console.error('Error deleting records:', err);
  } finally {
    await db.close();
  }
};

deleteRecords();
