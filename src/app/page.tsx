import { Navbar } from "@/components/Navbar";
import { AgeGate } from "@/components/AgeGate";
import { LegalBar } from "@/components/LegalBar";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { WhyRio } from "@/components/sections/WhyRio";
import { Process } from "@/components/sections/Process";
import { Products } from "@/components/sections/Products";
import { ProductsLight } from "@/components/sections/ProductsLight";
import { Benefits } from "@/components/sections/Benefits";
import { Testimonials } from "@/components/sections/Testimonials";
import { News } from "@/components/sections/News";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { ZaloChatButton } from "@/components/ZaloChatButton";

export default function Home() {
  return (
    <>
      <AgeGate />
      <LegalBar />
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <WhyRio />
        <Process />
        <Products />
        <ProductsLight />
        <Benefits />
        <Testimonials />
        <News />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <ZaloChatButton />
    </>
  );
}
