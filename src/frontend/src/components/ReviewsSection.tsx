import { useStore } from "../contexts/StoreContext";
import { useFadeIn } from "../hooks/useFadeIn";

const AVATAR_COLORS = [
  "#39FF14",
  "#00F5FF",
  "#FF6B35",
  "#FFD23F",
  "#9B59B6",
  "#E74C3C",
];

export function ReviewsSection() {
  const { reviews } = useStore();
  const ref = useFadeIn<HTMLElement>();
  return (
    <section
      id="reviews-section"
      className="fade-in-section py-16 md:py-24"
      ref={ref}
      style={{ backgroundColor: "#0D1013" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-heading font-black text-white text-center text-4xl md:text-5xl uppercase mb-12 tracking-wide">
          WHAT ATHLETES ARE SAYING
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => {
            const initials = review.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();
            const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
            return (
              <div
                key={String(review.id)}
                className="rounded-2xl p-6 flex flex-col gap-3 border"
                style={{ backgroundColor: "#11151A", borderColor: "#2A3138" }}
                data-ocid={`reviews.item.${i + 1}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: color, color: "#000" }}
                  >
                    {initials}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm font-body">
                      {review.name}
                    </div>
                    <div className="text-gray-400 text-xs font-body">
                      {review.city}
                    </div>
                  </div>
                </div>
                <div className="text-yellow-400 text-sm">
                  {"⭐".repeat(Number(review.rating))}
                </div>
                <p className="text-gray-300 text-sm font-body leading-relaxed">
                  "{review.reviewText}"
                </p>
                {review.verified && (
                  <span
                    className="text-xs font-body font-semibold"
                    style={{ color: "#39FF14" }}
                  >
                    ✓ Verified Purchase
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
