import { NextResponse, NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, matKhau } = body;

    if (!email || !matKhau) {
      return NextResponse.json(
        { error: 'Vui lòng điền email và mật khẩu.' },
        { status: 400 }
      );
    }

    const db = await connectDB();

    // 1. Tìm người dùng theo email trong bảng users
    const user = await db.get(
      'SELECT id, ho_ten, email, mat_khau, vai_tro, trang_thai FROM users WHERE email = ?',
      [email]
    );

    const clientIp = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || 'Browser';

    // 2. Kiểm tra nếu tài khoản không tồn tại hoặc sai mật khẩu
    if (!user || user.mat_khau !== matKhau) {
      // Ghi nhật ký đăng nhập thất bại vào bảng login_history theo giờ Việt Nam
      if (user) {
        await db.run(
          `INSERT INTO login_history (user_id, email, dia_chi_ip, vi_tri, thiet_bi, trang_thai, ly_do_that_bai, thoi_gian)
           VALUES (?, ?, ?, 'TP.HCM, VN', ?, 'that-bai', 'Sai mật khẩu', datetime('now', '+7 hours'))`,
          [user.id, email, clientIp, userAgent]
        );
      }
      return NextResponse.json(
        { error: 'Email hoặc mật khẩu không chính xác.' },
        { status: 401 }
      );
    }

    // 3. Ghi nhận đăng nhập thành công vào bảng login_history theo giờ Việt Nam
    await db.run(
      `INSERT INTO login_history (user_id, email, dia_chi_ip, vi_tri, thiet_bi, trang_thai, thoi_gian)
       VALUES (?, ?, ?, 'TP.HCM, VN', ?, 'thanh-cong', datetime('now', '+7 hours'))`,
      [user.id, email, clientIp, userAgent]
    );

    return NextResponse.json({
      success: true,
      message: 'Đăng nhập thành công!',
      user: {
        id: user.id,
        hoTen: user.ho_ten,
        email: user.email,
        vaiTro: user.vai_tro,
      },
    });
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    return NextResponse.json(
      { error: 'Lỗi máy chủ nội bộ. Không thể đăng nhập.' },
      { status: 500 }
    );
  }
}
