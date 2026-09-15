import About from "@/components/About";
import Contact from "@/components/Contact";
import FAQ from "@/components/Faq";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import RequestQuote from "@/components/Requestquote";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/Whychooseus";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Process />
      <RequestQuote />
      <FAQ />
      <Contact />
    </>
  );
}
