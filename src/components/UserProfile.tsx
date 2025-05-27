import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, Drawer, Modal, Tabs, message } from 'antd';

const { TabPane } = Tabs;

// Mock user data
const mockUser = {
  name: 'Nguyễn Đức Hoàng',
  email: 'Hoangducnguyen2907@gmail.com',
  phone: '0832083622',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  address: '123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh',
};

const mockOrders = [
  {
    id: 'ORD-12345',
    date: '15/05/2025',
    status: 'Đã giao',
    total: 450000,
    items: [
      { name: 'Bò Bít Tết Kiểu Pháp', quantity: 1, price: 350000 },
      { name: 'Pizza Hải Sản', quantity: 1, price: 100000 },
    ]
  },
  {
    id: 'ORD-12344',
    date: '10/05/2025',
    status: 'Đã giao',
    total: 280000,
    items: [
      { name: 'Cá Hồi Nướng Sốt Cam', quantity: 1, price: 280000 },
    ]
  }
];

const mockReservations = [
  {
    id: 'RES-7890',
    date: '20/05/2025',
    time: '19:00',
    guests: 4,
    status: 'Đã xác nhận',
    tables: ['T4']
  },
  {
    id: 'RES-7889',
    date: '01/05/2025',
    time: '18:30',
    guests: 2,
    status: 'Hoàn thành',
    tables: ['T2']
  }
];

const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [user] = useState(mockUser);

  const handleLogout = () => {
    message.success('Đăng xuất thành công. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.');
    setLogoutModalVisible(false);
    setOpen(false);
  };

  const getInitials = (name: string = '') =>
    name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  return (
    <>
      <Button 
        type="text" 
        icon={<UserOutlined />} 
        onClick={() => setOpen(true)} 
      />

      <Drawer
        title="Thông tin tài khoản"
        placement="right"
        width={400}
        onClose={() => setOpen(false)}
        open={open}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Avatar 
            size={80} 
            src={user.avatar}
          >
            {getInitials(user.name)}
          </Avatar>
          <h2 style={{ marginTop: 12 }}>{user.name}</h2>
          <p style={{ color: '#999' }}>{user.email}</p>
        </div>

        <Divider />

        <Tabs defaultActiveKey="1">
          <TabPane tab="Thông tin" key="1">
            <p><strong>Số điện thoại:</strong> {user.phone}</p>
            <p><strong>Địa chỉ:</strong> {user.address}</p>
            <Button type="primary" block style={{ marginTop: 16 }}>
              Chỉnh sửa thông tin
            </Button>
          </TabPane>

          <TabPane tab="Đơn hàng" key="2">
            {mockOrders.map(order => (
              <div key={order.id} style={{ marginBottom: 16, border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <h4>Mã đơn: {order.id}</h4>
                    <p style={{ color: '#999' }}>Ngày: {order.date}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ color: '#1677ff' }}>{order.status}</p>
                    <p style={{ fontWeight: 'bold' }}>{order.total.toLocaleString()}đ</p>
                  </div>
                </div>
                <Divider />
                {order.items.map((item, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                    <span>{item.name} x{item.quantity}</span>
                    <span>{item.price.toLocaleString()}đ</span>
                  </div>
                ))}
              </div>
            ))}
          </TabPane>

          <TabPane tab="Đặt bàn" key="3">
            {mockReservations.map(res => (
              <div key={res.id} style={{ marginBottom: 16, border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
                <h4>Mã đặt bàn: {res.id}</h4>
                <p>Ngày: {res.date} - {res.time}</p>
                <p>Số khách: {res.guests} người</p>
                <p>Bàn: {res.tables.join(', ')}</p>
                <p style={{ textAlign: 'right', color: '#1677ff' }}>{res.status}</p>
              </div>
            ))}
          </TabPane>
        </Tabs>

        <Divider />

        <Button danger block onClick={() => setLogoutModalVisible(true)}>
          Đăng xuất
        </Button>
      </Drawer>

      <Modal
        title="Bạn muốn đăng xuất?"
        visible={logoutModalVisible}
        onOk={handleLogout}
        onCancel={() => setLogoutModalVisible(false)}
        okText="Đăng xuất"
        cancelText="Hủy"
      >
        <p>Xác nhận đăng xuất khỏi tài khoản. Bạn có thể đăng nhập lại bất cứ lúc nào.</p>
      </Modal>
    </>
  );
};

export default UserProfile;
