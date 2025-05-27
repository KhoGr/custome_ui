import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Input, Form, Radio, Typography, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderSummary from "@/components/OrderSummary";
import { FoodItem } from "@/components/FoodCard";

const { Title, Paragraph } = Typography;

type CartItem = {
  item: FoodItem;
  quantity: number;
};

const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
  }, []);

  const updateQuantity = (itemId: number, newQuantity: number) => {
    const updatedCart = cartItems.map(cartItem =>
      cartItem.item.id === itemId ? { ...cartItem, quantity: newQuantity } : cartItem
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (itemId: number) => {
    const updatedCart = cartItems.filter(cartItem => cartItem.item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    notification.info({ message: "Đã xóa sản phẩm khỏi giỏ hàng" });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: any) => {
    if (cartItems.length === 0) {
      notification.error({
        message: "Giỏ hàng trống",
        description: "Vui lòng thêm món ăn vào giỏ hàng"
      });
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    notification.success({
      message: "Đặt hàng thành công!",
      description: "Đơn hàng của bạn đã được tiếp nhận"
    });
    setCartItems([]);
    localStorage.removeItem("cart");
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <div className="bg-primary/10 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Title level={2}>Thanh toán</Title>
            <Paragraph>Hoàn tất đơn hàng của bạn</Paragraph>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <Title level={3}>Giỏ hàng của bạn đang trống</Title>
              <Paragraph>Hãy thêm món ăn vào giỏ hàng của bạn</Paragraph>
              <Link to="/menu">
                <Button type="primary">Xem thực đơn</Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Form layout="vertical" onFinish={handleSubmit}>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <Title level={4}>Phương thức giao hàng</Title>
                    <Form.Item name="deliveryMethod" initialValue={deliveryMethod}>
                      <Radio.Group onChange={(e) => setDeliveryMethod(e.target.value)}>
                        <Radio value="delivery">Giao hàng tận nơi</Radio>
                        <Radio value="pickup">Đến lấy tại nhà hàng</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <Title level={4}>
                      {deliveryMethod === "delivery"
                        ? "Thông tin giao hàng"
                        : "Thông tin người đặt"}
                    </Title>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Form.Item
                        name="name"
                        label="Họ tên"
                        rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
                      >
                        <Input placeholder="Nhập họ tên của bạn" />
                      </Form.Item>
                      <Form.Item
                        name="phone"
                        label="Số điện thoại"
                        rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
                      >
                        <Input placeholder="Nhập số điện thoại" />
                      </Form.Item>
                    </div>

                    <Form.Item name="email" label="Email">
                      <Input type="email" placeholder="Nhập email của bạn" />
                    </Form.Item>

                    {deliveryMethod === "delivery" && (
                      <Form.Item
                        name="address"
                        label="Địa chỉ giao hàng"
                        rules={[{ required: true, message: "Vui lòng nhập địa chỉ giao hàng" }]}
                      >
                        <TextArea rows={3} placeholder="Nhập địa chỉ giao hàng chi tiết" />
                      </Form.Item>
                    )}

                    {deliveryMethod === "pickup" && (
                      <div className="mb-4 p-4 bg-gray-50 rounded-md">
                        <Title level={5}>Địa chỉ nhà hàng:</Title>
                        <p>123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh</p>
                        <p className="text-sm text-gray-600 mt-2">
                          Vui lòng đến đúng giờ để nhận đơn hàng của bạn.
                        </p>
                      </div>
                    )}

                    <Form.Item name="notes" label="Ghi chú">
                      <TextArea placeholder="Ghi chú đặc biệt cho đơn hàng" />
                    </Form.Item>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <Title level={4}>Phương thức thanh toán</Title>
                    <Form.Item name="paymentMethod" initialValue="cash">
                      <Radio.Group>
                        <Radio value="cash">Tiền mặt khi nhận hàng</Radio>
                        <Radio value="bank">Chuyển khoản ngân hàng</Radio>
                        <Radio value="card">Thẻ tín dụng/Ghi nợ</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>

                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                    loading={isLoading}
                  >
                    {isLoading ? "Đang xử lý..." : "Đặt hàng"}
                  </Button>
                </Form>
              </div>

              <div>
                <OrderSummary
                  cartItems={cartItems}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeItem}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
