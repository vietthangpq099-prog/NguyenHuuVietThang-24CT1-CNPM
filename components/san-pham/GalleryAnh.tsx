'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GalleryAnhProps {
  anhDanhSach: string[];
  tenSanPham: string;
}

const ANH_DU_PHONG = 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800&auto=format&fit=crop&q=80';

export default function GalleryAnh({ anhDanhSach, tenSanPham }: GalleryAnhProps) {
  const [viTriHienTai, setViTriHienTai] = useState(0);
  const [moPhongTo, setMoPhongTo] = useState(false);
  const [danhSachLoi, setDanhSachLoi] = useState<Record<number, boolean>>({});

  const danhSach = anhDanhSach.length > 0 ? anhDanhSach : [ANH_DU_PHONG];

  const laySrc = (index: number) => {
    if (danhSachLoi[index]) return ANH_DU_PHONG;
    return danhSach[index] || ANH_DU_PHONG;
  };

  const danhDauLoi = (index: number) => {
    setDanhSachLoi((prev) => ({ ...prev, [index]: true }));
  };

  const anhHienTai = laySrc(viTriHienTai);

  const anhTruoc = () => setViTriHienTai((v) => (v - 1 + danhSach.length) % danhSach.length);
  const anhSau  = () => setViTriHienTai((v) => (v + 1) % danhSach.length);

  return (
    <>
      <div className="space-y-3">
        {/* Ảnh chính */}
        <div className="relative aspect-square bg-neutral-100 rounded-3xl overflow-hidden group cursor-zoom-in">
          {anhHienTai ? (
            <Image
              src={anhHienTai}
              alt={`${tenSanPham} - ảnh ${viTriHienTai + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={viTriHienTai === 0}
              onError={() => danhDauLoi(viTriHienTai)}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
              <span className="text-[120px] opacity-15 select-none">🕶️</span>
            </div>
          )}

          {/* Nút phóng to */}
          {anhHienTai && (
            <button
              onClick={() => setMoPhongTo(true)}
              className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-sm hover:bg-white z-10"
              aria-label="Phóng to ảnh"
            >
              <ZoomIn size={18} className="text-neutral-700" />
            </button>
          )}

          {/* Nút điều hướng */}
          {danhSach.length > 1 && (
            <>
              <button onClick={anhTruoc} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm cursor-pointer hover:bg-white z-10">
                <ChevronLeft size={18} />
              </button>
              <button onClick={anhSau} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm cursor-pointer hover:bg-white z-10">
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Dots chỉ vị trí */}
          {danhSach.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {danhSach.map((_, i) => (
                <button key={i} onClick={() => setViTriHienTai(i)} className={cn('w-2 h-2 rounded-full transition-all duration-200 cursor-pointer', i === viTriHienTai ? 'bg-white w-4' : 'bg-white/50')} />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail các góc nhìn */}
        {danhSach.length > 1 && (
          <div className="flex gap-2 sm:gap-3">
            {danhSach.map((_, i) => (
              <button
                key={i}
                onClick={() => setViTriHienTai(i)}
                className={cn(
                  'relative flex-1 aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-200 cursor-pointer bg-white shadow-sm',
                  i === viTriHienTai
                    ? 'border-[#C9A84C] shadow-md ring-2 ring-[#C9A84C]/30 scale-[1.02]'
                    : 'border-neutral-200 hover:border-neutral-400 opacity-75 hover:opacity-100'
                )}
                aria-label={`${tenSanPham} ảnh ${i + 1}`}
              >
                <Image
                  src={laySrc(i)}
                  alt={`${tenSanPham} ảnh ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="120px"
                  onError={() => danhDauLoi(i)}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal phóng to */}
      {moPhongTo && anhHienTai && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={() => setMoPhongTo(false)}>
          <button onClick={() => setMoPhongTo(false)} className="absolute top-5 right-5 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 cursor-pointer transition-colors z-10">
            <X size={22} />
          </button>
          <div className="relative max-w-3xl max-h-[90vh] w-full aspect-square" onClick={(e) => e.stopPropagation()}>
            <Image
              src={anhHienTai}
              alt={tenSanPham}
              fill
              className="object-contain rounded-2xl"
              sizes="90vw"
              onError={() => danhDauLoi(viTriHienTai)}
            />
          </div>
        </div>
      )}
    </>
  );
}
