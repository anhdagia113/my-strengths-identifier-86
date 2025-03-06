
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SERVICES } from "./constants";
import { UseFormReturn } from "react-hook-form";
import { BookingFormValues } from "./schema";

interface ServiceSelectProps {
  form: UseFormReturn<BookingFormValues>;
}

export const ServiceSelect = ({ form }: ServiceSelectProps) => {
  return (
    <FormField
      control={form.control}
      name="service"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Dịch vụ</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Chọn dịch vụ" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {SERVICES.map((service) => (
                <SelectItem key={service.id} value={service.id}>
                  {service.name} - {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
