
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Calendar, Clock, Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { Specialist } from "@/types/service";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// Mock data for specialists
const specialistsList: Specialist[] = [
  {
    id: "1",
    name: "Nguyễn Thị Mai",
    role: "Chuyên gia điều trị mụn",
    experience: "10 năm kinh nghiệm",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    bio: "Chuyên gia hàng đầu về điều trị mụn với hơn 10 năm kinh nghiệm. Thạc sĩ da liễu tại Đại học Y Hà Nội, từng tu nghiệp tại Hàn Quốc và Singapore.",
    availability: ["Thứ 2", "Thứ 3", "Thứ 5", "Thứ 6"]
  },
  {
    id: "2",
    name: "Trần Văn Minh",
    role: "Bác sĩ da liễu",
    experience: "15 năm kinh nghiệm",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    bio: "Bác sĩ chuyên khoa da liễu với 15 năm kinh nghiệm. Tốt nghiệp Đại học Y Hà Nội, chuyên gia trong lĩnh vực chăm sóc và điều trị da chuyên sâu.",
    availability: ["Thứ 3", "Thứ 4", "Thứ 7", "Chủ nhật"]
  },
  {
    id: "3",
    name: "Lê Thị Hương",
    role: "Chuyên gia trị liệu",
    experience: "8 năm kinh nghiệm",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    bio: "Chuyên gia trị liệu với 8 năm kinh nghiệm. Chuyên về các phương pháp massage và trị liệu tự nhiên, kết hợp Đông và Tây y.",
    availability: ["Thứ 2", "Thứ 4", "Thứ 6", "Thứ 7"]
  },
  {
    id: "4",
    name: "Phạm Thanh Hà",
    role: "Chuyên gia chăm sóc da",
    experience: "12 năm kinh nghiệm",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    bio: "Chuyên gia hàng đầu về chăm sóc da với 12 năm kinh nghiệm. Thành thạo nhiều kỹ thuật chăm sóc da tiên tiến từ Nhật Bản và Hàn Quốc.",
    availability: ["Thứ 2", "Thứ 5", "Thứ 6", "Chủ nhật"]
  },
  {
    id: "5",
    name: "Ngô Quốc Anh",
    role: "Chuyên gia trẻ hóa da",
    experience: "9 năm kinh nghiệm",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    bio: "Chuyên gia trẻ hóa da với 9 năm kinh nghiệm. Thành thạo các kỹ thuật trẻ hóa không xâm lấn và có chứng chỉ về công nghệ trẻ hóa da từ Mỹ.",
    availability: ["Thứ 3", "Thứ 4", "Thứ 7", "Chủ nhật"]
  }
];

// Specialist roles as categories
const specialistRoles = [
  "Tất cả",
  "Bác sĩ da liễu",
  "Chuyên gia điều trị mụn",
  "Chuyên gia trị liệu", 
  "Chuyên gia chăm sóc da",
  "Chuyên gia trẻ hóa da"
];

const Specialists = () => {
  const [specialists, setSpecialists] = useState<Specialist[]>(specialistsList);
  const [filteredSpecialists, setFilteredSpecialists] = useState<Specialist[]>(specialists);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("Tất cả");
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    let filtered = specialists;
    
    if (query.trim()) {
      filtered = filtered.filter(specialist => 
        specialist.name.toLowerCase().includes(query.toLowerCase()) ||
        specialist.role.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (selectedRole !== "Tất cả") {
      filtered = filtered.filter(specialist => specialist.role === selectedRole);
    }
    
    setFilteredSpecialists(filtered);
  };

  // Handle role filter
  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    
    let filtered = specialists;
    
    if (searchQuery.trim()) {
      filtered = filtered.filter(specialist => 
        specialist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        specialist.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (role !== "Tất cả") {
      filtered = filtered.filter(specialist => specialist.role === role);
    }
    
    setFilteredSpecialists(filtered);
  };

  // Open specialist detail
  const openSpecialistDetail = (specialist: Specialist) => {
    setSelectedSpecialist(specialist);
    setIsDetailOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Đội Ngũ Chuyên Viên</h1>
            <p className="text-gray-600">
              Gặp gỡ đội ngũ chuyên viên giàu kinh nghiệm của chúng tôi, những người sẽ chăm sóc làn da của bạn
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm chuyên viên..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
            
            <Tabs value={selectedRole} onValueChange={handleRoleChange} className="w-full mb-8">
              <TabsList className="w-full h-auto flex flex-wrap">
                {specialistRoles.map(role => (
                  <TabsTrigger key={role} value={role} className="flex-1">
                    {role}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSpecialists.length > 0 ? (
              filteredSpecialists.map((specialist) => (
                <Card key={specialist.id} className="overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={specialist.image}
                      alt={specialist.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-white font-semibold">{specialist.name}</h3>
                      <p className="text-white/80 text-sm">{specialist.role}</p>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{specialist.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <span className="font-medium text-primary">{specialist.role}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{specialist.experience}</span>
                    </div>
                    <p className="line-clamp-2 text-gray-600">
                      {specialist.bio || "Chuyên viên giàu kinh nghiệm, luôn tận tâm với khách hàng."}
                    </p>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => openSpecialistDetail(specialist)}>
                      Xem chi tiết
                    </Button>
                    <Button className="flex-1" asChild>
                      <Link to="/booking">Đặt lịch</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-gray-500">Không tìm thấy chuyên viên nào.</p>
                <Button variant="outline" className="mt-4" onClick={() => {
                  setSearchQuery("");
                  setSelectedRole("Tất cả");
                  setFilteredSpecialists(specialists);
                }}>
                  Xóa bộ lọc
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Specialist Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedSpecialist && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedSpecialist.name}</DialogTitle>
                <DialogDescription>{selectedSpecialist.role}</DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                <div className="col-span-1">
                  <img 
                    src={selectedSpecialist.image} 
                    alt={selectedSpecialist.name}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="col-span-2 space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Kinh nghiệm</h4>
                    <p className="text-sm">{selectedSpecialist.experience}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Tiểu sử</h4>
                    <p className="text-sm">{selectedSpecialist.bio}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Lịch làm việc</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSpecialist.availability?.map((day) => (
                        <span key={day} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button asChild>
                  <Link to="/booking">Đặt lịch với chuyên viên này</Link>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Specialists;
