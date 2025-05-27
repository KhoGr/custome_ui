import { Link } from 'react-router-dom';
import { Button, Card, Typography, Row, Col, Image, Rate } from 'antd';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const { Title, Paragraph } = Typography;

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-hero-pattern bg-cover bg-center h-[500px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <Title level={1} className="!text-white">King's Restaurant</Title>
            <Paragraph className="text-xl md:text-2xl mb-8 text-white">
              Ẩm thực tinh tế, trải nghiệm tuyệt vời
            </Paragraph>
            <Row gutter={[16, 16]} justify="center">
              <Col>
                <Link to="/menu">
                  <Button type="primary" size="large">Đặt món ngay</Button>
                </Link>
              </Col>
              <Col>
                <Link to="/reservation">
                  <Button type="default" size="large" ghost>Đặt bàn</Button>
                </Link>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-restaurant-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Title level={2} className="text-center">Dịch vụ của chúng tôi</Title>

          <Row gutter={[24, 24]} justify="center">
            {[{
              title: 'Đặt món',
              desc: 'Chọn từ thực đơn phong phú của chúng tôi và thưởng thức món ăn ngon tại nhà',
              link: '/menu',
              linkText: 'Xem thực đơn'
            }, {
              title: 'Đặt bàn',
              desc: 'Đặt bàn trước để đảm bảo trải nghiệm ẩm thực tuyệt vời tại nhà hàng',
              link: '/reservation',
              linkText: 'Đặt bàn ngay'
            }, {
              title: 'Khuyến mãi',
              desc: 'Săn khuyến mãi và mã giảm giá hấp dẫn cho những món ăn yêu thích',
              link: '/coupons',
              linkText: 'Xem khuyến mãi'
            }].map((service, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card bordered hoverable className="text-center">
                  <Title level={4}>{service.title}</Title>
                  <Paragraph>{service.desc}</Paragraph>
                  <Link to={service.link}>
                    <Button type="link" className="text-primary">{service.linkText}</Button>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Placeholder for Popular Dishes */}
      {/* Replace with mapped Card/Image layout similar to Features */}

      {/* Placeholder for Testimonials */}
      {/* Replace with Card including Avatar, Name, and Rate */}

      <Footer />
    </div>
  );
};

export default Index;