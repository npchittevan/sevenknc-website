import { motion } from "framer-motion";
import { Apple, Leaf, Globe, Truck, ArrowRight, Star } from "lucide-react";

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const Site2 = () => (
  <div style={{ background: "#FFFBF5", color: "#3D2E1F", fontFamily: "'Inter', sans-serif" }} className="min-h-screen">
    <nav className="flex items-center justify-between px-6 md:px-16 py-5 max-w-7xl mx-auto">
      <span className="text-xl font-bold flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans'" }}>
        <Apple size={22} style={{ color: "#E85D04" }} />
        <span>Tropi</span><span style={{ color: "#E85D04" }}>Fresh</span>
      </span>
      <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: "#8B7355" }}>
        <a href="#fruits" className="hover:opacity-70 transition">Our Fruits</a>
        <a href="#process" className="hover:opacity-70 transition">Process</a>
        <a href="#global" className="hover:opacity-70 transition">Global Reach</a>
        <a href="#contact" className="hover:opacity-70 transition">Contact</a>
        <button className="px-5 py-2.5 rounded-full text-sm font-semibold" style={{ background: "#E85D04", color: "#fff" }}>Order Now</button>
      </div>
    </nav>

    <motion.section initial="hidden" animate="visible" variants={fade} className="px-6 md:px-16 max-w-7xl mx-auto pt-20 pb-16 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8" style={{ background: "#FEF3C7", color: "#D97706" }}>
        <Leaf size={14} /> 100% Organic & Sustainably Sourced
      </div>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6" style={{ fontFamily: "'Plus Jakarta Sans'" }}>
        Fresh Tropical Fruits<br />Delivered <span style={{ color: "#E85D04" }}>Worldwide</span>
      </h1>
      <p className="text-lg max-w-xl mx-auto mb-10" style={{ color: "#8B7355" }}>
        Premium quality mangoes, bananas, pineapples and exotic fruits — shipped fresh from farm to your doorstep across 30+ countries.
      </p>
      <button className="px-8 py-4 rounded-full font-semibold flex items-center gap-2 mx-auto" style={{ background: "#E85D04", color: "#fff" }}>
        Explore Our Catalog <ArrowRight size={16} />
      </button>
    </motion.section>

    <section id="fruits" className="px-6 md:px-16 max-w-7xl mx-auto pb-24">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {[
          { name: "Alphonso Mango", origin: "India", emoji: "🥭", bg: "#FFF7ED" },
          { name: "Cavendish Banana", origin: "Ecuador", emoji: "🍌", bg: "#FEFCE8" },
          { name: "Golden Pineapple", origin: "Costa Rica", emoji: "🍍", bg: "#FEF9C3" },
          { name: "Dragon Fruit", origin: "Vietnam", emoji: "🐉", bg: "#FFF1F2" },
        ].map((f, i) => (
          <motion.div key={i} variants={fade} className="rounded-2xl p-6 text-center cursor-pointer hover:scale-[1.03] transition-transform" style={{ background: f.bg }}>
            <div className="text-5xl mb-4">{f.emoji}</div>
            <h3 className="font-bold text-sm mb-1" style={{ fontFamily: "'Plus Jakarta Sans'" }}>{f.name}</h3>
            <p className="text-xs" style={{ color: "#8B7355" }}>Origin: {f.origin}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>

    <section id="process" className="px-6 md:px-16 max-w-7xl mx-auto pb-24">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade}>
        <h2 className="text-3xl font-bold text-center mb-4" style={{ fontFamily: "'Plus Jakarta Sans'" }}>Farm to Table, Simplified</h2>
        <p className="text-center text-sm mb-14 max-w-md mx-auto" style={{ color: "#8B7355" }}>Our streamlined export process ensures freshness at every step.</p>
      </motion.div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.12 } } }} className="grid md:grid-cols-4 gap-6">
        {[
          { step: "01", title: "Harvest", desc: "Hand-picked at peak ripeness from certified organic farms." },
          { step: "02", title: "Quality Check", desc: "Every batch tested for size, sweetness, and freshness." },
          { step: "03", title: "Cold Chain", desc: "Temperature-controlled packaging and storage." },
          { step: "04", title: "Delivery", desc: "Express air & sea freight to 30+ countries worldwide." },
        ].map((s, i) => (
          <motion.div key={i} variants={fade} className="text-center">
            <div className="text-3xl font-extrabold mb-3" style={{ color: "#E85D04", fontFamily: "'Plus Jakarta Sans'" }}>{s.step}</div>
            <h4 className="font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans'" }}>{s.title}</h4>
            <p className="text-sm" style={{ color: "#8B7355" }}>{s.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>

    <section id="global" className="px-6 md:px-16 max-w-7xl mx-auto pb-24">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fade} className="rounded-2xl p-10 md:p-16" style={{ background: "#FFF7ED" }}>
        <div className="grid md:grid-cols-3 gap-10 items-center">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Plus Jakarta Sans'" }}>Trusted by Importers Globally</h2>
            <p className="text-sm mb-6" style={{ color: "#8B7355" }}>We supply major supermarket chains, wholesalers, and hospitality businesses across Europe, the Middle East, and Asia.</p>
            <div className="flex gap-8">
              {[["30+", "Countries"], ["500+", "Clients"], ["10K", "Tons/Year"]].map(([n, l], i) => (
                <div key={i}>
                  <div className="text-2xl font-extrabold" style={{ color: "#E85D04", fontFamily: "'Plus Jakarta Sans'" }}>{n}</div>
                  <div className="text-xs" style={{ color: "#8B7355" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { icon: <Globe size={16} />, text: "GLOBALG.A.P Certified" },
              { icon: <Leaf size={16} />, text: "Organic & Fair Trade" },
              { icon: <Truck size={16} />, text: "Express Worldwide Shipping" },
              { icon: <Star size={16} />, text: "Premium Grade Only" },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm" style={{ background: "#FFEDD5", color: "#9A3412" }}>
                {b.icon} {b.text}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>

    <section id="contact" className="px-6 md:px-16 max-w-7xl mx-auto pb-16">
      <div className="rounded-2xl text-center px-6 py-20" style={{ background: "linear-gradient(135deg, #E85D04, #F97316)" }}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans'" }}>Ready to Source Premium Fruits?</h2>
        <p className="text-white/70 mb-8 text-sm">Get a custom quote tailored to your volume and delivery needs.</p>
        <button className="px-8 py-3.5 rounded-full font-semibold" style={{ background: "#fff", color: "#E85D04" }}>Request a Quote</button>
      </div>
    </section>

    <footer className="text-center py-10 text-xs" style={{ color: "#8B7355" }}>© 2026 TropiFresh Exports. All rights reserved.</footer>
  </div>
);

export default Site2;
