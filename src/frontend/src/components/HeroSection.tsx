import { useNavigate } from "@tanstack/react-router";
import { useStore } from "../contexts/StoreContext";
import { useCountdown } from "../hooks/useCountdown";

export function HeroSection() {
  const { settings } = useStore();
  const countdown = useCountdown(Number(settings.countdownDurationHours));
  const navigate = useNavigate();

  const scrollToShop = () => {
    const el = document.getElementById("shop");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else navigate({ to: "/" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center"
      style={{
        backgroundImage:
          "url('/assets/generated/hero-athlete.dim_1400x700.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.85) 50%, rgba(10,10,10,0.4) 100%)",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <div className="max-w-2xl">
          <div
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border"
            style={{
              borderColor: "#39FF14",
              backgroundColor: "rgba(57,255,20,0.08)",
            }}
          >
            <span
              className="text-xs font-bold font-heading tracking-wider"
              style={{ color: "#39FF14" }}
            >
              ⚡ FLASH SALE ENDS IN: {countdown.h}:{countdown.m}:{countdown.s}
            </span>
          </div>
          <h1
            className="font-heading font-black text-white uppercase leading-none mb-4"
            style={{
              fontSize: "clamp(48px, 8vw, 84px)",
              letterSpacing: "-0.01em",
            }}
          >
            {settings.heroHeadline}
          </h1>
          <p
            className="font-body font-semibold text-xl md:text-2xl mb-8"
            style={{ color: "#39FF14" }}
          >
            {settings.heroSubheadline}
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              type="button"
              onClick={scrollToShop}
              className="btn-neon-green font-black font-heading text-xl px-10 py-4 uppercase tracking-wide"
              data-ocid="hero.primary_button"
            >
              Shop Now →
            </button>
            <p className="text-gray-300 text-sm font-body">
              ⭐ 4.8/5 from 10,000+ athletes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
