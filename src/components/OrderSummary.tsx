import { useState, useEffect } from "react";
import { Card, Button, Input, Select, message, Divider, Typography, Space, Image } from "antd";
import type { SelectProps } from "antd";

import { FoodItem } from "./FoodCard";

const { Title, Text } = Typography;

type CartItem = {
  item: FoodItem;
  quantity: number;
};

type OrderSummaryProps = {
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: number, newQuantity: number) => void;
  onRemoveItem: (itemId: number) => void;
};

const OrderSummary = ({ cartItems, onUpdateQuantity, onRemoveItem }: OrderSummaryProps) => {
  const [couponCode, setCouponCode] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const validCoupons = [
    { code: "WELCOME10", discount: 0.1, description: "Giảm 10% tổng đơn hàng" },
    { code: "SPECIAL20", discount: 0.2, description: "Giảm 20% tổng đơn hàng" },
    { code: "FREESHIP", discount: 30000, description: "Miễn phí vận chuyển" },
  ];

  const subtotal = cartItems.reduce(
    (sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
    0
  );

  const deliveryFee = subtotal > 300000 ? 0 : 30000;
  const total = subtotal + deliveryFee - discount;

  useEffect(() => {
    if (selectedCoupon || couponCode) {
      const couponToApply = selectedCoupon || couponCode;
      const coupon = validCoupons.find(
        (c) => c.code.toLowerCase() === couponToApply.toLowerCase()
      );

      if (coupon) {
        const discountAmount =
          typeof coupon.discount === "number" && coupon.discount <= 1
            ? Math.round(subtotal * coupon.discount)
            : coupon.discount;

        setDiscount(discountAmount);
      }
    }
  }, [cartItems, selectedCoupon, couponCode, subtotal]);

  const applyCoupon = () => {
    const coupon = validCoupons.find(
      (c) => c.code.toLowerCase() === couponCode.toLowerCase()
    );

    if (coupon) {
      const discountAmount =
        typeof coupon.discount === "number" && coupon.discount <= 1
          ? Math.round(subtotal * coupon.discount)
          : coupon.discount;

      setDiscount(discountAmount);
      setSelectedCoupon(coupon.code);
      message.success(`Áp dụng mã giảm ${discountAmount.toLocaleString()} ₫`);
    } else {
      message.error("Mã giảm giá không hợp lệ");
    }
  };

  const handleSelectCoupon = (value: string) => {
    setSelectedCoupon(value);
    setCouponCode(value);
    const coupon = validCoupons.find((c) => c.code === value);
    if (coupon) {
      const discountAmount =
        typeof coupon.discount === "number" && coupon.discount <= 1
          ? Math.round(subtotal * coupon.discount)
          : coupon.discount;
      setDiscount(discountAmount);
      message.success(`Áp dụng mã giảm ${discountAmount.toLocaleString()} ₫`);
    }
  };

  return (
    <Card title="Đơn hàng của bạn" bordered className="shadow-md">
      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <Text type="secondary">Giỏ hàng của bạn đang trống</Text>
          <br />
          <Button type="default" onClick={() => (window.location.href = "/menu")} className="mt-3">
            Xem thực đơn
          </Button>
        </div>
      ) : (
        <>
          {cartItems.map((cartItem) => (
            <div key={cartItem.item.id} style={{ padding: "12px 0", display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex" }}>
                <Image
                  width={64}
                  height={64}
                  src={cartItem.item.image}
                  alt={cartItem.item.name}
                  style={{ objectFit: "cover", borderRadius: 8, marginRight: 12 }}
                  preview={false}
                />
                <div>
                  <Text strong>{cartItem.item.name}</Text>
                  <br />
                  <Text type="secondary">
                    {cartItem.item.price.toLocaleString()} ₫ x {cartItem.quantity}
                  </Text>
                </div>
              </div>
              <Space>
                <Button
                  size="small"
                  onClick={() =>
                    cartItem.quantity > 1
                      ? onUpdateQuantity(cartItem.item.id, cartItem.quantity - 1)
                      : onRemoveItem(cartItem.item.id)
                  }
                >
                  -
                </Button>
                <Text>{cartItem.quantity}</Text>
                <Button
                  size="small"
                  onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                >
                  +
                </Button>
                <Button danger type="link" onClick={() => onRemoveItem(cartItem.item.id)}>
                  Xóa
                </Button>
              </Space>
            </div>
          ))}

          <Divider />

          <div style={{ marginBottom: 12 }}>
            <Text strong>Chọn mã giảm giá:</Text>
            <Select
              style={{ width: "100%", marginTop: 4, marginBottom: 8 }}
              placeholder="Chọn mã giảm giá"
              value={selectedCoupon || undefined}
              onChange={handleSelectCoupon}
              options={validCoupons.map((c) => ({
                value: c.code,
                label: `${c.code} - ${c.description}`,
              }))}
            />
            <Input.Group compact>
              <Input
                style={{ width: "calc(100% - 100px)" }}
                placeholder="Nhập mã giảm giá khác"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button onClick={applyCoupon}>Áp dụng</Button>
            </Input.Group>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Thử các mã: WELCOME10, SPECIAL20, FREESHIP
            </Text>
          </div>

          <Divider />

          <div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text>Tạm tính:</Text>
              <Text>{subtotal.toLocaleString()} ₫</Text>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text>Phí vận chuyển:</Text>
              <Text>{deliveryFee === 0 ? "Miễn phí" : `${deliveryFee.toLocaleString()} ₫`}</Text>
            </div>
            {discount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", color: "#1677ff" }}>
                <Text>Giảm giá:</Text>
                <Text>-{discount.toLocaleString()} ₫</Text>
              </div>
            )}
            <Divider />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text strong>Tổng cộng:</Text>
              <Text strong style={{ fontSize: 18 }}>
                {total.toLocaleString()} ₫
              </Text>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default OrderSummary;
