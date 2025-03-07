
import * as z from "zod";

export const bookingFormSchema = z.object({
  services: z.array(z.string()).min(1, "Vui lòng chọn ít nhất một dịch vụ"),
  specialist: z.string().min(1, "Vui lòng chọn chuyên viên"),
  date: z.date({
    required_error: "Vui lòng chọn ngày",
  }),
  time: z.string().min(1, "Vui lòng chọn giờ"),
  name: z.string().min(2, "Vui lòng nhập tên"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;
