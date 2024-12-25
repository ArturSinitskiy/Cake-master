import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Функция для инициализации базы данных
const initializeDatabase = async () => {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  console.log('Connected to the SQLite database.');

  // Создание таблицы для продуктов
  await db.exec(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT,
    price REAL,
    discountPercentage REAL,
    rating REAL,
    category TEXT,
    thumbnail TEXT,
    images TEXT
  )`);

  console.log('Table "products" created.');

  // Закрытие базы данных
  await db.close();
  console.log('Close the database connection.');
};

// Запуск инициализации базы данных
initializeDatabase().catch((err) => console.error('Error initializing database:', err));
