
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Specialist } from "@/types/service";
import { Badge } from "@/components/ui/badge";

// Match specialists data with the specialists page
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
  }
];

const Specialists = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Đội Ngũ Chuyên Viên</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Đội ngũ chuyên viên giàu kinh nghiệm của chúng tôi luôn sẵn sàng tư vấn và chăm sóc làn da của bạn với những 
            dịch vụ chất lượng cao
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {specialists.map((specialist) => (
            <Card key={specialist.id} className="text-center overflow-hidden group hover:shadow-md transition-shadow">
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={specialist.image} 
                  alt={specialist.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <Badge variant="secondary" className="self-center mb-4 hover:bg-primary hover:text-white transition-colors">
                    <Link to="/booking">Đặt lịch ngay</Link>
                  </Badge>
                </div>
              </div>
              <CardHeader className="pt-6">
                <CardTitle>{specialist.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-primary">{specialist.role}</p>
                  <p className="text-sm text-gray-500">{specialist.experience}</p>
                </div>
                <Button variant="outline" className="mt-2" asChild>
                  <Link to="/specialists">Xem chi tiết</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <Link to="/specialists">Xem tất cả chuyên viên</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Specialists;
