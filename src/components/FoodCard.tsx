import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, message, InputNumber, Card } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

export type FoodItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  fullDescription?: string;
};



type FoodCardProps = {
  item: FoodItem;
  onAddToCart: (item: FoodItem, quantity: number) => void;
};

const FoodCard = ({ item, onAddToCart }: FoodCardProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(item, quantity);
    message.success(`Đã thêm ${quantity} x ${item.name} vào giỏ hàng`);
    setQuantity(1);
  };

  return (
    <Card
      hoverable
      cover={
        <Link to={`/food/${item.id}`}>
          <img
            alt={item.name}
            src={item.image}
            style={{ height: 200, objectFit: "cover", width: "100%" }}
          />
        </Link>
      }
      style={{ width: "100%", borderRadius: 8 }}
    >
      <Link to={`/food/${item.id}`}>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{item.name}</h3>
      </Link>
      <p style={{ fontSize: 14, color: "#666", height: 48, overflow: "hidden", marginBottom: 12 }}>
        {item.description}
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: "#1677ff" }}>
          {item.price.toLocaleString()} ₫
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <InputNumber
            min={1}
            value={quantity}
            onChange={(val) => setQuantity(Number(val) || 1)}
            size="small"
            style={{ width: 60 }}
          />
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            size="small"
            onClick={handleAddToCart}
          >
            Thêm
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FoodCard;
