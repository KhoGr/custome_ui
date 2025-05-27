import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button, Badge, Drawer, Row, Col } from "antd";
import {
  HomeOutlined,
  CalendarOutlined,
  GiftOutlined,
  CrownOutlined,
  FileTextOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import NotificationBell from "@/components/NotificationBell";
import UserProfile from "@/components/UserProfile";

const { Header } = Layout;

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          const cart = JSON.parse(savedCart);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const count = cart.reduce((total: number, item: any) => total + item.quantity, 0);
          setCartItemsCount(count);
        } catch (e) {
          console.error("Failed to parse cart from localStorage", e);
        }
      }
    };

    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);
    const interval = setInterval(updateCartCount, 2000);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
      clearInterval(interval);
    };
  }, []);

  const menuItems = [
    { key: "home", label: <Link to="/">Trang chủ</Link>, icon: <HomeOutlined /> },
    { key: "menu", label: <Link to="/menu">Thực đơn</Link> },
    { key: "reservation", label: <Link to="/reservation">Đặt bàn</Link>, icon: <CalendarOutlined /> },
    { key: "coupons", label: <Link to="/coupons">Khuyến mãi</Link>, icon: <GiftOutlined /> },
    { key: "vip", label: <Link to="/vip">VIP</Link>, icon: <CrownOutlined /> },
    { key: "orders", label: <Link to="/orders">Đơn hàng</Link>, icon: <FileTextOutlined /> },
  ];

  return (
    <Header style={{ backgroundColor: "#fff", position: "sticky", top: 0, zIndex: 1000, padding: 0 }}>
      <Row align="middle" justify="space-between" style={{ padding: "0 24px", height: 64 }}>
        {/* Logo */}
        <Col>
          <Link to="/" style={{ fontSize: 24, fontWeight: 700, color: "#1677ff" }}>King's Restaurant</Link>
        </Col>

        {/* Desktop Menu */}
        <Col flex="auto" className="hidden md:block">
          <Menu mode="horizontal" selectable={false} items={menuItems} style={{ borderBottom: "none" }} />
        </Col>

        {/* Right Actions */}
        <Col>
          <Row align="middle" gutter={12}>
            <Col><NotificationBell /></Col>
            <Col><UserProfile /></Col>
            <Col>
              <Link to="/checkout">
                <Badge count={cartItemsCount} offset={[-4, 4]} size="small">
                  <Button
                    icon={<ShoppingCartOutlined />}
                    type="default"
                    style={{ borderColor: "#1677ff", color: "#1677ff" }}
                  >
                    <span className="hidden md:inline">Giỏ hàng</span>
                  </Button>
                </Badge>
              </Link>
            </Col>
            <Col className="md:hidden">
              <Button icon={<MenuOutlined />} type="text" onClick={() => setIsDrawerOpen(true)} />
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        closable
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
      >
        {menuItems.map((item) => (
          <div key={item.key} style={{ marginBottom: 16 }}>
            <Link to={`/${item.key}`} onClick={() => setIsDrawerOpen(false)}>
              {item.icon && <span style={{ marginRight: 8 }}>{item.icon}</span>}
              {item.label}
            </Link>
          </div>
        ))}
        <div style={{ marginTop: 24 }}>
          <Link to="/checkout" onClick={() => setIsDrawerOpen(false)}>
            <ShoppingCartOutlined style={{ marginRight: 8 }} />
            Giỏ hàng
          </Link>
        </div>
      </Drawer>
    </Header>
  );
};

export default Navbar;
