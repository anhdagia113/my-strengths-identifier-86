
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
      name="services"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Dịch vụ</FormLabel>
          <Select 
            onValueChange={(value) => field.onChange([value])} 
            value={Array.isArray(field.value) && field.value.length > 0 ? field.value[0] : ""}
          >
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
