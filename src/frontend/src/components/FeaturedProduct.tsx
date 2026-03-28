import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../contexts/CartContext";
import { useStore } from "../contexts/StoreContext";
import { useFadeIn } from "../hooks/useFadeIn";

export function FeaturedProduct() {
  const { product } = useStore();
  const { dispatch } = useCart();
  const ref = useFadeIn<HTMLElement>();

  const [selectedBundle, setSelectedBundle] = useState<1 | 2 | 3>(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes[3] ?? "L");
  const [quantity, setQuantity] = useState(1);

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
    toast.success("Added to cart! 🛒", {
      description: `${product.name} — Buy ${selectedBundle}`,
    });
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
    <section
      id="shop"
      className="fade-in-section py-16 md:py-24"
      ref={ref}
      style={{ backgroundColor: "#0a0a0a" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-heading font-black text-white text-center text-4xl md:text-5xl uppercase mb-12 tracking-wide">
          THE AURAZO PRO PERFORMANCE KIT
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="relative">
            <img
              src="/assets/generated/product-kit.dim_600x600.jpg"
              alt="Aurazo Pro Performance Kit"
              className="w-full rounded-2xl shadow-2xl"
            />
            <span
              className="absolute top-4 left-4 text-xs font-black font-heading px-3 py-1 rounded-full uppercase tracking-wider"
              style={{ backgroundColor: "#39FF14", color: "#000" }}
            >
              BESTSELLER
            </span>
            <div
              className="absolute bottom-4 left-0 right-0 mx-4 text-center text-white text-sm font-bold py-2 rounded-lg"
              style={{ backgroundColor: "rgba(220,38,38,0.9)" }}
            >
              🔥 Only {String(product.stockCount)} left in stock!
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h3 className="font-heading font-black text-white text-3xl uppercase">
              {product.name}
            </h3>
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
            <div>
              <p className="text-gray-400 text-sm font-body mb-2 uppercase tracking-wider">
                Select Bundle
              </p>
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
                        className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-black text-[10px] font-black font-heading px-2 py-0.5 rounded-full whitespace-nowrap"
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
            </div>
            <div>
              <p className="text-gray-400 text-sm font-body mb-2 uppercase tracking-wider">
                Size
              </p>
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
            </div>
            <div>
              <p className="text-gray-400 text-sm font-body mb-2 uppercase tracking-wider">
                Quantity
              </p>
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
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-5 font-black font-heading text-xl uppercase tracking-wider rounded-xl transition-all duration-200"
              style={{
                backgroundColor: "#39FF14",
                color: "#000",
                boxShadow:
                  "0 0 30px rgba(57,255,20,0.4), 0 0 60px rgba(57,255,20,0.15)",
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
                <li
                  key={b}
                  className="text-gray-300 text-sm font-body flex items-start gap-2"
                >
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
