import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValueSection from "@/components/ValueSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import EntertainmentSection from "@/components/EntertainmentSection";
import ProductCatalog from "@/components/ProductCatalog";
import HowItWorks from "@/components/HowItWorks";
import ShowroomSection from "@/components/ShowroomSection";
import WarrantySection from "@/components/WarrantySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCTA from "@/components/FinalCTA";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <CartDrawer />
      <HeroSection />
      <ValueSection />
      <FeaturedProducts />
      <EntertainmentSection />
      <ProductCatalog />
      <HowItWorks />
      <ShowroomSection />
      <WarrantySection />
      <TestimonialsSection />
      <FinalCTA />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
