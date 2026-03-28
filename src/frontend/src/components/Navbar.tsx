import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";

export function Navbar() {
  const { totalItems, dispatch } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const router = useRouter();
  const isHome = router.state.location.pathname === "/";

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate({ to: "/" }).then(() => {
        setTimeout(
          () =>
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
          100,
        );
      });
    }
  };

  const navLinks = [
    {
      label: "Home",
      action: () => {
        setMenuOpen(false);
        navigate({ to: "/" });
      },
    },
    { label: "Shop", action: () => scrollTo("shop") },
    { label: "Reviews", action: () => scrollTo("reviews-section") },
    { label: "FAQ", action: () => scrollTo("faq") },
  ];

  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{
        background: "rgba(10,10,10,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(57,255,20,0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-heading font-black text-white text-2xl tracking-widest uppercase"
          data-ocid="nav.link"
        >
          AURAZO
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.label}
              onClick={link.action}
              className="text-sm font-body font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-wider"
              data-ocid="nav.link"
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => dispatch({ type: "OPEN" })}
            className="relative text-white hover:text-[#39FF14] transition-colors"
            data-ocid="cart.open_modal_button"
          >
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span
                className="absolute -top-2 -right-2 text-black text-xs font-black rounded-full w-5 h-5 flex items-center justify-center"
                style={{ backgroundColor: "#39FF14" }}
              >
                {totalItems}
              </span>
            )}
          </button>
          <button
            type="button"
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            data-ocid="nav.toggle"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-black/95 border-t border-gray-800 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.label}
              onClick={link.action}
              className="text-left text-base font-body font-medium text-gray-200 hover:text-[#39FF14] transition-colors uppercase tracking-wider py-2"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
