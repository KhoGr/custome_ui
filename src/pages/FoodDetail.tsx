import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Button,
  Input,
  Rate,
  Image,
  Card,
  Divider,
  Form,
  Typography,
  message,
} from "antd";
import { ShoppingCartOutlined, MessageOutlined } from "@ant-design/icons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FoodItem } from "@/components/FoodCard";

const { Title, Text, Paragraph } = Typography;

type Review = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
};

const mockReviews: Review[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    rating: 5,
    comment: "Món ăn rất ngon, phục vụ nhanh chóng!",
    date: "2023-05-10"
  },
  {
    id: 2,
    name: "Trần Thị B",
    rating: 4,
    comment: "Hương vị đặc biệt, sẽ quay lại lần sau.",
    date: "2023-05-08"
  },
  {
    id: 3,
    name: "Lê Văn C",
    rating: 5,
    comment: "Xuất sắc, không có gì để chê.",
    date: "2023-05-05"
  }
];

const foodItems: FoodItem[] = [
  {
    id: 1,
    name: "Gỏi cuốn tôm thịt",
    description: "Gỏi cuốn với tôm, thịt heo và rau tươi cùng nước chấm đặc biệt",
    price: 85000,
    image: "https://images.unsplash.com/photo-1553701275-1d6118df773e?q=80&w=2070",
    category: "appetizers",
    fullDescription:
      "Gỏi cuốn tôm thịt là một món ăn truyền thống của Việt Nam..."
  },
  {
    id: 2,
    name: "Súp hải sản",
    description: "Súp hải sản thơm ngon với tôm, mực và các loại hải sản tươi ngon",
    price: 120000,
    image: "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?q=80&w=2035",
    category: "appetizers",
    fullDescription: "Súp hải sản được chế biến từ tôm, mực, sò điệp..."
  }
];

const FoodDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<FoodItem | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });

  useEffect(() => {
    const foodItem = foodItems.find((f) => f.id === Number(id));
    if (foodItem) setItem(foodItem);
    setReviews(mockReviews);
  }, [id]);

  const handleAddToCart = () => {
    if (!item) return;
    const savedCart = localStorage.getItem("cart");
    // eslint-disable-next-line prefer-const
    let currentCart = savedCart ? JSON.parse(savedCart) : [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existingIndex = currentCart.findIndex((cartItem: any) => cartItem.item.id === item.id);
    if (existingIndex > -1) {
      currentCart[existingIndex].quantity += quantity;
    } else {
      currentCart.push({ item, quantity });
    }
    localStorage.setItem("cart", JSON.stringify(currentCart));
    message.success(`${quantity} x ${item.name} đã được thêm vào giỏ hàng`);
    setQuantity(1);
  };

  const handleSubmitReview = () => {
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      message.error("Vui lòng điền đầy đủ thông tin đánh giá");
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    const review = { id: reviews.length + 1, ...newReview, date: today };
    setReviews([review, ...reviews]);
    setNewReview({ name: "", rating: 5, comment: "" });
    message.success("Cảm ơn bạn đã gửi đánh giá!");
  };

  if (!item) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p>Không tìm thấy món ăn</p>
        </main>
        <Footer />
      </div>
    );
  }

  const averageRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <Link to="/menu" style={{ color: "#1890ff" }}>
            &larr; Quay lại thực đơn
          </Link>

          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <Image src={item.image} alt={item.name} width="100%" height={400} style={{ objectFit: "cover", borderRadius: 8 }} />

            <div>
              <Title level={2}>{item.name}</Title>
              <Rate disabled defaultValue={averageRating} />
              <Text type="secondary"> ({reviews.length} đánh giá)</Text>

              <Title level={3} style={{ color: "#1677ff", marginTop: 16 }}>
                {item.price.toLocaleString()} ₫
              </Title>

              <Paragraph>{item.fullDescription || item.description}</Paragraph>

              <div className="flex items-center gap-2 mt-4">
                <Button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
                <Input value={quantity} style={{ width: 60, textAlign: "center" }} readOnly />
                <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
              </div>

              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                className="mt-4"
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </Button>

              <Divider />
              <Text strong>Danh mục: </Text>
              <Text>{item.category}</Text>
            </div>
          </div>

          <div className="mt-16">
            <Title level={3}>
              <MessageOutlined /> Đánh giá và bình luận
            </Title>

            <Card className="mb-8" title="Đánh giá món ăn này">
              <Form layout="vertical" onFinish={handleSubmitReview}>
                <Form.Item label="Tên của bạn" required>
                  <Input
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder="Nhập tên"
                  />
                </Form.Item>

                <Form.Item label="Đánh giá" required>
                  <Rate
                    value={newReview.rating}
                    onChange={(value) => setNewReview({ ...newReview, rating: value })}
                  />
                </Form.Item>

                <Form.Item label="Bình luận" required>
                  <Input.TextArea
                    rows={4}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Chia sẻ trải nghiệm của bạn..."
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Gửi đánh giá
                  </Button>
                </Form.Item>
              </Form>
            </Card>

            {reviews.length === 0 ? (
              <Text type="secondary">Chưa có đánh giá nào.</Text>
            ) : (
              reviews.map((r) => (
                <Card key={r.id} className="mb-4">
                  <div className="flex justify-between">
                    <div>
                      <Text strong>{r.name}</Text>
                      <br />
                      <Rate disabled defaultValue={r.rating} />
                    </div>
                    <Text type="secondary">{r.date}</Text>
                  </div>
                  <Paragraph className="mt-2">{r.comment}</Paragraph>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FoodDetail;
