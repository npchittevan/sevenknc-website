"use client";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import About from "./components/About";
import Products from "./components/Products";
import Gallery from "./components/Gallery";
import Industries from "./components/Industries";
import Quality from "./components/Quality";
import Packaging from "./components/Packaging";
import WhyChooseUs from "./components/WhyChooseUs";
import Process from "./components/Process";
import VideoSection from "./components/VideoSection";
import BuyerRequirement from "./components/BuyerRequirement";
import QuoteForm from "./components/QuoteForm";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

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
