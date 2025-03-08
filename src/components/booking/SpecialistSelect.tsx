
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { BookingFormValues } from "./schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Specialist } from "@/types/service";

// Updated specialists list that matches the one in Specialists.tsx
const specialists: Specialist[] = [
  {
    id: "1",
    name: "Nguyễn Thị Mai",
    role: "Chuyên gia điều trị mụn",
    experience: "10 năm kinh nghiệm",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
  },
  {
    id: "2",
    name: "Trần Văn Minh",
    role: "Bác sĩ da liễu",
    experience: "15 năm kinh nghiệm",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: "3",
    name: "Lê Thị Hương",
    role: "Chuyên gia trị liệu",
    experience: "8 năm kinh nghiệm",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
    id: "4",
    name: "Phạm Thanh Hà",
    role: "Chuyên gia chăm sóc da",
    experience: "12 năm kinh nghiệm",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
  },
  {
    id: "5",
    name: "Ngô Quốc Anh",
    role: "Chuyên gia trẻ hóa da",
    experience: "9 năm kinh nghiệm",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
  }
];

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
              {specialists.map((specialist) => (
                <SelectItem key={specialist.id} value={specialist.id} className="py-2">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={specialist.image} alt={specialist.name} />
                      <AvatarFallback>{specialist.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{specialist.name}</div>
                      <div className="text-xs text-muted-foreground">{specialist.role}</div>
                    </div>
                  </div>
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
