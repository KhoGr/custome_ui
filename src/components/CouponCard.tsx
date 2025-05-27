import { Button, Tag, message } from "antd";

type CouponProps = {
  id: string;
  title: string;
  code: string;
  discount: string;
  expiry: string;
  description: string;
  isNew?: boolean;
  isLimited?: boolean;
};

const CouponCard = ({
  id,
  title,
  code,
  discount,
  expiry,
  description,
  isNew,
  isLimited,
}: CouponProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    message.success(`Mã ${code} đã được sao chép vào clipboard`);
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      overflow: 'hidden',
      border: '1px solid #f0f0f0'
    }}>
      <div
        style={{
          background: 'linear-gradient(to right, #1677ff, #69c0ff)',
          padding: 16,
          color: 'white',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 4 }}>
          {isNew && <Tag color="green">Mới</Tag>}
          {isLimited && <Tag color="orange">Sắp hết</Tag>}
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 'bold', margin: 0 }}>{title}</h3>
        <p style={{ opacity: 0.9, margin: 0 }}>Giảm {discount}</p>
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{
            background: '#f5f5f5',
            padding: '4px 8px',
            borderRadius: 4,
            fontFamily: 'monospace',
            fontSize: 14
          }}>
            {code}
          </div>
          <Button onClick={handleCopy} size="small">
            Sao chép
          </Button>
        </div>

        <p style={{ fontSize: 14, color: '#595959', marginBottom: 12 }}>{description}</p>
        <div style={{ fontSize: 12, color: '#8c8c8c' }}>
          Hạn sử dụng: {expiry}
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
