import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';
import bodyParser from 'body-parser';
import crypto from 'crypto';

// Инициализация приложения Express
const app = express();
const PORT = 3001;

app.use(cors()); // Разрешение CORS
app.use(bodyParser.json()); // Парсинг JSON тела запросов

// Инициализация базы данных
const initializeDatabase = async () => {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  // Создание таблицы products, если она не существует
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

  // Создание таблицы users, если она не существует
  await db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    login TEXT NOT NULL,
    password TEXT NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

  // Обработчик запроса на получение всех продуктов
  app.get('/api/products', async (req, res) => {
    try {
      const products = await db.all('SELECT * FROM products');
      res.json(products);
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).send('Server error');
    }
  });

  // Обработчик запроса на получение продукта по ID
  app.get('/api/products/:id', async (req, res) => {
    try {
      const product = await db.get('SELECT * FROM products WHERE id = ?', [req.params.id]);
      res.json(product);
    } catch (err) {
      console.error('Error fetching product by id:', err);
      res.status(500).send('Server error');
    }
  });

  // Обработчик запроса на получение продуктов по категории
  app.get('/api/products', async (req, res) => {
    const category = req.query.category;
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

  // Обработчик запроса на получение популярных продуктов
  app.get('/api/trending-products', async (req, res) => {
    try {
      const trendingProducts = await db.all('SELECT * FROM products ORDER BY rating DESC LIMIT 10');
      res.json(trendingProducts);
    } catch (err) {
      console.error('Error fetching trending products:', err);
      res.status(500).send('Server error');
    }
  });

  // Обработчик запроса на получение новых продуктов
  app.get('/api/latest-products', async (req, res) => {
    try {
      const latestProducts = await db.all('SELECT * FROM products ORDER BY id DESC LIMIT 10');
      res.json(latestProducts);
    } catch (err) {
      console.error('Error fetching latest products:', err);
      res.status(500).send('Server error');
    }
  });

  // Обработчик запроса на регистрацию нового пользователя
  app.post('/api/register', async (req, res) => {
    const { login, password, firstName, lastName, email, phone } = req.body;
    try {
      const existingUser = await db.get('SELECT * FROM users WHERE login = ?', [login]);
      if (existingUser) {
        return res.status(400).send('Пользователь с таким логином уже существует');
      }

      // Хэширование пароля с использованием SHA-256
      const hash = crypto.createHash('sha256');
      hash.update(password);
      const hashedPassword = hash.digest('hex');

      await db.run(
        'INSERT INTO users (login, password, firstName, lastName, email, phone) VALUES (?, ?, ?, ?, ?, ?)',
        [login, hashedPassword, firstName, lastName, email, phone]
      );

      res.status(201).send('Вы успешно зарегистрировались');
    } catch (err) {
      console.error('Error registering user:', err);
      res.status(500).send('Server error');
    }
  });

  // Обработчик запроса на вход пользователя
  app.post('/api/login', async (req, res) => {
    const { login, password } = req.body;
    try {
      // Хэширование пароля с использованием SHA-256
      const hash = crypto.createHash('sha256');
      hash.update(password);
      const hashedPassword = hash.digest('hex');

      const user = await db.get('SELECT * FROM users WHERE login = ? AND password = ?', [login, hashedPassword]);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(400).send('Неверный логин или пароль');
      }
    } catch (err) {
      console.error('Error logging in user:', err);
      res.status(500).send('Server error');
    }
  });

  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

initializeDatabase().catch((err) => console.error('Error initializing database:', err));