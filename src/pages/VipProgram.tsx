import React from 'react';
import { Layout, Typography, Card, Badge, Row, Col, Divider } from 'antd';
import {
  GiftOutlined,
  StarFilled,
  CrownOutlined,
} from '@ant-design/icons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VipStatusCard from '@/components/VipStatusCard';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const VipProgram = () => {
  const tiers = [
    {
      name: 'Bronze',
      icon: '🥉',
      threshold: '0đ',
      color: '#FA8C16',
      benefits: [
        'Tích điểm cho mỗi đơn hàng',
        'Miễn phí ship từ 500,000đ',
        'Thông báo khuyến mãi đặc biệt'
      ]
    },
    {
      name: 'Silver',
      icon: '🥈',
      threshold: '1,000,000đ',
      color: '#BFBFBF',
      benefits: [
        'Giảm 5% tất cả đơn hàng',
        'Miễn phí ship từ 300,000đ',
        'Ưu tiên đặt bàn',
        'Sinh nhật tặng voucher 100k'
      ]
    },
    {
      name: 'Gold',
      icon: '🥇',
      threshold: '3,000,000đ',
      color: '#FAAD14',
      benefits: [
        'Giảm 10% tất cả đơn hàng',
        'Miễn phí ship từ 200,000đ',
        'Món tráng miệng miễn phí',
        'Đặt bàn khu vực VIP',
        'Tham gia event đặc biệt'
      ]
    },
    {
      name: 'Platinum',
      icon: '💎',
      threshold: '7,000,000đ',
      color: '#9254DE',
      benefits: [
        'Giảm 15% tất cả đơn hàng',
        'Miễn phí ship toàn bộ',
        'Món khai vị + tráng miệng miễn phí',
        'Phòng riêng VIP',
        'Hỗ trợ 24/7',
        'Early access menu mới'
      ]
    },
    {
      name: 'Diamond',
      icon: '👑',
      threshold: '15,000,000đ',
      color: '#1890FF',
      benefits: [
        'Giảm 20% tất cả đơn hàng',
        'Miễn phí ship toàn bộ',
        'Set menu đặc biệt hàng tháng',
        'Butler service',
        'Event độc quyền',
        'Tư vấn menu cá nhân',
        'Quà tặng sinh nhật đặc biệt'
      ]
    }
  ];

  return (
    <Layout>
      <Navbar />
      <Content style={{ padding: '48px 24px', background: '#f9f9f9' }}>
        <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto', marginBottom: 48 }}>
          <CrownOutlined style={{ fontSize: 48, color: '#722ED1', marginBottom: 16 }} />
          <Title level={2}>Chương trình VIP Délice</Title>
          <Paragraph style={{ fontSize: 16 }}>
            Tích điểm với mỗi đơn hàng và nhận được những ưu đãi đặc biệt. 
            Càng mua nhiều, hạng VIP càng cao và ưu đãi càng hấp dẫn!
          </Paragraph>
        </div>

        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} lg={8}>
            <VipStatusCard />
          </Col>

          <Col xs={24} lg={16}>
            <Card title={<span><GiftOutlined /> Cách thức hoạt động</span>}>
              <Row gutter={[16, 16]}>
                {['Đặt hàng & Tích điểm', 'Lên hạng VIP', 'Nhận ưu đãi'].map((title, i) => (
                  <Col xs={24} md={8} key={i} style={{ textAlign: 'center' }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      margin: '0 auto 16px',
                      borderRadius: '50%',
                      backgroundColor: '#E6F7FF',
                      color: '#1890FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: 16
                    }}>{i + 1}</div>
                    <Text strong>{title}</Text>
                    <Paragraph type="secondary" style={{ fontSize: 13 }}>
                      {i === 0 && '1 điểm cho mỗi 1,000đ chi tiêu'}
                      {i === 1 && 'Tổng chi tiêu càng cao, hạng VIP càng cao'}
                      {i === 2 && 'Hưởng giảm giá và dịch vụ đặc biệt'}
                    </Paragraph>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        </Row>

        <Divider orientation="center" style={{ marginTop: 64 }}>Các hạng VIP</Divider>

<Row gutter={[16, 16]} justify="center">
  {tiers.map((tier, index) => (
    <Col xs={24} sm={12} lg={8} xl={4} key={tier.name}>
      <Card
        hoverable
        className="vip-tier-card"
        style={{
          borderRadius: 12,
          transition: 'all 0.3s',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          textAlign: 'center',
          background: '#fff',
        }}
        headStyle={{ background: '#f0f2f5', borderRadius: '12px 12px 0 0' }}
        title={
          <div style={{ fontSize: 32 }}>
            {tier.icon}
          </div>
        }
      >
        <div style={{ marginBottom: 8 }}>
          <Badge
            color={tier.color}
            text={<strong style={{ fontSize: 16 }}>{tier.name}</strong>}
          />
          <Paragraph type="secondary" style={{ marginTop: 4 }}>
            Từ {tier.threshold}
          </Paragraph>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, marginTop: 16, textAlign: 'left' }}>
          {tier.benefits.map((benefit, i) => (
            <li key={i} style={{ marginBottom: 8, fontSize: 13 }}>
              <StarFilled style={{ color: '#FADB14', marginRight: 8 }} />
              {benefit}
            </li>
          ))}
        </ul>
      </Card>
    </Col>
  ))}
</Row>


        <Divider orientation="center" style={{ marginTop: 64 }}>Câu hỏi thường gặp</Divider>

        <Card>
          <ul style={{ paddingLeft: 16 }}>
            <li style={{ marginBottom: 24 }}>
              <Text strong>Làm sao để tích điểm?</Text>
              <Paragraph type="secondary">Bạn sẽ nhận được 1 điểm cho mỗi 1,000đ chi tiêu khi đặt món hoặc đặt bàn tại Délice.</Paragraph>
            </li>
            <li style={{ marginBottom: 24 }}>
              <Text strong>Điểm có hết hạn không?</Text>
              <Paragraph type="secondary">Điểm VIP của bạn sẽ không hết hạn, nhưng hạng VIP sẽ được đánh giá lại hàng năm dựa trên tổng chi tiêu.</Paragraph>
            </li>
            <li>
              <Text strong>Khi nào được áp dụng ưu đãi VIP?</Text>
              <Paragraph type="secondary">Ưu đãi VIP sẽ được áp dụng tự động khi bạn đặt hàng hoặc đặt bàn, dựa trên hạng VIP hiện tại.</Paragraph>
            </li>
          </ul>
        </Card>
      </Content>
      <Footer />
    </Layout>
  );
};

export default VipProgram;