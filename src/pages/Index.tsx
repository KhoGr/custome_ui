
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-hero-pattern bg-cover bg-center h-[500px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Délice Restaurant</h1>
            <p className="text-xl md:text-2xl mb-8">Ẩm thực tinh tế, trải nghiệm tuyệt vời</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/menu">
                <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 text-lg">
                  Đặt món ngay
                </Button>
              </Link>
              <Link to="/reservation">
                <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary px-6 py-3 text-lg">
                  Đặt bàn
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features */}
      <div className="py-16 bg-restaurant-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Dịch vụ của chúng tôi</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#E63946" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1 .39.64l-1.285.788 1.285.788a.375.375 0 1 1-.395.64L12 5.375l-.26.156a.375.375 0 1 1-.395-.64l1.285-.788-1.285-.788a.375.375 0 0 1 .395-.64L12 3.375l.265-.264Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Đặt món</h3>
              <p className="text-gray-600 mb-4">Chọn từ thực đơn phong phú của chúng tôi và thưởng thức món ăn ngon tại nhà</p>
              <Link to="/menu">
                <Button variant="link" className="text-primary">
                  Xem thực đơn
                </Button>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#E63946" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Đặt bàn</h3>
              <p className="text-gray-600 mb-4">Đặt bàn trước để đảm bảo trải nghiệm ẩm thực tuyệt vời tại nhà hàng</p>
              <Link to="/reservation">
                <Button variant="link" className="text-primary">
                  Đặt bàn ngay
                </Button>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#E63946" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Khuyến mãi</h3>
              <p className="text-gray-600 mb-4">Săn khuyến mãi và mã giảm giá hấp dẫn cho những món ăn yêu thích</p>
              <Link to="/coupons">
                <Button variant="link" className="text-primary">
                  Xem khuyến mãi
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Popular Dishes */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Món ăn nổi bật</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Khám phá những món ăn được ưa chuộng nhất tại nhà hàng chúng tôi,
            được chế biến bởi những đầu bếp hàng đầu
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            {popularDishes.map((dish) => (
              <div key={dish.id} className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <img src={dish.image} alt={dish.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{dish.name}</h3>
                  <p className="text-gray-500 text-sm mb-3">{dish.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-bold">{dish.price.toLocaleString()} ₫</span>
                    <Link to="/menu">
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Đặt ngay
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/menu">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                Xem tất cả
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Testimonial */}
      <div className="py-16 bg-restaurant-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Khách hàng nói gì về chúng tôi</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className={`w-4 h-4 ${
                            i < testimonial.rating ? "text-yellow-400" : "text-gray-400"
                          }`}
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300">{testimonial.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

// Sample Data
const popularDishes = [
  {
    id: 1,
    name: "Bò Bít Tết Kiểu Pháp",
    description: "Thịt bò thượng hạng áp chảo trên nền sốt nấm",
    price: 350000,
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070"
  },
  {
    id: 2,
    name: "Cá Hồi Nướng Sốt Cam",
    description: "Cá hồi Na Uy nướng với sốt cam tươi",
    price: 280000,
    image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?q=80&w=2070"
  },
  {
    id: 3,
    name: "Pizza Hải Sản",
    description: "Đế giòn với hải sản tươi ngon, phô mai Mozzarella",
    price: 220000,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070"
  },
  {
    id: 4,
    name: "Pasta Carbonara",
    description: "Mì Ý với sốt kem, thịt xông khói và phô mai Parmesan",
    price: 180000,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2071"
  }
];

const testimonials = [
  {
    name: "Nguyễn Văn A",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 5,
    comment: "Tôi thực sự ấn tượng với chất lượng món ăn và dịch vụ tại đây. Đội ngũ nhân viên rất chuyên nghiệp và thân thiện."
  },
  {
    name: "Lê Thị B",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 5,
    comment: "Không gian nhà hàng sang trọng, ấm cúng. Món ăn ngon miệng, trình bày đẹp mắt. Sẽ quay lại nhiều lần nữa!"
  },
  {
    name: "Trần Văn C",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 4,
    comment: "Đặt bàn dễ dàng, thức ăn ngon. Món tráng miệng đặc biệt ngon. Giá cả hợp lý cho chất lượng đồ ăn."
  }
];

export default Index;
