import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Menu, Sparkles, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

// Reusable smooth fade-in component
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={{
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Parallax setup for the About section image block
  const aboutRef = useRef(null);
  const { scrollYProgress: aboutScroll } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });
  const aboutParallax = useTransform(aboutScroll, [0, 1], ["-15%", "15%"]);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const easePremium = [0.16, 1, 0.3, 1];
  const titleLines = ["Spojrzenie", "na nowo."];

  return (
    <div className="min-h-screen bg-aura-cream text-aura-graphite font-sans selection:bg-aura-gold-champagne selection:text-white">
      
      {/* Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-aura-gold-champagne z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex items-center justify-between px-6 md:px-12 ${
          isScrolled ? 'py-4 bg-aura-cream/80 backdrop-blur-xl border-b border-aura-beige shadow-sm' : 'py-6 bg-transparent border-transparent'
        }`}
      >
         <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, ease: easePremium }}
           className="text-xl font-extrabold tracking-tight text-aura-green-bottle uppercase"
         >
           Aura Eyes
         </motion.div>
         <nav className="hidden md:flex gap-10 text-sm font-bold tracking-widest uppercase text-aura-graphite">
           {['Usługi', 'O nas', 'Kontakt'].map((item, i) => (
             <motion.a 
               key={item}
               href={`#${item.toLowerCase().replace(' ', '-')}`}
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.1 + (i * 0.1), ease: easePremium }}
               className="relative group overflow-hidden py-1"
             >
               <span className="group-hover:text-aura-gold-champagne transition-colors duration-300">{item}</span>
               <span className="absolute bottom-0 left-0 w-full h-[2px] bg-aura-gold-champagne transform scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500 ease-out"></span>
             </motion.a>
           ))}
         </nav>
         <button className="md:hidden text-aura-graphite">
           <Menu className="w-6 h-6" />
         </button>
      </header>

      <main>
        {/* Hero Section */}
        <section className="px-6 pt-32 pb-20 md:pt-40 md:px-12 max-w-[1600px] mx-auto min-h-[90vh] flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            <div className="lg:col-span-7 flex flex-col gap-10">
              <h1 className="text-[14vw] lg:text-[7.5rem] leading-[0.9] font-extrabold text-aura-green-bottle tracking-tighter">
                {titleLines.map((line, i) => (
                  <div key={i} className="overflow-hidden py-2">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1.2, delay: i * 0.15, ease: easePremium }}
                      className={i === 1 ? "text-aura-gold-champagne" : ""}
                    >
                      {line}
                    </motion.div>
                  </div>
                ))}
              </h1>
              
              <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center mt-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: easePremium }}
                >
                  <a href="#kontakt" className="group relative overflow-hidden inline-flex items-center gap-3 bg-aura-green-bottle text-aura-cream px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest transition-all hover:shadow-xl hover:shadow-aura-green-bottle/20">
                    <span className="relative z-10">Umów wizytę</span>
                    <ArrowUpRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-aura-green-night transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[0.16,1,0.3,1] z-0"></div>
                  </a>
                </motion.div>
                
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: easePremium }}
                  className="text-lg md:text-xl text-aura-gray font-medium max-w-xs leading-relaxed border-l-2 border-aura-gold-champagne/30 pl-6"
                >
                  Wydobywamy naturalne piękno w nowoczesnym studio.
                </motion.p>
              </div>
            </div>

            {/* Hero Visual Block */}
            <div className="lg:col-span-5 h-[50vh] lg:h-[70vh] w-full mt-8 lg:mt-0 overflow-hidden rounded-[2rem] relative bg-aura-sand">
              <motion.div 
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.2, ease: easePremium }}
                className="absolute inset-0 bg-aura-oak-dark mix-blend-multiply"
              >
                {/* Subtle gradient overlay to simulate lighting */}
                <div className="absolute inset-0 bg-gradient-to-tr from-aura-green-night/40 to-transparent"></div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* Marquee Features */}
        <div className="border-y border-aura-beige bg-aura-cream overflow-hidden py-5 flex">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            className="flex whitespace-nowrap gap-16 items-center text-aura-graphite font-bold tracking-widest uppercase text-sm w-max"
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-16">
                <span className="flex items-center gap-3"><Sparkles className="w-5 h-5 text-aura-gold-champagne"/> Produkty Premium</span>
                <span className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-aura-gold-champagne"/> Certyfikowani Eksperci</span>
                <span className="flex items-center gap-3"><Clock className="w-5 h-5 text-aura-gold-champagne"/> Trwały Efekt</span>
                <span className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-aura-gold-champagne"/> Precyzja i Symetria</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Services Bento Grid */}
        <section id="uslugi" className="px-6 py-32 md:px-12 bg-aura-green-bottle text-aura-cream relative overflow-hidden">
          {/* Architectural Background Grid */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" 
               style={{ backgroundImage: 'linear-gradient(#C7A24E 1px, transparent 1px), linear-gradient(90deg, #C7A24E 1px, transparent 1px)', backgroundSize: '4rem 4rem' }}>
          </div>

          <div className="max-w-[1600px] mx-auto relative z-10">
            <FadeIn className="flex flex-col md:flex-row md:justify-between md:items-end mb-20 gap-8">
              <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter">
                Nasze usługi.
              </h2>
              <p className="max-w-sm text-aura-sand text-lg font-medium leading-relaxed pb-2">
                Precyzja, symetria i perfekcyjne wykonanie. Architektura spojrzenia doprowadzona do ideału.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Service 1 */}
              <motion.div 
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group bg-aura-green-night p-10 md:p-16 rounded-[2rem] border border-aura-gold-champagne/10 hover:border-aura-gold-champagne/40 transition-colors duration-500 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-black/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-aura-gold-champagne/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-10 gap-6">
                    <h3 className="text-4xl md:text-5xl font-extrabold text-aura-gold-light tracking-tight">Laminacja rzęs</h3>
                    <span className="text-xl font-bold text-aura-green-night bg-aura-gold-champagne px-5 py-2 rounded-full whitespace-nowrap shadow-lg">od 150 zł</span>
                  </div>
                  <p className="text-aura-sand text-lg mb-12 leading-relaxed max-w-md">
                    Lifting, podkręcenie i głębokie odżywienie rzęs naturalnych. Zabieg kończymy specjalistycznym botoksem, który pogrubia i regeneruje strukturę włosa.
                  </p>
                </div>
                <button className="relative z-10 self-start flex items-center gap-3 text-aura-gold-light font-bold uppercase tracking-widest text-sm group-hover:text-white transition-colors">
                  Zarezerwuj 
                  <span className="bg-aura-gold-champagne/10 p-2 rounded-full group-hover:bg-aura-gold-champagne group-hover:text-aura-green-night transition-colors duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
                </button>
              </motion.div>

              {/* Service 2 */}
              <motion.div 
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group bg-aura-green-night p-10 md:p-16 rounded-[2rem] border border-aura-gold-champagne/10 hover:border-aura-gold-champagne/40 transition-colors duration-500 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-black/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-aura-gold-champagne/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                  <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-10 gap-6">
                    <h3 className="text-4xl md:text-5xl font-extrabold text-aura-gold-light tracking-tight">Laminacja brwi</h3>
                    <span className="text-xl font-bold text-aura-green-night bg-aura-gold-champagne px-5 py-2 rounded-full whitespace-nowrap shadow-lg">od 130 zł</span>
                  </div>
                  <p className="text-aura-sand text-lg mb-12 leading-relaxed max-w-md">
                    Trwałe ułożenie i ujarzmienie niesfornych włosków. Nadajemy idealny kształt, geometryzujemy rysy i opcjonalnie nakładamy farbkę tonującą.
                  </p>
                </div>
                <button className="relative z-10 self-start flex items-center gap-3 text-aura-gold-light font-bold uppercase tracking-widest text-sm group-hover:text-white transition-colors">
                  Zarezerwuj 
                  <span className="bg-aura-gold-champagne/10 p-2 rounded-full group-hover:bg-aura-gold-champagne group-hover:text-aura-green-night transition-colors duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section with Parallax */}
        <section id="o-nas" className="px-6 py-32 md:py-48 md:px-12 bg-aura-cream max-w-[1600px] mx-auto overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Parallax Block */}
            <div ref={aboutRef} className="aspect-[4/5] lg:aspect-square bg-aura-sand rounded-[2rem] overflow-hidden relative shadow-2xl shadow-aura-oak-dark/10">
               <motion.div 
                 style={{ y: aboutParallax }} 
                 className="absolute -inset-20 bg-aura-oak-medium/90 mix-blend-multiply"
               >
                 <div className="absolute inset-0 bg-gradient-to-b from-aura-cream/10 to-transparent"></div>
               </motion.div>
            </div>
            
            <div className="max-w-xl">
              <FadeIn>
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-12 h-px bg-aura-gold-champagne"></span>
                  <span className="uppercase tracking-widest text-sm text-aura-gold-champagne font-bold">Nasza Filozofia</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-aura-green-bottle mb-12 leading-[0.9]">
                  Detal ma<br/>znaczenie.
                </h2>
              </FadeIn>
              
              <div className="space-y-8">
                <FadeIn delay={0.1}>
                  <p className="text-xl text-aura-gray font-medium leading-relaxed">
                    W Aura Eyes skupiamy się na indywidualnej architekturze twarzy. Dobieramy odpowiedni kąt podkręcenia rzęs oraz kształt brwi, aby idealnie harmonizowały z Twoimi rysami.
                  </p>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <p className="text-xl text-aura-gray font-medium leading-relaxed">
                    Nie uznajemy kompromisów. Każdy zabieg to przemyślany rytuał, podczas którego używamy wyłącznie wyselekcjonowanych, certyfikowanych produktów klasy premium.
                  </p>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <div className="pt-8 mt-8 border-t border-aura-beige grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-4xl font-extrabold text-aura-green-bottle mb-2">100%</p>
                      <p className="text-sm font-bold uppercase tracking-widest text-aura-gold-champagne">Bezpieczeństwa</p>
                    </div>
                    <div>
                      <p className="text-4xl font-extrabold text-aura-green-bottle mb-2">Premium</p>
                      <p className="text-sm font-bold uppercase tracking-widest text-aura-gold-champagne">Jakość</p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer id="kontakt" className="bg-aura-graphite text-aura-cream px-6 pt-32 pb-12 md:px-12 relative overflow-hidden">
        {/* Massive Background Text Animation */}
        <div className="absolute top-10 left-0 w-full overflow-hidden flex justify-center pointer-events-none opacity-[0.03] select-none">
          <motion.h2 
             initial={{ y: 100 }}
             whileInView={{ y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1.5, ease: easePremium }}
             className="text-[25vw] font-extrabold tracking-tighter leading-none whitespace-nowrap"
          >
             AURA EYES
          </motion.h2>
        </div>

        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 border-b border-aura-gray/30 pb-20 relative z-10">
          <div className="lg:col-span-5">
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-aura-gold-champagne mb-8 uppercase">
              Aura Eyes.
            </h2>
            <p className="text-aura-gray text-xl font-medium max-w-sm leading-relaxed">
              Twoje spojrzenie w najlepszych rękach. Profesjonalne studio laminacji.
            </p>
            <a href="mailto:kontakt@auraeyes.pl" className="inline-block mt-12 text-2xl font-bold border-b-2 border-aura-gold-champagne pb-1 hover:text-aura-gold-champagne transition-colors">
              kontakt@auraeyes.pl
            </a>
          </div>
          
          <div className="lg:col-span-3 lg:col-start-7">
            <h4 className="text-sm font-bold uppercase tracking-widest text-aura-gold-light mb-8">Studio</h4>
            <ul className="space-y-4 text-aura-sand font-medium text-lg">
              <li>ul. Przykładowa 12/4</li>
              <li>00-000 Warszawa</li>
              <li className="pt-4">
                <a href="tel:+48123456789" className="text-aura-gold-champagne hover:text-white transition-colors">
                  +48 123 456 789
                </a>
              </li>
            </ul>
          </div>
          
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-widest text-aura-gold-light mb-8">Godziny</h4>
            <ul className="space-y-4 text-aura-sand font-medium text-lg">
              <li className="flex justify-between border-b border-aura-gray/20 pb-3"><span>Pon - Pt</span> <span>09:00 - 20:00</span></li>
              <li className="flex justify-between border-b border-aura-gray/20 pb-3"><span>Sobota</span> <span>10:00 - 15:00</span></li>
              <li className="flex justify-between text-aura-gray pt-1"><span>Niedziela</span> <span>Zamknięte</span></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-[1600px] mx-auto pt-10 flex flex-col md:flex-row justify-between items-center text-aura-gray text-xs font-bold tracking-widest uppercase relative z-10">
          <p>© {new Date().getFullYear()} Aura Eyes.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-aura-gold-champagne transition-colors">Instagram</a>
            <a href="#" className="hover:text-aura-gold-champagne transition-colors">Facebook</a>
            <a href="#" className="hover:text-aura-gold-champagne transition-colors">Regulamin</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
