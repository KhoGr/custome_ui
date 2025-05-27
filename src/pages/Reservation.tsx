
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReservationForm from "@/components/ReservationForm";

const Reservation = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-primary/10 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Đặt bàn</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Đặt bàn trước để đảm bảo trải nghiệm ẩm thực tuyệt vời tại nhà hàng Délice
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold mb-6">Thông tin đặt bàn</h2>
              <ReservationForm />
            </div>
            
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-6">Giờ mở cửa</h2>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Thứ 2 - Thứ 6</h3>
                    <p className="text-gray-600">
                      <span className="block">Bữa trưa: 11:00 - 14:00</span>
                      <span className="block">Bữa tối: 17:00 - 22:00</span>
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Thứ 7 - Chủ nhật</h3>
                    <p className="text-gray-600">
                      <span className="block">Bữa trưa: 10:00 - 15:00</span>
                      <span className="block">Bữa tối: 17:00 - 23:00</span>
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-6">Chính sách đặt bàn</h2>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Vui lòng đến đúng giờ. Chúng tôi sẽ giữ bàn trong vòng 15 phút.</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Đối với những dịp đặc biệt, chúng tôi có thể yêu cầu đặt cọc.</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Hủy đặt bàn vui lòng thông báo trước ít nhất 4 giờ.</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Đối với nhóm trên 10 người, vui lòng liên hệ trực tiếp.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-primary/10 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-3">Cần hỗ trợ?</h3>
                <p className="mb-4">Liên hệ với chúng tôi qua số điện thoại hoặc email:</p>
                <p className="font-semibold">☎️ (84) 123-456-789</p>
                <p className="font-semibold">✉️ reservation@delice.com</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reservation;
