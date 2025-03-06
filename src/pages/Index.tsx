
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Specialists from "@/components/home/Specialists";
import FeaturedBlogs from "@/components/home/FeaturedBlogs";
import SkinQuiz from "@/components/home/SkinQuiz";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Specialists />
      <SkinQuiz />
      <FeaturedBlogs />
      <Footer />
    </div>
  );
};

export default Index;
