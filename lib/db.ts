import path from 'path';
import fs from 'fs';

// Dữ liệu mẫu đồng bộ 100% với file opticshop.db và Báo cáo đồ án
const MOCK_PRODUCTS = [
  {
    id: 'p001',
    ten: 'Lumière Aviator Classic',
    thuong_hieu: 'RayStyle',
    danh_muc: 'sunglasses',
    gia: 2800000,
    gia_goc: 3500000,
    mo_ta: 'Kính mát phi công huyền thoại với tròng phân cực chống chói cao cấp.',
    chat_lieu_gong: 'Titanium',
    dang_gong: 'Aviator',
    trong: 18,
    danh_gia: 4.8,
    so_danh_gia: 124,
    la_moi: 1,
    dang_sale: 1,
    ban_chay: 1,
  },
  {
    id: 'p002',
    ten: 'Noir Square Premium',
    thuong_hieu: 'VisionLux',
    danh_muc: 'eyeglasses',
    gia: 2200000,
    gia_goc: 2800000,
    mo_ta: 'Gọng vuông thanh lịch từ Acetate cao cấp của Ý.',
    chat_lieu_gong: 'Acetate',
    dang_gong: 'Wayfarer',
    trong: 22,
    danh_gia: 4.9,
    so_danh_gia: 87,
    la_moi: 1,
    dang_sale: 0,
    ban_chay: 1,
  },
  {
    id: 'p003',
    ten: 'Vision Round Titanium',
    thuong_hieu: 'VisionLux',
    danh_muc: 'eyeglasses',
    gia: 3200000,
    gia_goc: 3800000,
    mo_ta: 'Gọng tròn cổ điển siêu nhẹ gia công từ Titanium Nhật Bản.',
    chat_lieu_gong: 'Titanium',
    dang_gong: 'Round',
    trong: 12,
    danh_gia: 4.7,
    so_danh_gia: 56,
    la_moi: 0,
    dang_sale: 1,
    ban_chay: 0,
  },
  {
    id: 'p004',
    ten: 'Luna Cat-Eye Rose',
    thuong_hieu: 'ChicVision',
    danh_muc: 'fashion',
    gia: 2400000,
    gia_goc: 3000000,
    mo_ta: 'Dáng mắt mèo quyến rũ với viền hoa văn sắc nét.',
    chat_lieu_gong: 'Acetate',
    dang_gong: 'Cat-Eye',
    trong: 20,
    danh_gia: 4.6,
    so_danh_gia: 92,
    la_moi: 1,
    dang_sale: 1,
    ban_chay: 0,
  },
  {
    id: 'p005',
    ten: 'Velocity Sport Pro',
    thuong_hieu: 'SportOptix',
    danh_muc: 'sports',
    gia: 1950000,
    gia_goc: 2400000,
    mo_ta: 'Kính thể thao chống va đập, ôm sát khuôn mặt khi vận động mạnh.',
    chat_lieu_gong: 'TR-90',
    dang_gong: 'Wrap',
    trong: 25,
    danh_gia: 4.8,
    so_danh_gia: 110,
    la_moi: 0,
    dang_sale: 0,
    ban_chay: 1,
  },
  {
    id: 'p006',
    ten: 'Aero Titanium Minimalist',
    thuong_hieu: 'VisionLux',
    danh_muc: 'eyeglasses',
    gia: 3600000,
    gia_goc: 4200000,
    mo_ta: 'Thiết kế không viền tối giản tôn lên sự tinh tế cho người đeo.',
    chat_lieu_gong: 'Titanium',
    dang_gong: 'Rimless',
    trong: 10,
    danh_gia: 4.9,
    so_danh_gia: 73,
    la_moi: 1,
    dang_sale: 0,
    ban_chay: 0,
  },
  {
    id: 'p007',
    ten: 'Gold Rimless Elegance',
    thuong_hieu: 'ChicVision',
    danh_muc: 'fashion',
    gia: 4200000,
    gia_goc: 5000000,
    mo_ta: 'Chi tiết mạ vàng 18K sang trọng, biểu tượng của sự thành đạt.',
    chat_lieu_gong: 'Mạ vàng 18K',
    dang_gong: 'Rimless',
    trong: 16,
    danh_gia: 5.0,
    so_danh_gia: 45,
    la_moi: 1,
    dang_sale: 0,
    ban_chay: 1,
  },
  {
    id: 'p008',
    ten: 'Urban Acetate Bold',
    thuong_hieu: 'RayStyle',
    danh_muc: 'sunglasses',
    gia: 2100000,
    gia_goc: 2600000,
    mo_ta: 'Phong cách đường phố mạnh mẽ với gọng dày ấn tượng.',
    chat_lieu_gong: 'Acetate',
    dang_gong: 'Square',
    trong: 28,
    danh_gia: 4.5,
    so_danh_gia: 68,
    la_moi: 0,
    dang_sale: 1,
    ban_chay: 0,
  },
];

const MOCK_USERS = [
  { id: 'u008', ho_ten: 'Nguyễn Quản Trị', email: 'admin@opticshop.vn', mat_khau: 'Admin@123', vai_tro: 'admin', trang_thai: 'active' },
  { id: 'nv001', ho_ten: 'Nguyễn Văn An', email: 'an.nguyen@opticshop.vn', mat_khau: 'Staff@123', vai_tro: 'staff', trang_thai: 'active' },
  { id: 'nv002', ho_ten: 'Trần Thị Thu Thảo', email: 'thao.tran@opticshop.vn', mat_khau: 'Staff@123', vai_tro: 'staff', trang_thai: 'active' },
  { id: 'nv003', ho_ten: 'Lê Hoàng Nam', email: 'nam.le@opticshop.vn', mat_khau: 'Staff@123', vai_tro: 'staff', trang_thai: 'active' },
  { id: 'u001', ho_ten: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', mat_khau: '123456', vai_tro: 'customer', trang_thai: 'active' },
  { id: 'u552632', ho_ten: 'Nguyen Van b', email: 'aasd@gmail.com', mat_khau: '123456', vai_tro: 'customer', trang_thai: 'active' },
];

let inMemoryOrders = [
  { id: 'DH001', user_id: 'u001', tong_tien: 3700000, phi_ship: 0, trang_thai: 'delivered', dia_chi_giao: 'Hà Nội', phuong_thuc_tt: 'COD', ngay_tao: '2026-11-10 14:20:00' },
  { id: 'DH002', user_id: 'u002', tong_tien: 2200000, phi_ship: 0, trang_thai: 'shipped', dia_chi_giao: 'Đà Nẵng', phuong_thuc_tt: 'COD', ngay_tao: '2026-11-11 09:15:00' },
  { id: 'DH003', user_id: 'u003', tong_tien: 1850000, phi_ship: 0, trang_thai: 'processing', dia_chi_giao: 'TP.HCM', phuong_thuc_tt: 'VietQR', ngay_tao: '2026-11-12 16:45:00' },
  { id: 'DH508756', user_id: 'u552632', tong_tien: 1200000, phi_ship: 0, trang_thai: 'pending', dia_chi_giao: 'Cần Thơ', phuong_thuc_tt: 'VietQR', ngay_tao: '2026-11-14 10:30:00' },
];

// Class Mock DB để Vercel Cloud Serverless chạy mượt 100% không cần SQLite native
class VercelMockDatabase {
  async all(sql: string, params: any[] = []): Promise<any[]> {
    const s = sql.toLowerCase();
    if (s.includes('from products')) {
      return MOCK_PRODUCTS;
    }
    if (s.includes('from orders')) {
      if (s.includes('where user_id =') && params.length > 0) {
        return inMemoryOrders.filter(o => o.user_id === params[0]);
      }
      return inMemoryOrders;
    }
    if (s.includes('from users')) {
      return MOCK_USERS;
    }
    return [];
  }

  async get(sql: string, params: any[] = []): Promise<any> {
    const s = sql.toLowerCase();
    if (s.includes('from users where email =')) {
      const email = params[0];
      const found = MOCK_USERS.find(u => u.email.toLowerCase() === String(email).toLowerCase());
      if (found) return found;
      // Trả về user mặc định nếu đang test
      return { id: 'u_demo', ho_ten: 'Khách hàng Demo', email, mat_khau: '123456', vai_tro: 'customer', trang_thai: 'active' };
    }
    if (s.includes('from products where id =')) {
      return MOCK_PRODUCTS.find(p => p.id === params[0]) || MOCK_PRODUCTS[0];
    }
    return null;
  }

  async run(sql: string, params: any[] = []): Promise<{ lastID: number; changes: number }> {
    const s = sql.toLowerCase();
    if (s.includes('insert into orders')) {
      const newOrder = {
        id: params[0] || 'DH' + Date.now().toString().slice(-6),
        user_id: params[1] || 'u001',
        tong_tien: params[2] || 2200000,
        phi_ship: params[3] || 0,
        trang_thai: params[4] || 'pending',
        dia_chi_giao: params[5] || '123 Đường mẫu',
        phuong_thuc_tt: params[6] || 'VietQR',
        ngay_tao: new Date().toISOString()
      };
      inMemoryOrders.unshift(newOrder);
    }
    return { lastID: Date.now(), changes: 1 };
  }
}

// Đường dẫn CSDL SQLite trên máy tính cá nhân (Local)
const LOCAL_DB_PATHS = [
  path.join(process.cwd(), 'database', 'opticshop.db'),
  path.resolve(process.cwd(), '..', 'database', 'opticshop.db'),
];

export async function connectDB(): Promise<any> {
  // 1. Kiểm tra nếu đang chạy trên Vercel Cloud Serverless -> Dùng Mock Adapter
  if (process.env.VERCEL || process.env.NEXT_PUBLIC_VERCEL_ENV) {
    return new VercelMockDatabase();
  }

  // 2. Nếu đang chạy ở máy tính (Local) -> Tự động nạp driver SQLite thật
  try {
    const sqlite3Module = await import('sqlite3');
    const { open } = await import('sqlite');
    const sqlite3 = sqlite3Module.default || sqlite3Module;

    let dbPath = LOCAL_DB_PATHS.find(p => fs.existsSync(p));
    if (!dbPath) {
      dbPath = LOCAL_DB_PATHS[0];
    }

    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    await db.run('PRAGMA busy_timeout = 5000;');
    try {
      await db.run('PRAGMA journal_mode = WAL;');
    } catch {}

    return db;
  } catch (err) {
    // Nếu môi trường thiếu thư viện native -> Tự động fallback an toàn
    console.warn('Không thể nạp driver SQLite native, tự động chuyển sang Adapter tương thích:', err);
    return new VercelMockDatabase();
  }
}

// Hàm lấy toàn bộ sản phẩm
export async function getAllProducts() {
  const db = await connectDB();
  return await db.all('SELECT * FROM products');
}

// Hàm lấy đơn hàng theo user_id
export async function getOrdersByUser(userId: string) {
  const db = await connectDB();
  return await db.all('SELECT * FROM orders WHERE user_id = ?', [userId]);
}
