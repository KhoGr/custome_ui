import { useState } from 'react';
import { Badge, Button, Drawer, Divider, List, Typography, Space, Empty, message } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { NotificationType, useNotifications } from '@/context/NotificationContext';
import { format } from 'date-fns';

const { Title, Text } = Typography;

// Map type to color/icon
const notificationTypeConfig: Record<NotificationType, { icon: string; color: string }> = {
  promotion: { icon: '🎁', color: '#FFF7CC' },
  order: { icon: '🍽️', color: '#CCE0FF' },
  table: { icon: '🪑', color: '#D6F5D6' },
  info: { icon: 'ℹ️', color: '#F0F0F0' },
};

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotifications();

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };

  return (
    <>
      <Badge count={unreadCount} offset={[-2, 4]}>
        <Button type="text" icon={<BellOutlined />} onClick={() => setOpen(true)} />
      </Badge>

      <Drawer
        title="Thông báo"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
        width={400}
        extra={
          <Space>
            <Button size="small" onClick={markAllAsRead} disabled={unreadCount === 0}>
              Đánh dấu đã đọc tất cả
            </Button>
            <Button size="small" danger onClick={clearNotifications} disabled={notifications.length === 0}>
              Xóa tất cả
            </Button>
          </Space>
        }
      >
        <Divider />
        {notifications.length === 0 ? (
          <Empty description="Không có thông báo" />
        ) : (
          <List
            dataSource={notifications}
            renderItem={(item) => {
              const config = notificationTypeConfig[item.type];
              return (
                <List.Item
                  style={{
                    background: config.color,
                    borderLeft: item.read ? undefined : '4px solid #1890ff',
                    cursor: 'pointer',
                    padding: 16,
                    borderRadius: 8,
                    marginBottom: 12,
                  }}
                  onClick={() => handleNotificationClick(item.id)}
                >
                  <List.Item.Meta
                    avatar={<span style={{ fontSize: 24 }}>{config.icon}</span>}
                    title={<Text strong>{item.title}</Text>}
                    description={
                      <>
                        <Text>{item.message}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {format(item.timestamp, 'dd/MM/yyyy HH:mm')}
                        </Text>
                      </>
                    }
                  />
                </List.Item>
              );
            }}
          />
        )}
      </Drawer>
    </>
  );
};

export default NotificationBell;
