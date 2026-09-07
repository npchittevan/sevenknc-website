import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import TrustBar from "./components/TrustBar.jsx";
import About from "./components/About.jsx";
import Products from "./components/Products.jsx";
import Gallery from "./components/Gallery.jsx";
import Industries from "./components/Industries.jsx";
import Quality from "./components/Quality.jsx";
import Packaging from "./components/Packaging.jsx";
import WhyChooseUs from "./components/WhyChooseUs.jsx";
import Process from "./components/Process.jsx";
import VideoSection from "./components/VideoSection.jsx";
import BuyerRequirement from "./components/BuyerRequirement.jsx";
import QuoteForm from "./components/QuoteForm.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Products />
        <Gallery />
        <Industries />
        <Quality />
        <Packaging />
        <WhyChooseUs />
        <Process />
        <VideoSection />
        <BuyerRequirement />
        <QuoteForm />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
