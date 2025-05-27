import React from 'react';
import { Card, Progress, Tag } from 'antd';
import { Star, Gift, Truck } from 'lucide-react';
import { useVip } from '../context/VipContext';

const VipStatusCard = () => {
  const { vipStatus, getTierColor } = useVip();

  const progressToNextTier = vipStatus.nextTierPoints === Infinity
    ? 100
    : (vipStatus.totalSpent / vipStatus.nextTierPoints) * 100;

  const tierIcons = {
    Bronze: '🥉',
    Silver: '🥈',
    Gold: '🥇',
    Platinum: '💎',
    Diamond: '👑',
  };

  return (
    <Card style={{ width: '100%' }} title={
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 24 }}>{tierIcons[vipStatus.tier]}</span>
          <span>Hạng VIP của bạn</span>
        </div>
        <Tag color={getTierColor(vipStatus.tier)} style={{ fontSize: 16, padding: '4px 12px', marginTop: 8 }}>
          {vipStatus.tier}
        </Tag>
      </div>
    }>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, textAlign: 'center', marginBottom: 24 }}>
        <div>
          <p style={{ color: '#888' }}>Điểm tích lũy</p>
          <p style={{ fontSize: 24, fontWeight: 600, color: '#1677ff' }}>{vipStatus.points.toLocaleString()}</p>
        </div>
        <div>
          <p style={{ color: '#888' }}>Tổng chi tiêu</p>
          <p style={{ fontSize: 24, fontWeight: 600, color: '#16a34a' }}>{vipStatus.totalSpent.toLocaleString()}đ</p>
        </div>
      </div>

      {vipStatus.nextTierPoints !== Infinity && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>Tiến độ lên hạng tiếp theo</span>
            <span>{Math.round(progressToNextTier)}%</span>
          </div>
          <Progress percent={Math.round(progressToNextTier)} showInfo={false} strokeColor="#1677ff" />
          <p style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
            Còn {(vipStatus.nextTierPoints - vipStatus.totalSpent).toLocaleString()}đ để lên hạng tiếp theo
          </p>
        </div>
      )}

      <div style={{ marginBottom: 24 }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
          <Gift size={16} />
          Ưu đãi hiện tại
        </h4>
        <ul style={{ marginTop: 8, paddingLeft: 16 }}>
          {vipStatus.specialOffers.map((offer, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
              <Star size={12} color="#facc15" />
              <span>{offer}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ backgroundColor: '#e6f4ff', padding: 12, borderRadius: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Truck size={16} />
          <span style={{ fontWeight: 500 }}>Miễn phí ship</span>
        </div>
        <p style={{ fontSize: 14 }}>
          {vipStatus.freeShippingThreshold === 0
            ? 'Tất cả đơn hàng'
            : `Đơn hàng từ ${vipStatus.freeShippingThreshold.toLocaleString()}đ`}
        </p>
      </div>
    </Card>
  );
};

export default VipStatusCard;
