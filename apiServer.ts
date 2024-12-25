import express, { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';

// Инициализация приложения Express
const app = express();
const PORT = 3001;

app.use(cors()); // Разрешение CORS

// Инициализация базы данных
const initializeDatabase = async () => {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  // Обработчик запроса на получение всех продуктов
  app.get('/api/products', async (req: Request, res: Response) => {
    try {
      const products = await db.all('SELECT * FROM products');
      res.json(products);
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).send('Server error');
    }
  });

  // Обработчик запроса на получение продукта по ID
  app.get('/api/products/:id', async (req: Request, res: Response) => {
    try {
      const product = await db.get('SELECT * FROM products WHERE id = ?', [req.params.id]);
      res.json(product);
    } catch (err) {
      console.error('Error fetching product by id:', err);
      res.status(500).send('Server error');
    }
  });

  // Обработчик запроса на получение продуктов по категории
  app.get('/api/products', async (req: Request, res: Response) => {
    const category = req.query.category as string;
    if (category) {
      try {
        const products = await db.all('SELECT * FROM products WHERE category = ?', [category]);
        res.json(products);
      } catch (err) {
        console.error('Error fetching products by category:', err);
        res.status(500).send('Server error');
      }
    } else {
      try {
        const products = await db.all('SELECT * FROM products');
        res.json(products);
      } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Server error');
      }
    }
  });

  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

initializeDatabase().catch((err) => console.error('Error initializing database:', err));
