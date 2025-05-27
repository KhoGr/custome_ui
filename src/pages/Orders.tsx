/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { format, subMonths, isAfter } from "date-fns";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, Table, Badge, Button, Card } from "antd";
import { CreditCard, Wallet, BanknoteIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockFoodOrders = [  {
    id: "ORD-12345",
    date: "2025-05-10T15:30:00",
    status: "Đã giao",
    total: 450000,
    paymentMethod: "Visa",
    paymentStatus: "Đã thanh toán",
    items: [
      { name: "Bò Bít Tết Kiểu Pháp", quantity: 1, price: 350000 },
      { name: "Pizza Hải Sản", quantity: 1, price: 100000 },
    ],
  },
  {
    id: "ORD-12344",
    date: "2025-05-08T12:45:00",
    status: "Đã giao",
    total: 280000,
    paymentMethod: "ATM",
    paymentStatus: "Đã thanh toán",
    items: [
      { name: "Cá Hồi Nướng Sốt Cam", quantity: 1, price: 280000 },
    ],
  },
  {
    id: "ORD-12343",
    date: "2025-04-29T19:15:00",
    status: "Đang giao",
    total: 565000,
    paymentMethod: "Tiền mặt",
    paymentStatus: "Thanh toán khi giao hàng",
    items: [
      { name: "Sườn cừu nướng rosemary", quantity: 1, price: 420000 },
      { name: "Salad Ceasar", quantity: 1, price: 95000 },
      { name: "Nước Ép Trái Cây Tươi", quantity: 1, price: 50000 },
    ],
  },];
const mockReservations = [  {
    id: "RES-7890",
    date: "2025-05-20T19:00:00",
    guests: 4,
    status: "Đã xác nhận",
    tables: ["T4"],
    paymentStatus: "Đã đặt cọc",
    paymentMethod: "MasterCard",
    amount: 200000,
  },
  {
    id: "RES-7889",
    date: "2025-05-01T18:30:00",
    guests: 2,
    status: "Hoàn thành",
    tables: ["T2"],
    paymentStatus: "Đã thanh toán",
    paymentMethod: "Tiền mặt",
    amount: 580000,
  },
  {
    id: "RES-7888",
    date: "2025-04-22T20:00:00",
    guests: 6,
    status: "Hoàn thành",
    tables: ["T8", "T9"],
    paymentStatus: "Đã thanh toán",
    paymentMethod: "Visa",
    amount: 1250000,
  },
];

const getPaymentIcon = (method: string) => {
  switch (method.toLowerCase()) {
    case "visa":
    case "mastercard":
      return <CreditCard size={16} />;
    case "tiền mặt":
      return <BanknoteIcon size={16} />;
    case "atm":
      return <Wallet size={16} />;
    default:
      return <CreditCard size={16} />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "đã giao":
    case "hoàn thành":
    case "đã thanh toán":
    case "đã xác nhận":
      return <Badge status="success" text={status} />;
    case "đang giao":
    case "đã đặt cọc":
      return <Badge status="warning" text={status} />;
    case "thanh toán khi giao hàng":
      return <Badge status="processing" text={status} />;
    default:
      return <Badge status="default" text={status} />;
  }
};

const Orders = () => {
  const [activeTab, setActiveTab] = useState("food-orders");
  const [foodOrders, setFoodOrders] = useState(mockFoodOrders);
  const [reservations, setReservations] = useState(mockReservations);
  const { toast } = useToast();

  useEffect(() => {
    const oneMonthAgo = subMonths(new Date(), 1);
    const recentFoodOrders = mockFoodOrders.filter(order => isAfter(new Date(order.date), oneMonthAgo));
    const recentReservations = mockReservations.filter(reservation => isAfter(new Date(reservation.date), oneMonthAgo));
    setFoodOrders(recentFoodOrders);
    setReservations(recentReservations);
  }, []);

  const handlePrintReceipt = (id: string) => {
    toast({
      title: "Đang in hóa đơn",
      description: `Hóa đơn ${id} đang được in...`,
    });
  };

  const foodColumns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      key: "date",
      render: (value: string) => format(new Date(value), "dd/MM/yyyy HH:mm"),
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (value: number) => `${value.toLocaleString()}đ`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: getStatusBadge,
    },
    {
      title: "Thanh toán",
      key: "payment",
      render: (_: any, record: any) => (
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {getPaymentIcon(record.paymentMethod)}
          {record.paymentMethod} - {getStatusBadge(record.paymentStatus)}
        </span>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      align: "right" as const,
      render: (_: any, record: any) => (
        <Button size="small" onClick={() => handlePrintReceipt(record.id)}>
          In hóa đơn
        </Button>
      ),
    },
  ];

  const reservationColumns = [
    {
      title: "Mã đặt bàn",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
      render: (value: string) => format(new Date(value), "dd/MM/yyyy HH:mm"),
    },
    {
      title: "Số khách",
      dataIndex: "guests",
      key: "guests",
      render: (value: number) => `${value} người`,
    },
    {
      title: "Bàn",
      dataIndex: "tables",
      key: "tables",
      render: (tables: string[]) => tables.join(", "),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: getStatusBadge,
    },
    {
      title: "Thanh toán",
      key: "payment",
      render: (_: any, record: any) => (
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {getPaymentIcon(record.paymentMethod)}
          {record.paymentMethod} - {getStatusBadge(record.paymentStatus)}
        </span>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      align: "right" as const,
      render: (_: any, record: any) => (
        <Button size="small" onClick={() => handlePrintReceipt(record.id)}>
          In hóa đơn
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <div className="bg-primary/10 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Quản lý đơn hàng</h1>
            <p className="text-gray-600">Xem và quản lý đơn hàng và đặt bàn của bạn trong vòng 1 tháng qua</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Card title="Đơn hàng và đặt bàn">
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={[
                {
                  key: "food-orders",
                  label: "Đơn hàng thức ăn",
                  children: foodOrders.length > 0 ? (
                    <Table
                      dataSource={foodOrders}
                      columns={foodColumns}
                      rowKey="id"
                      pagination={false}
                      scroll={{ x: true }}
                    />
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Không có đơn hàng nào trong vòng 1 tháng qua
                    </div>
                  ),
                },
                {
                  key: "reservations",
                  label: "Đặt bàn",
                  children: reservations.length > 0 ? (
                    <Table
                      dataSource={reservations}
                      columns={reservationColumns}
                      rowKey="id"
                      pagination={false}
                      scroll={{ x: true }}
                    />
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Không có đặt bàn nào trong vòng 1 tháng qua
                    </div>
                  ),
                },
              ]}
            />
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
