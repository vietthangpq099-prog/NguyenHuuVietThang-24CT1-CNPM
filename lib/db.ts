import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';

// Đường dẫn CSDL SQLite được tách lưu riêng độc lập bên ngoài thư mục Next.js
const EXTERNAL_DB_PATH = path.resolve(process.cwd(), '..', 'database', 'opticshop.db');
const FALLBACK_DB_PATH = path.join(process.cwd(), 'database', 'opticshop.db');

export async function connectDB() {
  // Ưu tiên kết nối vào file SQLite nằm ở thư mục riêng bên ngoài
  const dbPath = fs.existsSync(EXTERNAL_DB_PATH) ? EXTERNAL_DB_PATH : FALLBACK_DB_PATH;
  
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Tăng thời gian chờ tránh lỗi database is locked khi mở DB Browser
  await db.run('PRAGMA busy_timeout = 5000;');
  try {
    await db.run('PRAGMA journal_mode = WAL;');
  } catch {}

  return db;
}

// Hàm lấy toàn bộ sản phẩm từ SQLite
export async function getAllProducts() {
  const db = await connectDB();
  const products = await db.all('SELECT * FROM products');
  return products;
}

// Hàm lấy đơn hàng theo user_id từ SQLite
export async function getOrdersByUser(userId: string) {
  const db = await connectDB();
  const orders = await db.all('SELECT * FROM orders WHERE user_id = ?', [userId]);
  return orders;
}
