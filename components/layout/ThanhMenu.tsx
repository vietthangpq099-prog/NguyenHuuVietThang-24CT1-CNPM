'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Search, Menu, X, ChevronDown, User, Eye, Glasses } from 'lucide-react';
import { useGioHang } from '@/lib/context/CartContext';

const danhMuc = [
  { tenHienThi: 'Kính Mát', duongDan: '/san-pham?danh-muc=sunglasses', bieu: '☀️' },
  { tenHienThi: 'Kính Cận', duongDan: '/san-pham?danh-muc=eyeglasses', bieu: '👓' },
  { tenHienThi: 'Kính Thời Trang', duongDan: '/san-pham?danh-muc=fashion', bieu: '✨' },
  { tenHienThi: 'Kính Thể Thao', duongDan: '/san-pham?danh-muc=sports', bieu: '🏃' },
];
 /* SP- BH - VCT - TK */
/* === 1. SỬA CÁC CHỮ TRÊN MENU (Sản Phẩm, Bảo Hành, Về Chúng Tôi, Tìm Kiếm) TẠI ĐÂY === */
const menuDieuHuong = [
  { tenHienThi: 'Sản Phẩm', duongDan: '/san-pham', coDropdown: true },
  { tenHienThi: 'Bảo Hành', duongDan: '/bao-hanh', coDropdown: false },
  { tenHienThi: 'Về Chúng Tôi', duongDan: '/gioi-thieu', coDropdown: false },
  { tenHienThi: 'Tìm Kiếm', duongDan: '/tim-kiem', coDropdown: false },
];

export default function ThanhMenu() {
  const [moMenuMobile, setMoMenuMobile] = useState(false);
  const [daScroll, setDaScroll] = useState(false);
  const [moTimKiem, setMoTimKiem] = useState(false);
  const [tuKhoa, setTuKhoa] = useState('');
  const [moDropdown, setMoDropdown] = useState(false);
  const refTimKiem = useRef<HTMLInputElement>(null);
  const { gioHang } = useGioHang();
  const [nguoiDung, setNguoiDung] = useState<{ id: string; hoTen: string; email: string; vaiTro: string } | null>(null);

  useEffect(() => {
    const kiemTraDangNhap = () => {
      try {
        let userStr = localStorage.getItem('user');
        if (!userStr && typeof document !== 'undefined') {
          const match = document.cookie.match(/(?:^|;\s*)user=([^;]*)/);
          if (match) userStr = decodeURIComponent(match[1]);
        }
        if (userStr) {
          setNguoiDung(JSON.parse(userStr));
        } else {
          setNguoiDung(null);
        }
      } catch {
        setNguoiDung(null);
      }
    };
    kiemTraDangNhap();
    window.addEventListener('storage', kiemTraDangNhap);
    return () => window.removeEventListener('storage', kiemTraDangNhap);
  }, []);

  const dangXuat = () => {
    localStorage.removeItem('user'); if (typeof document !== 'undefined') document.cookie = 'user=; path=/; max-age=0';
    setNguoiDung(null);
    window.location.href = '/dang-nhap';
  };
  const router = useRouter();

  const xuLyTimKiem = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (tuKhoa.trim()) {
      router.push(`/tim-kiem?q=${encodeURIComponent(tuKhoa.trim())}`);
      setMoTimKiem(false);
      setTuKhoa('');
      setMoMenuMobile(false);
    }
  };

  useEffect(() => {
    const xuLyScroll = () => setDaScroll(window.scrollY > 20);
    window.addEventListener('scroll', xuLyScroll);
    return () => window.removeEventListener('scroll', xuLyScroll);
  }, []);

  useEffect(() => {
    if (moTimKiem) refTimKiem.current?.focus();
  }, [moTimKiem]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        daScroll
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-100'
          : 'bg-white'
      }`}
    >
      {/* === 2. SỬA SỐ ĐIỆN THOẠI HOTLINE & FREESHIP TRÊN ĐẦU TẠI ĐÂY === */}
      {/* Thanh thông báo */}
      <div className="bg-neutral-950 text-neutral-300 text-xs py-2">
        <div className="container-main flex justify-between items-center">
          <span>📦 Miễn phí vận chuyển cho đơn hàng trên 500.000đ</span>
          <div className="hidden sm:flex items-center gap-4">
            <span>📞 1800-888-999</span>
            <span>|</span>
            <span>⏰ 8:00 - 21:00 hàng ngày</span>
          </div>
        </div>
      </div>

      {/* Header chính */}
      <div className="container-main">
        <div className="flex items-center h-16 gap-6">
          {/* Logo optic-shop */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            {/* Vòng tròn gradient bọc icon Kính */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neutral-900 to-neutral-950 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(201,168,76,0.4)] group-hover:scale-105 transition-all duration-300 border border-neutral-800">
              <Glasses size={22} className="text-[#C9A84C]" />
            </div>
            {/* === 3. SỬA TÊN THƯƠNG HIỆU / LOGO (OPTIC Eyewear) TẠI ĐÂY === */}
            {/* Chữ Optic Shop xếp sang trọng */}
            <div className="leading-none flex flex-col">
              <span className="font-serif font-black text-2xl text-neutral-950 tracking-tight group-hover:text-[#C9A84C] transition-colors duration-300">
                OPTIC
              </span>
              <span className="text-[10px] text-neutral-500 font-bold tracking-[0.3em] uppercase mt-0.5">
                Eyewear
              </span>
            </div>
          </Link>

          {/* Menu điều hướng desktop */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {menuDieuHuong.map((muc) =>
              muc.coDropdown ? (
                <div
                  key={muc.tenHienThi}
                  className="relative"
                  onMouseEnter={() => setMoDropdown(true)}
                  onMouseLeave={() => setMoDropdown(false)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-950 rounded-lg hover:bg-neutral-50 transition-all duration-150 cursor-pointer">
                    {muc.tenHienThi}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${moDropdown ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                      moDropdown ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                    }`}
                  >
                    <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-2 w-56">
                      {danhMuc.map((dm) => (
                        <Link
                          key={dm.duongDan}
                          href={dm.duongDan}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950 transition-colors duration-150 group/dm"
                        >
                          <span className="text-lg">{dm.bieu}</span>
                          <span className="font-medium group-hover/dm:translate-x-0.5 transition-transform duration-150">
                            {dm.tenHienThi}
                          </span>
                        </Link>
                      ))}
                      <div className="border-t border-neutral-100 mt-2 pt-2">
                        <Link
                          href="/san-pham"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#C9A84C] hover:bg-amber-50 transition-colors duration-150"
                        >
                          Xem tất cả sản phẩm →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={muc.tenHienThi}
                  href={muc.duongDan}
                  className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-neutral-950 rounded-lg hover:bg-neutral-50 transition-all duration-150"
                >
                  {muc.tenHienThi}
                </Link>
              )
            )}
          </nav>

          {/* Các nút phía phải */}
          <div className="flex items-center gap-1 ml-auto">
            {/* Tìm kiếm */}
            <div className="relative flex items-center">
              {moTimKiem && (
                <form onSubmit={xuLyTimKiem} className="absolute right-10 top-1/2 -translate-y-1/2">
                  <div className="relative">
                    <input
                      ref={refTimKiem}
                      type="text"
                      value={tuKhoa}
                      onChange={(e) => setTuKhoa(e.target.value)}
                      placeholder="Tìm kiếm kính mắt..."
                      className="w-64 sm:w-72 pl-4 pr-10 py-2 text-sm border border-neutral-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent bg-neutral-50"
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') { setMoTimKiem(false); setTuKhoa(''); }
                        if (e.key === 'Enter') xuLyTimKiem();
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => { setMoTimKiem(false); setTuKhoa(''); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                    >
                      <X size={15} />
                    </button>
                  </div>
                </form>
              )}
              <button
                onClick={() => setMoTimKiem(!moTimKiem)}
                className="p-2 rounded-full text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-all duration-200 cursor-pointer"
                aria-label="Tìm kiếm"
              >
                <Search size={20} />
              </button>
            </div>

            {/* Giỏ hàng */}
            <Link
              href="/gio-hang"
              className="relative p-2 rounded-full text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-all duration-200"
              aria-label="Giỏ hàng"
            >
              <ShoppingCart size={20} />
              {gioHang.tongSoLuong > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#C9A84C] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none">
                  {gioHang.tongSoLuong > 99 ? '99+' : gioHang.tongSoLuong}
                </span>
              )}
            </Link>

            {/* Tài khoản */}
            <Link href="/tai-khoan" className="hidden sm:flex p-2 rounded-full text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-all duration-200" aria-label="Tài khoản của tôi" title="Tài khoản của tôi">
              <User size={20} />
            </Link>

            {/* === 4. NÚT ĐĂNG NHẬP / THÔNG TIN TÀI KHOẢN (TỰ ĐỔI KHI ĐÃ ĐĂNG NHẬP) === */}
            {nguoiDung ? (
              <div className="relative group hidden sm:block">
                <button
                  type="button"
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-full transition-all duration-200 cursor-pointer border border-neutral-200 shadow-sm"
                >
                  <div className="w-7 h-7 rounded-full bg-[#C9A84C] text-white flex items-center justify-center text-xs font-bold uppercase shadow-sm">
                    {nguoiDung.hoTen ? nguoiDung.hoTen.charAt(0) : 'U'}
                  </div>
                  <span className="text-xs font-semibold max-w-[120px] truncate">
                    {nguoiDung.hoTen}
                  </span>
                </button>
                {/* Dropdown Menu khi di chuột vào tên */}
                <div className="absolute right-0 top-full pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-2 text-sm">
                    <div className="px-3 py-2 border-b border-neutral-100">
                      <p className="font-bold text-neutral-900 truncate">{nguoiDung.hoTen}</p>
                      <p className="text-xs text-neutral-500 truncate">{nguoiDung.email}</p>
                      <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-[#C9A84C] font-bold uppercase">
                        {nguoiDung.vaiTro === 'admin' ? 'Quản trị viên' : nguoiDung.vaiTro === 'staff' ? 'Nhân viên' : 'Khách hàng'}
                      </span>
                    </div>
                    {nguoiDung.vaiTro === 'admin' && (
                      <Link href="/quan-tri" className="flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-700 hover:bg-amber-50 hover:text-[#C9A84C] transition-colors">
                        📊 Trang Quản Trị
                      </Link>
                    )}
                    {nguoiDung.vaiTro === 'staff' && (
                      <Link href="/nhan-vien/don-hang" className="flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-700 hover:bg-amber-50 hover:text-[#C9A84C] transition-colors">
                        📦 Xử Lý Đơn Hàng
                      </Link>
                    )}
                    <Link href="/tai-khoan" className="flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors">
                      👤 Hồ sơ cá nhân
                    </Link>
                    <Link href="/don-hang" className="flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors">
                      🛍️ Đơn hàng của tôi
                    </Link>
                    <button
                      onClick={dangXuat}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 text-left cursor-pointer transition-colors mt-1 border-t border-neutral-100 font-medium"
                    >
                      🚪 Đăng xuất
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/dang-nhap"
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-neutral-950 rounded-full hover:bg-[#C9A84C] transition-all duration-200"
              >
                Đăng nhập
              </Link>
            )}

            {/* Hamburger mobile */}
            <button
              onClick={() => setMoMenuMobile(!moMenuMobile)}
              className="lg:hidden p-2 rounded-full text-neutral-600 hover:bg-neutral-100 cursor-pointer"
              aria-label="Menu"
            >
              {moMenuMobile ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          moMenuMobile ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-main pb-6 pt-2 border-t border-neutral-100">
          <form onSubmit={xuLyTimKiem} className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={tuKhoa}
              onChange={(e) => setTuKhoa(e.target.value)}
              placeholder="Tìm kiếm kính mắt..."
              className="w-full pl-10 pr-16 py-2.5 text-sm border border-neutral-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C9A84C] bg-neutral-50"
              onKeyDown={(e) => { if (e.key === 'Enter') xuLyTimKiem(); }}
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-neutral-950 text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-[#C9A84C] transition-colors cursor-pointer">
              Tìm
            </button>
          </form>
          <div className="space-y-1 mb-4">
            {menuDieuHuong.map((muc) => (
              <Link
                key={muc.tenHienThi}
                href={muc.duongDan}
                className="block px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-xl"
                onClick={() => setMoMenuMobile(false)}
              >
                {muc.tenHienThi}
              </Link>
            ))}
          </div>
          <div className="border-t border-neutral-100 pt-4">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-4 mb-2">Danh mục</p>
            <div className="grid grid-cols-2 gap-2">
              {danhMuc.map((dm) => (
                <Link
                  key={dm.duongDan}
                  href={dm.duongDan}
                  className="flex items-center gap-2 px-4 py-3 bg-neutral-50 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-100"
                  onClick={() => setMoMenuMobile(false)}
                >
                  <span>{dm.bieu}</span>
                  {dm.tenHienThi}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-100 space-y-2">
            <Link href="/tai-khoan" className="flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 rounded-xl" onClick={() => setMoMenuMobile(false)}>
              <User size={15} /> Tài khoản của tôi
            </Link>
            <Link href="/don-hang" className="flex items-center gap-2 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 rounded-xl" onClick={() => setMoMenuMobile(false)}>
              📦 Đơn hàng của tôi
            </Link>
          </div>
          {nguoiDung ? (
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-neutral-100">
              <div className="flex items-center gap-3 px-3 py-2 bg-neutral-50 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-[#C9A84C] text-white flex items-center justify-center font-bold">
                  {nguoiDung.hoTen?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="font-semibold text-sm text-neutral-900">{nguoiDung.hoTen}</p>
                  <p className="text-xs text-neutral-500">{nguoiDung.email}</p>
                </div>
              </div>
              {nguoiDung.vaiTro === 'admin' && (
                <Link href="/quan-tri" className="text-center py-2 text-sm font-semibold bg-neutral-900 text-white rounded-xl" onClick={() => setMoMenuMobile(false)}>
                  📊 Vào Trang Quản Trị
                </Link>
              )}
              <button
                onClick={dangXuat}
                className="w-full py-2.5 text-sm font-semibold text-red-600 border border-red-200 rounded-xl hover:bg-red-50 cursor-pointer"
              >
                🚪 Đăng xuất
              </button>
            </div>
          ) : (
            <div className="flex gap-3 mt-4 pt-4 border-t border-neutral-100">
              <Link href="/dang-nhap" className="flex-1 text-center py-2.5 text-sm font-semibold border-2 border-neutral-900 text-neutral-900 rounded-full hover:bg-neutral-900 hover:text-white transition-all duration-200" onClick={() => setMoMenuMobile(false)}>
                Đăng nhập
              </Link>
              <Link href="/dang-ky" className="flex-1 text-center py-2.5 text-sm font-semibold bg-[#C9A84C] text-white rounded-full hover:bg-[#A8893A] transition-all duration-200" onClick={() => setMoMenuMobile(false)}>
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
