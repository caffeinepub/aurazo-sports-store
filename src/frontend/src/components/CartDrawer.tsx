import { ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../contexts/CartContext";
import { backend } from "../lib/backendClient";

export function CartDrawer() {
  const { state, dispatch, subtotal } = useCart();
  const [orderBump, setOrderBump] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!state.isOpen) return null;

  const bumpPrice = 799;
  const finalTotal = subtotal + (orderBump ? bumpPrice : 0);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      await backend.incrementOrderCount();
      dispatch({ type: "CLEAR" });
      dispatch({ type: "CLOSE" });
      toast.success("Order placed! 🎉", {
        description: "We'll contact you shortly with delivery details.",
      });
    } catch {
      toast.error("Checkout failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const closeDrawer = () => dispatch({ type: "CLOSE" });

  return (
    <>
      <div
        className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
        role="button"
        tabIndex={0}
        aria-label="Close cart"
        onClick={closeDrawer}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") closeDrawer();
        }}
      />
      <div
        className="fixed right-0 top-0 h-full z-[100] flex flex-col"
        style={{
          width: "min(400px, 100vw)",
          backgroundColor: "#0D1013",
          borderLeft: "1px solid #2A3138",
        }}
        data-ocid="cart.sheet"
      >
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1px solid #2A3138" }}
        >
          <h2 className="font-heading font-black text-white text-xl uppercase tracking-wide">
            Your Cart
          </h2>
          <button
            type="button"
            onClick={closeDrawer}
            className="text-gray-400 hover:text-white"
            data-ocid="cart.close_button"
          >
            <X size={22} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {state.items.length === 0 ? (
            <div
              className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-16"
              data-ocid="cart.empty_state"
            >
              <ShoppingCart size={48} className="text-gray-600" />
              <p className="text-gray-400 font-body">Your cart is empty</p>
              <button
                type="button"
                onClick={closeDrawer}
                className="btn-neon-green font-black font-heading text-sm px-6 py-3 uppercase"
              >
                Shop Now
              </button>
            </div>
          ) : (
            state.items.map((item, i) => (
              <div
                key={`${item.productName}-${item.bundle}-${i}`}
                className="flex gap-4 items-start"
                data-ocid={`cart.item.${i + 1}`}
              >
                <img
                  src="/assets/generated/product-kit.dim_600x600.jpg"
                  alt={item.productName}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-white font-bold text-sm font-body">
                    {item.productName}
                  </p>
                  <p className="text-gray-400 text-xs font-body">
                    Buy {item.bundle} · Size {item.size}
                  </p>
                  <p className="text-white font-black font-heading text-base mt-1">
                    ₹{(item.unitPrice * item.quantity).toLocaleString()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => dispatch({ type: "REMOVE_ITEM", payload: i })}
                  className="text-gray-500 hover:text-red-400"
                  data-ocid={`cart.delete_button.${i + 1}`}
                >
                  <X size={16} />
                </button>
              </div>
            ))
          )}
        </div>
        {state.items.length > 0 && (
          <div
            className="px-6 py-5 flex flex-col gap-4"
            style={{ borderTop: "1px solid #2A3138" }}
          >
            <label
              className="flex items-start gap-3 cursor-pointer p-3 rounded-xl"
              style={{
                backgroundColor: "rgba(57,255,20,0.05)",
                border: "1px solid rgba(57,255,20,0.3)",
              }}
            >
              <input
                type="checkbox"
                checked={orderBump}
                onChange={(e) => setOrderBump(e.target.checked)}
                className="mt-0.5 accent-[#39FF14]"
                data-ocid="cart.checkbox"
              />
              <span className="text-sm font-body text-gray-300">
                <strong className="text-white">Add a second kit</strong> for
                only <strong style={{ color: "#39FF14" }}>₹799 more</strong> 🎁
              </span>
            </label>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-body text-sm">Total</span>
              <span className="text-white font-black font-heading text-2xl">
                ₹{finalTotal.toLocaleString()}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-4 font-black font-heading text-lg uppercase tracking-wide rounded-xl transition-all"
              style={{
                backgroundColor: isCheckingOut ? "#555" : "#39FF14",
                color: "#000",
                boxShadow: isCheckingOut
                  ? "none"
                  : "0 0 20px rgba(57,255,20,0.4)",
              }}
              data-ocid="cart.submit_button"
            >
              {isCheckingOut ? "Processing..." : "CHECKOUT SECURELY →"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
