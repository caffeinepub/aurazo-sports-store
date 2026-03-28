import { useFadeIn } from "../hooks/useFadeIn";

const benefits = [
  {
    icon: "🛡️",
    title: "BUILT TO LAST",
    desc: "Military-grade durability tested for 1000+ hours of intense performance.",
  },
  {
    icon: "⚡",
    title: "PEAK PERFORMANCE",
    desc: "Engineered for serious athletes who demand more from their gear.",
  },
  {
    icon: "🎨",
    title: "STYLISH DESIGN",
    desc: "From gym to street, look elite everywhere you go.",
  },
  {
    icon: "🚀",
    title: "FAST DELIVERY",
    desc: "Delivered in 3-5 business days across India, guaranteed.",
  },
];

export function BenefitsSection() {
  const ref = useFadeIn<HTMLElement>();
  return (
    <section
      id="benefits"
      className="fade-in-section py-16 md:py-24"
      ref={ref}
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-heading font-black text-white text-center text-4xl md:text-5xl uppercase mb-12 tracking-wide">
          WHY AURAZO?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl p-8 flex flex-col items-center text-center gap-4 border transition-all duration-300"
              style={{ backgroundColor: "#11151A", borderColor: "#2A3138" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#39FF14";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#2A3138";
              }}
            >
              <span className="text-4xl">{b.icon}</span>
              <h3 className="font-heading font-bold text-white text-lg uppercase tracking-wide">
                {b.title}
              </h3>
              <p className="text-gray-400 text-sm font-body leading-relaxed">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
