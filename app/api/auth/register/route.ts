import { NextResponse, NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { hoTen, email, soDienThoai, matKhau } = body;

    if (!hoTen || !email || !matKhau) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ họ tên, email và mật khẩu.' },
        { status: 400 }
      );
    }

    const db = await connectDB();

    // 1. Kiểm tra xem email đã tồn tại trong CSDL chưa
    const nguoiDungTonTai = await db.get(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (nguoiDungTonTai) {
      return NextResponse.json(
        { error: 'Email này đã được đăng ký tài khoản. Vui lòng sử dụng email khác.' },
        { status: 400 }
      );
    }

    // 2. Tạo mã người dùng mới (u009, u010...)
    const newId = 'u' + Date.now().toString().slice(-6);

    // 3. Lưu thông tin người dùng mới vào bảng users theo giờ Việt Nam (UTC+7)
    await db.run(
      `INSERT INTO users (id, ho_ten, email, mat_khau, so_dien_thoai, vai_tro, trang_thai, ngay_tao, ngay_cap_nhat)
       VALUES (?, ?, ?, ?, ?, 'customer', 'active', datetime('now', '+7 hours'), datetime('now', '+7 hours'))`,
      [newId, hoTen, email, matKhau, soDienThoai || '']
    );

    return NextResponse.json({
      success: true,
      message: 'Đăng ký tài khoản thành công!',
      userId: newId
    });
  } catch (error: unknown) {
    console.error('Lỗi đăng ký:', error);
    return NextResponse.json(
      { error: error?.message || 'Lỗi máy chủ nội bộ. Không thể hoàn tất đăng ký.' },
      { status: 500 }
    );
  }
}
