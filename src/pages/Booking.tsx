
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookingForm from "@/components/booking/BookingForm";
import BookingSummary from "@/components/booking/BookingSummary";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Booking = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Đặt Lịch Dịch Vụ</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Thông Tin Đặt Lịch</CardTitle>
              </CardHeader>
              <CardContent>
                <BookingForm />
              </CardContent>
            </Card>
          </div>
          <div>
            <BookingSummary />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;
