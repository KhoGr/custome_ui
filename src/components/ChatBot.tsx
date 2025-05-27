import { useState, useRef, useEffect } from 'react';
import { Button, Drawer, Input, Space } from 'antd';
import {
  RobotOutlined,
  CloseOutlined,
  SendOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;

type Message = {
  id: number;
  text: string;
  isBot: boolean;
};

const initialMessages: Message[] = [
  { id: 1, text: "Xin chào! Tôi là trợ lý AI Délice. Tôi có thể giúp gì cho bạn về nhà hàng của chúng tôi?", isBot: true },
];

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessageId = messages.length + 1;
    setMessages(prev => [...prev, { id: userMessageId, text: input, isBot: false }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const userInput = input.toLowerCase();
      let botResponse = '';

      if (userInput.includes('menu') || userInput.includes('món ăn') || userInput.includes('thực đơn')) {
        botResponse = 'Nhà hàng Délice có nhiều món ăn phong phú. Bạn có thể xem thực đơn đầy đủ ở mục "Thực đơn" hoặc cho tôi biết bạn thích ẩm thực nào?';
      } else if (userInput.includes('đặt bàn') || userInput.includes('reservation')) {
        botResponse = 'Để đặt bàn, bạn có thể vào mục "Đặt bàn" hoặc cho tôi biết thời gian và số lượng khách để tôi hỗ trợ bạn.';
      } else if (userInput.includes('giờ') || userInput.includes('mở cửa') || userInput.includes('thời gian')) {
        botResponse = 'Nhà hàng Délice mở cửa từ 10:00 sáng đến 22:00 tối mỗi ngày. Bạn có thể đặt bàn trước để có trải nghiệm tốt nhất.';
      } else if (userInput.includes('địa chỉ') || userInput.includes('đường') || userInput.includes('ở đâu')) {
        botResponse = 'Nhà hàng Délice tọa lạc tại 123 Đường Ẩm Thực, Quận 1, TP.HCM. Bạn có thể dễ dàng tìm thấy chúng tôi trên Google Maps.';
      } else if (userInput.includes('khuyến mãi') || userInput.includes('giảm giá') || userInput.includes('coupon')) {
        botResponse = 'Hiện tại chúng tôi có chương trình khuyến mãi giảm 20% cho thành viên mới và đặc biệt giảm 10% cho tất cả hóa đơn vào thứ Ba hàng tuần. Bạn có thể xem thêm ở mục "Khuyến mãi".';
      } else {
        botResponse = 'Cảm ơn bạn đã liên hệ. Tôi có thể giúp bạn về thực đơn, đặt bàn, giờ mở cửa, địa chỉ hoặc chương trình khuyến mãi của nhà hàng Délice. Bạn cần hỗ trợ thông tin nào?';
      }

      setMessages(prev => [...prev, { id: userMessageId + 1, text: botResponse, isBot: true }]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        type="primary"
        shape="circle"
        icon={<RobotOutlined />}
        size="large"
        onClick={() => setIsOpen(true)}
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
      />
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={
          <Space>
            <RobotOutlined />
            <span>Trợ lý Délice</span>
          </Space>
        }
        placement="bottom"
        height="70vh"
        closeIcon={<CloseOutlined />}
      >
        <div className="flex flex-col overflow-y-auto mb-4" style={{ height: 'calc(70vh - 130px)' }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[80%] mb-4 p-3 rounded-lg ${
                msg.isBot
                  ? 'bg-gray-100 text-gray-800 self-start rounded-tl-none'
                  : 'bg-blue-500 text-white self-end rounded-br-none'
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="max-w-[80%] mb-4 p-4 bg-gray-100 text-gray-800 self-start rounded-lg rounded-tl-none">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-150"></div>
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-300"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex gap-2">
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Nhập tin nhắn của bạn..."
            autoSize={{ minRows: 1, maxRows: 4 }}
          />
          <Button type="primary" icon={<SendOutlined />} onClick={handleSend} />
        </div>
      </Drawer>
    </div>
  );
};

export default ChatBot;
