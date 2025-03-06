
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Chăm sóc da cơ bản",
    description: "Làm sạch, tẩy tế bào chết và dưỡng ẩm chuyên sâu",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881"
  },
  {
    title: "Trị liệu chuyên sâu",
    description: "Điều trị mụn, thâm nám và các vấn đề da khác",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c"
  },
  {
    title: "Massage và thư giãn",
    description: "Massage mặt và cổ theo phương pháp truyền thống",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1"
  }
];

const Services = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Dịch Vụ Của Chúng Tôi</h2>
          <p className="text-gray-600">Khám phá các dịch vụ chăm sóc da chuyên nghiệp</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title}>
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link to="/services">Xem chi tiết</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
