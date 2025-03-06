
import { useState, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingData } from "@/pages/Booking";
import { bookingFormSchema, type BookingFormValues } from "./schema";
import { ServiceSelect } from "./ServiceSelect";
import { SpecialistSelect } from "./SpecialistSelect";
import { DateTimeSelect } from "./DateTimeSelect";
import { CustomerInfo } from "./CustomerInfo";
import { SERVICES, SPECIALISTS } from "./constants";

interface BookingFormProps {
  onFormUpdate: (data: BookingData) => void;
  onBookingComplete: () => void;
}

const BookingForm = ({ onFormUpdate, onBookingComplete }: BookingFormProps) => {
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    }
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      const serviceId = value.service;
      const specialistId = value.specialist;

      const bookingData: BookingData = {
        service: serviceId ? SERVICES.find(s => s.id === serviceId) : undefined,
        specialist: specialistId ? SPECIALISTS.find(s => s.id === specialistId) : undefined,
        date: value.date,
        time: value.time,
        customerName: value.name,
        customerPhone: value.phone,
        customerEmail: value.email,
      };

      onFormUpdate(bookingData);
    });

    return () => subscription.unsubscribe();
  }, [form.watch, onFormUpdate]);

  const onSubmit = (values: BookingFormValues) => {
    console.log(values);
    onBookingComplete();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ServiceSelect form={form} />
        <SpecialistSelect form={form} />
        <DateTimeSelect form={form} />
        <CustomerInfo form={form} />
        <Button type="submit" className="w-full">
          Đặt lịch
        </Button>
      </form>
    </Form>
  );
};

export default BookingForm;
