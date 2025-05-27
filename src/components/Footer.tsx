
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-restaurant-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">King's Restaurant</h3>
            <p className="mb-4">Ẩm thực tinh tế, không gian sang trọng, trải nghiệm ấn tượng.</p>
            <p className="mb-4">Địa chỉ: 123 Thanh Nhàn, Hai Bà Trưng, Hà Nội</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Giờ mở cửa</h3>
            <p className="mb-2">Thứ 2 - Thứ 6: 11:00 - 22:00</p>
            <p className="mb-2">Thứ 7 - Chủ nhật: 10:00 - 23:00</p>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Liên hệ</h4>
              <p>Phone: 0832083622</p>
              <p>Email: hoang.nd210370@sis.hust.edu.vn</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-secondary">Trang chủ</Link></li>
              <li><Link to="/menu" className="hover:text-secondary">Thực đơn</Link></li>
              <li><Link to="/reservation" className="hover:text-secondary">Đặt bàn</Link></li>
              <li><Link to="/coupons" className="hover:text-secondary">Khuyến mãi</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-600 text-center">
          <p>&copy; {new Date().getFullYear()} King's Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
