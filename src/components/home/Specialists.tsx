
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const specialists = [
  {
    name: "Nguyễn Thị Mai",
    role: "Chuyên gia điều trị mụn",
    experience: "10 năm kinh nghiệm",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
  },
  {
    name: "Trần Văn Minh",
    role: "Bác sĩ da liễu",
    experience: "15 năm kinh nghiệm",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  },
  {
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
            <Card key={specialist.name} className="text-center overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={specialist.image} 
                  alt={specialist.name}
                  className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
                />
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
          <Button size="lg" asChild>
            <Link to="/specialists">Xem tất cả chuyên viên</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Specialists;
