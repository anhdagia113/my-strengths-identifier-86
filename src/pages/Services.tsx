
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
import { Search, Clock, Filter } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Service } from "@/types/service";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

// Same initial services as in the admin page
const initialServices: Service[] = [
  {
    id: "1",
    name: "Chăm sóc da cơ bản",
    description: "Làm sạch, tẩy tế bào chết và dưỡng ẩm chuyên sâu",
    price: 250000,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881",
    duration: 60,
    category: "Chăm sóc da"
  },
  {
    id: "2",
    name: "Trị liệu chuyên sâu",
    description: "Điều trị mụn, thâm nám và các vấn đề da khác",
    price: 450000,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c",
    duration: 90,
    category: "Điều trị"
  },
  {
    id: "3",
    name: "Massage và thư giãn",
    description: "Massage mặt và cổ theo phương pháp truyền thống",
    price: 350000,
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1",
    duration: 45,
    category: "Thư giãn"
  },
  {
    id: "4",
    name: "Trẻ hóa da",
    description: "Sử dụng công nghệ hiện đại giúp làn da trẻ trung hơn",
    price: 650000,
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702",
    duration: 120,
    category: "Trẻ hóa"
  },
  {
    id: "5",
    name: "Điều trị mụn chuyên sâu",
    description: "Sử dụng phương pháp chuyên biệt để điều trị các loại mụn cứng đầu",
    price: 550000,
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9",
    duration: 75,
    category: "Điều trị"
  },
  {
    id: "6",
    name: "Tẩy tế bào chết toàn thân",
    description: "Giúp làn da mịn màng, săn chắc và khỏe mạnh hơn",
    price: 450000,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15",
    duration: 90,
    category: "Chăm sóc da"
  }
];

// Categories for services - same as in admin page
const serviceCategories = [
  "Chăm sóc da",
  "Điều trị",
  "Thư giãn",
  "Trẻ hóa",
  "Làm đẹp",
  "Khác"
];

const Services = () => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [filteredServices, setFilteredServices] = useState<Service[]>(services);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<string>("default");

  // Filter and sort services
  useEffect(() => {
    let result = [...services];
    
    // Filter by search
    if (searchQuery.trim()) {
      result = result.filter(service => 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter(service => 
        service.category === activeCategory
      );
    }
    
    // Sort services
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "duration-asc") {
      result.sort((a, b) => (a.duration || 0) - (b.duration || 0));
    } else if (sortBy === "duration-desc") {
      result.sort((a, b) => (b.duration || 0) - (a.duration || 0));
    }
    
    setFilteredServices(result);
  }, [searchQuery, services, activeCategory, sortBy]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Dịch Vụ Của Chúng Tôi</h1>
            <p className="text-gray-600">
              Khám phá các dịch vụ chăm sóc da chuyên nghiệp được thiết kế riêng cho làn da của bạn
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm dịch vụ..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
              <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
                <TabsList className="w-full h-auto flex flex-wrap">
                  <TabsTrigger value="all" className="flex-1">Tất cả</TabsTrigger>
                  {serviceCategories.map(category => (
                    <TabsTrigger key={category} value={category} className="flex-1">
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex justify-end mb-6">
              <div className="w-full sm:w-64">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Sắp xếp" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Mặc định</SelectItem>
                    <SelectItem value="price-asc">Giá: Thấp đến cao</SelectItem>
                    <SelectItem value="price-desc">Giá: Cao đến thấp</SelectItem>
                    <SelectItem value="duration-asc">Thời gian: Ngắn đến dài</SelectItem>
                    <SelectItem value="duration-desc">Thời gian: Dài đến ngắn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <Card key={service.id} className="overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={service.image || "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881"} 
                      alt={service.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    {service.category && (
                      <div className="absolute top-4 right-4 bg-primary/90 text-white text-xs px-2 py-1 rounded-full">
                        {service.category}
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                      <span>{service.name}</span>
                    </CardTitle>
                    <CardDescription className="flex justify-between items-center">
                      <span className="font-semibold text-primary">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.price)}
                      </span>
                      {service.duration && (
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{service.duration} phút</span>
                        </div>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{service.description}</p>
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
                <Button variant="outline" className="mt-4" onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}>
                  Xóa bộ lọc
                </Button>
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
