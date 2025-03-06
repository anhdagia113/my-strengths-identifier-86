
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SPECIALISTS } from "./constants";
import { UseFormReturn } from "react-hook-form";
import { BookingFormValues } from "./schema";

interface SpecialistSelectProps {
  form: UseFormReturn<BookingFormValues>;
}

export const SpecialistSelect = ({ form }: SpecialistSelectProps) => {
  return (
    <FormField
      control={form.control}
      name="specialist"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Chuyên viên</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Chọn chuyên viên" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {SPECIALISTS.map((specialist) => (
                <SelectItem key={specialist.id} value={specialist.id}>
                  {specialist.name}
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
