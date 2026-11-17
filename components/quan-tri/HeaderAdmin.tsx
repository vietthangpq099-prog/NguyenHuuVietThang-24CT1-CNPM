'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, Search, LogOut, Home, User } from 'lucide-react';
import { NutHamburgerAdmin } from './SidebarAdmin';

interface HeaderAdminProps {
  tieuDe: string;
  onMoMenuMobile: () => void;
}

export default function HeaderAdmin({ tieuDe, onMoMenuMobile }: HeaderAdminProps) {
  const [moMenuUser, setMoMenuUser] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const xuLyClickNgoai = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMoMenuUser(false);
      }
    };
    document.addEventListener('mousedown', xuLyClickNgoai);
    return () => document.removeEventListener('mousedown', xuLyClickNgoai);
  }, []);

  const xuLyDangXuat = () => {
    setMoMenuUser(false);
    router.push('/dang-nhap');
  };

  return (
    <header className="bg-white border-b border-neutral-100 px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <NutHamburgerAdmin onClick={onMoMenuMobile} />
        <h1 className="font-bold text-lg text-neutral-900 font-sans">{tieuDe}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Tìm kiếm */}
        <div className="hidden sm:flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-full px-4 py-2">
          <Search size={15} className="text-neutral-400" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="bg-transparent text-sm text-neutral-700 outline-none w-36 placeholder:text-neutral-400"
          />
        </div>

        {/* Thông báo */}
        <button className="relative p-2 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer">
          <Bell size={20} className="text-neutral-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Avatar chữ A có menu Đăng xuất */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMoMenuUser(!moMenuUser)}
            title="Tài khoản Quản trị viên"
            className="w-9 h-9 bg-[#C9A84C] hover:bg-[#b8963e] rounded-full flex items-center justify-center text-white font-bold text-sm cursor-pointer transition-colors shadow-sm"
          >
            A
          </button>

          {moMenuUser && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-neutral-100 py-2 z-50">
              <div className="px-4 py-2.5 border-b border-neutral-100">
                <p className="text-sm font-bold text-neutral-900">Quản Trị Viên</p>
                <p className="text-xs text-neutral-500 truncate">admin@opticshop.vn</p>
              </div>

              <Link
                href="/tai-khoan"
                onClick={() => setMoMenuUser(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                <User size={16} className="text-neutral-400" />
                Hồ sơ tài khoản
              </Link>

              <Link
                href="/"
                onClick={() => setMoMenuUser(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                <Home size={16} className="text-neutral-400" />
                Về trang chủ bán hàng
              </Link>

              <div className="border-t border-neutral-100 mt-1 pt-1">
                <button
                  onClick={xuLyDangXuat}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut size={16} />
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
