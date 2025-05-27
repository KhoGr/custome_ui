import { useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Modal,
  Tag,
  message,
} from "antd";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { toast } from "sonner";

const { Option } = Select;

const formSchema = z.object({
  name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự" }),
  phone: z.string().min(10, { message: "Số điện thoại không hợp lệ" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  date: z.date({ required_error: "Vui lòng chọn ngày" }),
  time: z.string({ required_error: "Vui lòng chọn giờ" }),
  guests: z.string({ required_error: "Vui lòng chọn số khách" }),
  notes: z.string().optional(),
  tables: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof formSchema>;

const timeSlots = [
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
];
const guestOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

const allTables = [
  { id: "T1", name: "Bàn 1", seats: 2 },
  { id: "T2", name: "Bàn 2", seats: 4 },
  { id: "T3", name: "Bàn 3", seats: 6 },
  { id: "T4", name: "Bàn 4", seats: 2 },
  { id: "T5", name: "Bàn 5", seats: 4 },
  { id: "T6", name: "Bàn 6", seats: 8 },
];

const ReservationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTableDialog, setShowTableDialog] = useState(false);
  const [currentGuestCount, setCurrentGuestCount] = useState<number>(0);

  const { handleSubmit, control, setValue, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      notes: "",
      guests: "",
      time: "",
      tables: [],
    },
  });
  const [selectedTables, setSelectedTables] = useState([]);
  const [totalSeats, setTotalSeats] = useState(0);
  const [guestCount, setGuestCount] = useState(0);

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));

    toast.success("Đặt bàn thành công!", {
      description:
        `Đã đặt bàn cho ${values.guests} khách vào lúc ${
          values.time
        }, ngày ${format(values.date, "dd/MM/yyyy")}` +
        `${
          values.tables?.length ? `, đã chọn ${values.tables.length} bàn` : ""
        }`,
    });

    reset();
    setIsSubmitting(false);
  };

  const handleGuestChange = (value: string) => {
    setValue("guests", value);
    const guestCount = parseInt(value.replace("+", ""), 10);
    setCurrentGuestCount(guestCount);
    setShowTableDialog(true);
  };

  const handleTableSelection = (tables: string[]) => {
    setValue("tables", tables);
    setShowTableDialog(false);
  };

  // const selectedTables = watch("tables") || [];
  const [tempSelectedTables, setTempSelectedTables] = useState<string[]>([]);

  // Toggle chọn bàn
  const toggleTable = (tableId: string) => {
    setTempSelectedTables((prev) =>
      prev.includes(tableId)
        ? prev.filter((id) => id !== tableId)
        : [...prev, tableId]
    );
  };

  // Tính tổng số ghế đã chọn và kiểm tra hợp lệ
  const totalSelectedSeats = allTables
    .filter((t) => tempSelectedTables.includes(t.id))
    .reduce((sum, t) => sum + t.seats, 0);

  const seatValid =
    totalSelectedSeats >= currentGuestCount &&
    totalSelectedSeats <= Math.ceil(currentGuestCount * 1.2);

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Form.Item label="Họ tên">
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <>
              <Input {...field} placeholder="Nhập họ tên của bạn" />
              {fieldState.error && (
                <div className="text-red-500 text-xs">
                  {fieldState.error.message}
                </div>
              )}
            </>
          )}
        />
      </Form.Item>

      <Form.Item label="Số điện thoại">
        <Controller
          control={control}
          name="phone"
          render={({ field, fieldState }) => (
            <>
              <Input {...field} placeholder="Nhập số điện thoại" />
              {fieldState.error && (
                <div className="text-red-500 text-xs">
                  {fieldState.error.message}
                </div>
              )}
            </>
          )}
        />
      </Form.Item>

      <Form.Item label="Email">
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <>
              <Input {...field} placeholder="Nhập email của bạn" />
              {fieldState.error && (
                <div className="text-red-500 text-xs">
                  {fieldState.error.message}
                </div>
              )}
            </>
          )}
        />
      </Form.Item>

      <Form.Item label="Số khách">
        <Controller
          control={control}
          name="guests"
          render={({ field, fieldState }) => (
            <>
              <Select
                {...field}
                placeholder="Chọn số người"
                onChange={handleGuestChange}
              >
                {guestOptions.map((g) => (
                  <Option key={g} value={g}>
                    {g === "10+" ? "10+ người" : `${g} người`}
                  </Option>
                ))}
              </Select>
              {fieldState.error && (
                <div className="text-red-500 text-xs">
                  {fieldState.error.message}
                </div>
              )}
            </>
          )}
        />
      </Form.Item>

      <Form.Item label="Ngày">
        <Controller
          control={control}
          name="date"
          render={({ field, fieldState }) => (
            <>
              <DatePicker
                {...field}
                format="DD/MM/YYYY"
                style={{ width: "100%" }}
                onChange={(date) => field.onChange(date ?? undefined)}
              />
              {fieldState.error && (
                <div className="text-red-500 text-xs">
                  {fieldState.error.message}
                </div>
              )}
            </>
          )}
        />
      </Form.Item>

      <Form.Item label="Giờ">
        <Controller
          control={control}
          name="time"
          render={({ field, fieldState }) => (
            <>
              <Select {...field} placeholder="Chọn giờ">
                {timeSlots.map((t) => (
                  <Option key={t} value={t}>
                    {t}
                  </Option>
                ))}
              </Select>
              {fieldState.error && (
                <div className="text-red-500 text-xs">
                  {fieldState.error.message}
                </div>
              )}
            </>
          )}
        />
      </Form.Item>

      <Form.Item label="Bàn đã chọn">
        <div className="flex justify-between mb-2">
          <Button size="small" onClick={() => setShowTableDialog(true)}>
            Chọn bàn
          </Button>
        </div>
        <div className="min-h-[40px] border p-2 rounded">
          {selectedTables.length > 0 ? (
            selectedTables.map((table) => (
              <Tag key={table} color="blue">
                Bàn {table.replace("T", "")}
              </Tag>
            ))
          ) : (
            <span className="text-gray-500 text-sm">Chưa chọn bàn</span>
          )}
        </div>
      </Form.Item>

      <Form.Item label="Ghi chú">
        <Controller
          control={control}
          name="notes"
          render={({ field }) => (
            <Input.TextArea
              rows={3}
              {...field}
              placeholder="Ghi chú thêm (nếu có)"
            />
          )}
        />
      </Form.Item>

      <Button type="primary" htmlType="submit" block loading={isSubmitting}>
        {isSubmitting ? "Đang xử lý..." : "Đặt bàn"}
      </Button>

      <Modal
        title="Chọn bàn phù hợp"
        open={showTableDialog}
        onCancel={() => setShowTableDialog(false)}
        onOk={() => {
          if (!seatValid) {
            message.error("Tổng số ghế chưa phù hợp với số khách!");
            return;
          }
          setSelectedTables(tempSelectedTables);
          setValue("tables", tempSelectedTables);
          setShowTableDialog(false);
        }}
      >
        <>
          <p className="mb-2 font-medium">
            Chọn bàn cho <strong>{currentGuestCount}</strong> khách: Tổng số ghế
            nên từ <strong>{currentGuestCount}</strong> đến{" "}
            <strong>{Math.ceil(currentGuestCount * 1.2)}</strong>
          </p>

          <div className="grid grid-cols-3 gap-4 mb-4">
            {allTables.map((table) => {
              const selected = tempSelectedTables.includes(table.id);
              return (
                <div
                  key={table.id}
                  className={`border p-4 rounded cursor-pointer text-center ${
                    selected
                      ? "bg-blue-100 border-blue-500"
                      : "hover:border-blue-300"
                  }`}
                  onClick={() => toggleTable(table.id)}
                >
                  <div className="font-medium">{table.name}</div>
                  <div className="text-sm text-gray-500">{table.seats} ghế</div>
                </div>
              );
            })}
          </div>

          <p className="text-sm">
            Tổng ghế đã chọn: <strong>{totalSelectedSeats}</strong>{" "}
            {seatValid ? (
              <span className="text-green-600">(Hợp lệ)</span>
            ) : (
              <span className="text-red-600">(Không hợp lệ)</span>
            )}
          </p>
        </>
      </Modal>
    </Form>
  );
};

export default ReservationForm;
