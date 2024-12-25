import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { promises as fs } from 'fs';

// Функция для импорта данных из JSON
const importData = async () => {
  // Загрузка данных из JSON файла
  const data = JSON.parse(await fs.readFile('products.json', 'utf8')).products;

  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  console.log('Connected to the SQLite database.');

  // Вставка данных в таблицу products
  const stmt = await db.prepare(`INSERT INTO products (
    id, title, description, price, discountPercentage, rating, category, thumbnail, images
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  
  for (const product of data) {
    await stmt.run(
      product.id, 
      product.title, 
      product.description, 
      product.price, 
      product.discountPercentage, 
      product.rating, 
      product.category, 
      product.thumbnail, 
      JSON.stringify(product.images)
    );
  }

  await stmt.finalize();
  await db.close();
  console.log('Close the database connection.');
};

// Запуск импорта данных
importData().catch((err) => console.error('Error importing data:', err));
