import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import AboutUs from "./components/sections/AboutUs";
import Advantages from "./components/sections/Advantages";
import ContactForm from "./components/sections/ContactForm";
import Gallery from "./components/sections/Gallery";
import Hero from "./components/sections/Hero";
import WoodTypes from "./components/sections/WoodTypes";

export default function Home() {
  return (
    <>
      <div className="relative bg-[url('/hero/wood-bg.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-background/60" />
        <div className="relative z-10">
      <Header transparent />
      <Hero />
      </div>
      </div>
      <WoodTypes/>
      <Gallery />
      <Advantages />
      <AboutUs />
      <ContactForm />
      <Footer />
    </>
  );
}