
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Service } from "@/types/service";

// Mock data for services - same as in the admin page
const initialServices: Service[] = [
  {
    id: "1",
    name: "Chăm sóc da cơ bản",
    description: "Làm sạch, tẩy tế bào chết và dưỡng ẩm chuyên sâu",
    price: 250000,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881"
  },
  {
    id: "2",
    name: "Trị liệu chuyên sâu",
    description: "Điều trị mụn, thâm nám và các vấn đề da khác",
    price: 450000,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c"
  },
  {
    id: "3",
    name: "Massage và thư giãn",
    description: "Massage mặt và cổ theo phương pháp truyền thống",
    price: 350000,
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1"
  }
];

const Services = () => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [filteredServices, setFilteredServices] = useState<Service[]>(services);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter services when search query changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredServices(services);
    } else {
      const filtered = services.filter(service => 
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  }, [searchQuery, services]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Dịch Vụ Của Chúng Tôi</h1>
            <p className="text-gray-600">
              Khám phá các dịch vụ chăm sóc da chuyên nghiệp được thiết kế riêng cho bạn
            </p>
          </div>

          <div className="max-w-md mx-auto mb-12 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm dịch vụ..."
              className="pl-10"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <Card key={service.id} className="overflow-hidden">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={service.image || "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881"} 
                      alt={service.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{service.name}</CardTitle>
                    <CardDescription>
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{service.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link to="/booking">Đặt lịch ngay</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-gray-500">Không tìm thấy dịch vụ nào.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
