// =========================================================================================
// 🎯 DÀNH CHO BẠN KHI VẤN ĐÁP:
// - Thanh Header (Logo OPTIC, Menu, Giỏ hàng): Mở file 'components/layout/ThanhMenu.tsx'
// - Banner chuyển động (Chữ to, Nút mua ngay): Mở file 'components/home/BannerTrangChu.tsx'
// =========================================================================================
import BannerTrangChu from '@/components/home/BannerTrangChu';
import DanhMucTrangChu from '@/components/home/DanhMucTrangChu';
import SanPhamNoiBat from '@/components/home/SanPhamNoiBat';
import KhuVucGioiThieu from '@/components/home/KhuVucGioiThieu';

export default function HomePage() {
  return (
    <>
      <BannerTrangChu />
       {/* Liên kết Banner hiện lên Trang chủ */}
      <DanhMucTrangChu />
      <SanPhamNoiBat />
      <KhuVucGioiThieu />
    </>
  );
}
