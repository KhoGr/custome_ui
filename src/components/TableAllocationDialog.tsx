import { useState } from "react";
import { Modal, Table, Button, message, Typography } from "antd";
import { CheckCircleTwoTone, MinusCircleOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface TableOption {
  id: string;
  name: string;
  capacity: number;
  available: boolean;
}

interface TableAllocationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  guestCount: number;
  onConfirm: (selectedTables: string[]) => void;
}

const TableAllocationDialog = ({
  isOpen,
  onClose,
  guestCount,
  onConfirm,
}: TableAllocationDialogProps) => {
  const availableTables: TableOption[] = [
    { id: "T1", name: "Bàn 1", capacity: 2, available: true },
    { id: "T2", name: "Bàn 2", capacity: 2, available: true },
    { id: "T3", name: "Bàn 3", capacity: 4, available: true },
    { id: "T4", name: "Bàn 4", capacity: 4, available: true },
    { id: "T5", name: "Bàn 5", capacity: 6, available: true },
    { id: "T6", name: "Bàn 6", capacity: 8, available: true },
    { id: "T7", name: "Bàn 7", capacity: 10, available: true },
  ];

  const suitableTables = availableTables.filter(
    (table) => table.available && table.capacity >= guestCount
  );

  const optimalTables = [...suitableTables].sort(
    (a, b) => a.capacity - b.capacity
  );

  const [selectedTables, setSelectedTables] = useState<string[]>(
    optimalTables.length > 0 ? [optimalTables[0].id] : []
  );

  const toggleTable = (tableId: string) => {
    setSelectedTables((prev) =>
      prev.includes(tableId)
        ? prev.filter((id) => id !== tableId)
        : [...prev, tableId]
    );
  };

  const totalCapacity = availableTables
    .filter((table) => selectedTables.includes(table.id))
    .reduce((sum, t) => sum + t.capacity, 0);

  const minSeats = guestCount;
  const maxSeats = Math.ceil(guestCount * 1.2);
  const seatValid = totalCapacity >= minSeats && totalCapacity <= maxSeats;

  const handleConfirm = () => {
    if (!seatValid) {
      message.error(
        `Tổng số ghế phải từ ${minSeats} đến ${maxSeats}. Hiện tại là ${totalCapacity}.`
      );
      return;
    }
    onConfirm(selectedTables);
    onClose();
  };

  const columns = [
    {
      title: "Bàn",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Sức chứa",
      dataIndex: "capacity",
      key: "capacity",
      render: (capacity: number) => `${capacity} người`,
    },
    {
      title: "Chọn",
      key: "select",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: TableOption) =>
        selectedTables.includes(record.id) ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ) : (
          <MinusCircleOutlined style={{ color: "#aaa" }} />
        ),
    },
  ];

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      onOk={handleConfirm}
      title="Phân bố bàn"
      okText="Xác nhận"
      cancelText="Hủy"
      okButtonProps={{ disabled: totalCapacity < guestCount }}
    >
      <p style={{ marginBottom: 12 }}>
        Vui lòng chọn bàn cho <strong>{guestCount}</strong> khách.{" "}
        <Text type={seatValid ? "success" : "danger"}>
          Đã chọn: {totalCapacity} chỗ ngồi
        </Text>{" "}
        (Yêu cầu: {minSeats}–{maxSeats})
      </p>

      <Table
        dataSource={availableTables}
        columns={columns}
        rowKey="id"
        pagination={false}
        size="middle"
        rowClassName={(record) =>
          selectedTables.includes(record.id) ? "ant-table-row-selected" : ""
        }
        onRow={(record) => ({
          onClick: () => toggleTable(record.id),
        })}
        scroll={{ y: 240 }}
      />

      {!seatValid && (
        <Text type="danger" style={{ marginTop: 8, display: "block" }}>
          Số ghế chưa phù hợp! Hãy chọn thêm hoặc bỏ bớt bàn.
        </Text>
      )}
    </Modal>
  );
};

export default TableAllocationDialog;
