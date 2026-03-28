import { useFadeIn } from "../hooks/useFadeIn";

const proofItems = [
  { icon: "⭐", text: "4.8/5 Rated" },
  { icon: "👥", text: "10,000+ Customers" },
  { icon: "🏆", text: "Trusted by Athletes" },
  { icon: "↩", text: "30-Day Money Back" },
  { icon: "🚚", text: "Free Shipping" },
];

const tickerItems = [
  ...proofItems,
  ...proofItems,
  ...proofItems,
  ...proofItems,
];

export function SocialProofBar() {
  const ref = useFadeIn<HTMLDivElement>();

  return (
    <div
      id="reviews"
      className="fade-in-section overflow-hidden py-4"
      ref={ref}
      style={{
        backgroundColor: "#0D1013",
        borderTop: "1px solid #1a2028",
        borderBottom: "1px solid #1a2028",
      }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "ticker-scroll 30s linear infinite" }}
      >
        {tickerItems.map((item, i) => (
          <span
            key={`${item.text}-${i}`}
            className="inline-flex items-center gap-2 px-8"
          >
            <span
              className="text-sm font-body font-semibold"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              <span style={{ color: "#39FF14" }}>{item.icon}</span> {item.text}
            </span>
            <span style={{ color: "#39FF14", opacity: 0.4 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
