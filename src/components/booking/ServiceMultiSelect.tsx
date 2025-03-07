
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { BookingFormValues } from "./schema";
import { SERVICES } from "./constants";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceMultiSelectProps {
  form: UseFormReturn<BookingFormValues>;
}

export const ServiceMultiSelect = ({ form }: ServiceMultiSelectProps) => {
  const selectedServices = form.watch("services") || [];

  const handleServiceToggle = (serviceId: string) => {
    const currentServices = [...selectedServices];
    const index = currentServices.indexOf(serviceId);
    
    if (index > -1) {
      currentServices.splice(index, 1);
    } else {
      currentServices.push(serviceId);
    }
    
    form.setValue("services", currentServices, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <FormField
      control={form.control}
      name="services"
      render={() => (
        <FormItem>
          <FormLabel>Dịch vụ</FormLabel>
          <FormControl>
            <Card>
              <CardContent className="p-4 grid gap-4">
                {SERVICES.map((service) => (
                  <div key={service.id} className="flex items-center space-x-3 p-2 rounded hover:bg-muted/40">
                    <Checkbox
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={() => handleServiceToggle(service.id)}
                      id={`service-${service.id}`}
                    />
                    <label
                      htmlFor={`service-${service.id}`}
                      className="flex-1 flex justify-between text-sm cursor-pointer"
                    >
                      <span>{service.name}</span>
                      <span className="font-medium">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price)}
                      </span>
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
