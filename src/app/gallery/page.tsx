import Header from "../components/layout/Header";
import Gallery from "../components/sections/Gallery";
import WoodTypes from "../components/sections/WoodTypes";
import ContactForm from "../components/sections/ContactForm";
import Footer from "../components/layout/Footer";

export default function GalleryPage() {
  return (
    <>
      <Header />
      <div className="mt-10">
        <Gallery />
      </div>
      <WoodTypes/>
      <ContactForm />
      <Footer />
    </>
  );
}