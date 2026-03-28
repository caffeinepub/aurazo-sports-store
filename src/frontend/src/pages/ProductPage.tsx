import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AnnouncementBar } from "../components/AnnouncementBar";
import { CartDrawer } from "../components/CartDrawer";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useCart } from "../contexts/CartContext";
import { useStore } from "../contexts/StoreContext";

const AVATAR_COLORS = [
  "#39FF14",
  "#00F5FF",
  "#FF6B35",
  "#FFD23F",
  "#9B59B6",
  "#E74C3C",
];

const SIZE_ROWS = [
  ["XS", "32–34", "26–28", "34–36", "155–160"],
  ["S", "34–36", "28–30", "36–38", "160–165"],
  ["M", "36–38", "30–32", "38–40", "165–170"],
  ["L", "38–40", "32–34", "40–42", "170–175"],
  ["XL", "40–42", "34–36", "42–44", "175–180"],
  ["2XL", "42–44", "36–38", "44–46", "180–185"],
  ["3XL", "44–46", "38–40", "46–48", "185–190"],
];

export function ProductPage() {
  const { product, reviews } = useStore();
  const { dispatch } = useCart();
  const [selectedBundle, setSelectedBundle] = useState<1 | 2 | 3>(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes[3] ?? "L");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "description" | "sizeguide" | "reviews"
  >("description");
  const [showStickyATC, setShowStickyATC] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowStickyATC(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bundlePrice =
    selectedBundle === 1
      ? Number(product.salePrice)
      : selectedBundle === 2
        ? Number(product.buy2Price ?? product.salePrice * 2n)
        : Number(product.buy3Price ?? product.salePrice * 3n);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        productName: product.name,
        bundle: selectedBundle,
        size: selectedSize,
        quantity,
        unitPrice: bundlePrice,
      },
    });
    toast.success("Added to cart! 🛒");
  };

  const bundles = [
    {
      qty: 1 as const,
      label: "Buy 1",
      price: Number(product.salePrice),
      badge: null,
      badgeColor: "",
    },
    {
      qty: 2 as const,
      label: "Buy 2",
      price: Number(product.buy2Price ?? product.salePrice * 2n),
      badge: "Most Popular",
      badgeColor: "#00F5FF",
    },
    {
      qty: 3 as const,
      label: "Buy 3",
      price: Number(product.buy3Price ?? product.salePrice * 3n),
      badge: "Best Value",
      badgeColor: "#39FF14",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
      <AnnouncementBar />
      <Navbar />

      {showStickyATC && (
        <div
          className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-3 gap-4"
          style={{
            backgroundColor: "rgba(10,10,10,0.95)",
            borderBottom: "1px solid #2A3138",
            backdropFilter: "blur(12px)",
          }}
          data-ocid="product.panel"
        >
          <div className="flex items-center gap-3">
            <img
              src="/assets/generated/product-kit.dim_600x600.jpg"
              alt=""
              className="w-10 h-10 rounded object-cover"
            />
            <div>
              <p className="text-white font-bold text-sm font-body">
                {product.name}
              </p>
              <p
                className="font-black font-heading text-lg"
                style={{ color: "#39FF14" }}
              >
                ₹{bundlePrice.toLocaleString()}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            className="btn-neon-green font-black font-heading text-sm px-6 py-2.5 uppercase"
            data-ocid="product.primary_button"
          >
            ADD TO CART
          </button>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <div className="relative">
            <img
              src="/assets/generated/product-kit.dim_600x600.jpg"
              alt={product.name}
              className="w-full rounded-2xl shadow-2xl"
            />
            <span
              className="absolute top-4 left-4 text-xs font-black font-heading px-3 py-1 rounded-full uppercase"
              style={{ backgroundColor: "#39FF14", color: "#000" }}
            >
              BESTSELLER
            </span>
            <div
              className="absolute bottom-4 left-0 right-0 mx-4 text-center text-white text-sm font-bold py-2 rounded-lg"
              style={{ backgroundColor: "rgba(220,38,38,0.9)" }}
            >
              🔥 Only {String(product.stockCount)} left!
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="font-heading font-black text-white text-4xl uppercase">
              {product.name}
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</span>
              <span className="text-yellow-400 font-bold text-sm">(4.8)</span>
              <span className="text-gray-400 text-sm">(2,847 reviews)</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <s className="text-gray-500 text-xl">
                ₹{Number(product.originalPrice).toLocaleString()}
              </s>
              <span className="text-white font-black font-heading text-4xl">
                ₹{Number(product.salePrice).toLocaleString()}
              </span>
              <span
                className="text-xs font-black font-heading px-3 py-1 rounded-full uppercase"
                style={{ backgroundColor: "#39FF14", color: "#000" }}
              >
                50% OFF
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {bundles.map((b) => (
                <button
                  type="button"
                  key={b.qty}
                  onClick={() => setSelectedBundle(b.qty)}
                  className="relative rounded-xl p-3 text-center border-2 transition-all duration-200"
                  style={{
                    borderColor:
                      selectedBundle === b.qty ? "#39FF14" : "#2A3138",
                    backgroundColor:
                      selectedBundle === b.qty
                        ? "rgba(57,255,20,0.08)"
                        : "#11151A",
                  }}
                  data-ocid={`product.bundle.${b.qty}`}
                >
                  {b.badge && (
                    <span
                      className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-black text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap"
                      style={{ backgroundColor: b.badgeColor }}
                    >
                      {b.badge}
                    </span>
                  )}
                  <div className="text-white font-bold font-heading text-sm mt-1">
                    {b.label}
                  </div>
                  <div className="font-black text-white text-lg">
                    ₹{b.price.toLocaleString()}
                  </div>
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className="px-4 py-2 rounded-lg border-2 text-sm font-bold font-heading transition-all"
                  style={{
                    borderColor: selectedSize === s ? "#39FF14" : "#2A3138",
                    backgroundColor:
                      selectedSize === s ? "rgba(57,255,20,0.1)" : "#11151A",
                    color: selectedSize === s ? "#39FF14" : "#fff",
                  }}
                  data-ocid="product.select"
                >
                  {s}
                </button>
              ))}
            </div>
            <div
              className="flex items-center gap-0 rounded-xl overflow-hidden w-fit border"
              style={{ borderColor: "#2A3138" }}
            >
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-5 py-3 text-white font-black text-lg hover:bg-white/10 transition-colors"
                style={{ backgroundColor: "#11151A" }}
                data-ocid="product.secondary_button"
              >
                −
              </button>
              <span
                className="px-6 py-3 text-white font-black font-heading text-lg"
                style={{ backgroundColor: "#11151A" }}
              >
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="px-5 py-3 text-white font-black text-lg hover:bg-white/10 transition-colors"
                style={{ backgroundColor: "#11151A" }}
                data-ocid="product.secondary_button"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-5 font-black font-heading text-xl uppercase tracking-wider rounded-xl"
              style={{
                backgroundColor: "#39FF14",
                color: "#000",
                boxShadow: "0 0 30px rgba(57,255,20,0.4)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "#00F5FF";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "#39FF14";
              }}
              data-ocid="product.primary_button"
            >
              ADD TO CART
            </button>
            <div className="flex flex-wrap justify-center gap-6 py-2">
              {[
                "🔒 Secure Checkout",
                "↩ 30-Day Returns",
                "🚚 Free Delivery",
              ].map((b) => (
                <span key={b} className="text-gray-400 text-sm font-body">
                  {b}
                </span>
              ))}
            </div>
            <ul className="flex flex-col gap-2">
              {product.benefits.map((b) => (
                <li key={b} className="text-gray-300 text-sm font-body">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="rounded-2xl overflow-hidden border"
          style={{ borderColor: "#2A3138" }}
        >
          <div className="flex border-b" style={{ borderColor: "#2A3138" }}>
            {(["description", "sizeguide", "reviews"] as const).map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 py-4 font-heading font-bold uppercase text-sm tracking-wider transition-colors"
                style={{
                  color: activeTab === tab ? "#39FF14" : "#888",
                  borderBottom:
                    activeTab === tab
                      ? "2px solid #39FF14"
                      : "2px solid transparent",
                  backgroundColor: "#11151A",
                }}
                data-ocid="product.tab"
              >
                {tab === "description"
                  ? "Description"
                  : tab === "sizeguide"
                    ? "Size Guide"
                    : "Reviews"}
              </button>
            ))}
          </div>
          <div className="p-8" style={{ backgroundColor: "#11151A" }}>
            {activeTab === "description" && (
              <div className="flex flex-col gap-4">
                <ul className="flex flex-col gap-3">
                  {product.benefits.map((b) => (
                    <li
                      key={b}
                      className="text-gray-300 font-body flex items-center gap-2"
                    >
                      <span style={{ color: "#39FF14" }}>✓</span> {b}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-400 font-body text-sm leading-relaxed">
                  The Aurazo Pro Performance Kit is designed for athletes who
                  refuse to compromise. Crafted from our exclusive HyperFlex™
                  fabric blend, this kit moves with your body — not against it.
                  Whether you're pushing through a marathon, crushing a HIIT
                  session, or dominating on the court, the Pro Performance Kit
                  delivers unmatched comfort, durability, and style.
                </p>
              </div>
            )}
            {activeTab === "sizeguide" && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-body">
                  <thead>
                    <tr style={{ borderBottom: "1px solid #2A3138" }}>
                      {[
                        "Size",
                        "Chest (in)",
                        "Waist (in)",
                        "Hip (in)",
                        "Height (cm)",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left py-3 pr-6 font-bold text-white"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-gray-400">
                    {SIZE_ROWS.map((row) => (
                      <tr
                        key={row[0]}
                        style={{ borderBottom: "1px solid rgba(42,49,56,0.5)" }}
                      >
                        {row.map((cell) => (
                          <td key={cell} className="py-3 pr-6">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review, i) => {
                  const initials = review.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();
                  return (
                    <div
                      key={String(review.id)}
                      className="rounded-xl p-5 border flex flex-col gap-3"
                      style={{
                        backgroundColor: "#0D1013",
                        borderColor: "#2A3138",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs"
                          style={{
                            backgroundColor:
                              AVATAR_COLORS[i % AVATAR_COLORS.length],
                            color: "#000",
                          }}
                        >
                          {initials}
                        </div>
                        <div>
                          <div className="text-white font-bold text-sm">
                            {review.name}
                          </div>
                          <div className="text-gray-400 text-xs">
                            {review.city}
                          </div>
                        </div>
                      </div>
                      <div className="text-yellow-400 text-sm">
                        {"⭐".repeat(Number(review.rating))}
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        "{review.reviewText}"
                      </p>
                      {review.verified && (
                        <span
                          className="text-xs font-semibold"
                          style={{ color: "#39FF14" }}
                        >
                          ✓ Verified Purchase
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
