import { useStore } from "../contexts/StoreContext";
import { useCountdown } from "../hooks/useCountdown";
import { useFadeIn } from "../hooks/useFadeIn";

export function UrgencySection() {
  const { settings, product } = useStore();
  const countdown = useCountdown(Number(settings.countdownDurationHours));
  const ref = useFadeIn<HTMLElement>();

  const scrollToShop = () =>
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="fade-in-section py-16 md:py-24"
      ref={ref}
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div
          className="rounded-3xl p-8 md:p-12 flex flex-col items-center text-center gap-6"
          style={{
            border: "2px solid #39FF14",
            backgroundColor: "#0D1013",
            boxShadow:
              "0 0 40px rgba(57,255,20,0.15), inset 0 0 40px rgba(57,255,20,0.03)",
          }}
        >
          <h2 className="font-heading font-black text-white text-4xl md:text-5xl uppercase tracking-wide">
            ⚡ FLASH SALE — ENDS SOON
          </h2>
          <div className="flex items-center gap-3">
            {[countdown.h, countdown.m, countdown.s].map((val, i) => (
              <span key={val + String(i)} className="flex items-center gap-3">
                <span
                  className="font-heading font-black text-6xl md:text-7xl tabular-nums"
                  style={{
                    color: "#00F5FF",
                    textShadow: "0 0 20px rgba(0,245,255,0.5)",
                  }}
                >
                  {val}
                </span>
                {i < 2 && (
                  <span
                    className="text-4xl font-black"
                    style={{ color: "#00F5FF" }}
                  >
                    :
                  </span>
                )}
              </span>
            ))}
          </div>
          <p className="text-gray-300 font-body text-base max-w-md">
            Only {String(product.stockCount)} units left at this price. Once
            they're gone, price goes back to ₹
            {Number(product.originalPrice).toLocaleString()}.
          </p>
          <div className="w-full">
            <div className="flex justify-between text-sm font-body font-semibold mb-2">
              <span style={{ color: "#39FF14" }}>87% CLAIMED</span>
              <span className="text-gray-400">Only a few left!</span>
            </div>
            <div
              className="w-full h-4 rounded-full"
              style={{ backgroundColor: "#1a2028" }}
            >
              <div
                className="h-4 rounded-full"
                style={{
                  width: "87%",
                  backgroundColor: "#39FF14",
                  boxShadow: "0 0 10px rgba(57,255,20,0.5)",
                }}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={scrollToShop}
            className="btn-neon-green font-black font-heading text-xl px-10 py-4 uppercase tracking-wide"
            data-ocid="urgency.primary_button"
          >
            CLAIM YOUR DISCOUNT →
          </button>
        </div>
      </div>
    </section>
  );
}
