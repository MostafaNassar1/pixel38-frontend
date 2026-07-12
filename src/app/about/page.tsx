import Header from "../components/layout/Header";
import AboutUs from "../components/sections/AboutUs";
import Gallery from "../components/sections/Gallery";
import ContactForm from "../components/sections/ContactForm";
import Footer from "../components/layout/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="mt-10">
        <AboutUs />
      </div>
      <Gallery />
      <ContactForm />
      <Footer />
    </>
  );
}