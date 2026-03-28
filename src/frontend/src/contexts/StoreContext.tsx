import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { FAQItem, Product, Review, StoreSettings } from "../backend.d";
import { backend } from "../lib/backendClient";

export type { StoreSettings, Product, Review, FAQItem };

const DEFAULT_SETTINGS: StoreSettings = {
  announcementText:
    "FREE SHIPPING ON ORDERS ABOVE ₹999 | LIMITED TIME OFFER — USE CODE: AURAZO10",
  countdownDurationHours: 24n,
  heroHeadline: "Performance Gear Built for Winners",
  heroSubheadline: "Engineered for strength, endurance & style",
};

const DEFAULT_PRODUCT: Product = {
  name: "Aurazo Pro Performance Kit",
  originalPrice: 1999n,
  salePrice: 999n,
  buy2Price: 1799n,
  buy3Price: 2499n,
  stockCount: 14n,
  sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
  benefits: [
    "⚡ High-performance fabric technology",
    "💪 Engineered for maximum mobility",
    "🎯 Sweat-wicking & breathable",
    "🏆 Worn by professional athletes",
  ],
};

const DEFAULT_REVIEWS: Review[] = [
  {
    id: 1n,
    name: "Rahul M.",
    city: "Mumbai",
    rating: 5n,
    verified: true,
    reviewText:
      "Absolutely love the quality. Wore it for my marathon and it held up perfectly. Worth every rupee!",
  },
  {
    id: 2n,
    name: "Priya S.",
    city: "Delhi",
    rating: 5n,
    verified: true,
    reviewText:
      "Finally a brand that understands athletes. The fit is incredible and it looks amazing too.",
  },
  {
    id: 3n,
    name: "Arjun K.",
    city: "Bangalore",
    rating: 5n,
    verified: true,
    reviewText:
      "Bought 2 sets and they're both fantastic. The neon trim is so clean. Fast delivery too!",
  },
  {
    id: 4n,
    name: "Sneha T.",
    city: "Chennai",
    rating: 5n,
    verified: true,
    reviewText:
      "My gym buddies keep asking where I got this. Premium feel at a great price.",
  },
  {
    id: 5n,
    name: "Vikram R.",
    city: "Pune",
    rating: 5n,
    verified: true,
    reviewText:
      "The fabric is next level. Sweat-wicking actually works. Highly recommend.",
  },
  {
    id: 6n,
    name: "Ananya D.",
    city: "Hyderabad",
    rating: 5n,
    verified: true,
    reviewText:
      "5 stars isn't enough. Best sports gear I've bought online in years.",
  },
];

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 1n,
    order: 1n,
    question: "How long does delivery take?",
    answer:
      "3-5 business days across India. Express delivery available at checkout.",
  },
  {
    id: 2n,
    order: 2n,
    question: "What is your return policy?",
    answer: "30-day hassle-free returns. No questions asked.",
  },
  {
    id: 3n,
    order: 3n,
    question: "Is the quality guaranteed?",
    answer:
      "Every Aurazo product is backed by our Performance Quality Guarantee.",
  },
  {
    id: 4n,
    order: 4n,
    question: "Can I track my order?",
    answer:
      "Yes, you'll receive a tracking link via email and SMS once your order ships.",
  },
  {
    id: 5n,
    order: 5n,
    question: "What sizes are available?",
    answer: "XS to 3XL. Refer to our size guide on the product page.",
  },
];

interface StoreContextValue {
  settings: StoreSettings;
  product: Product;
  reviews: Review[];
  faqs: FAQItem[];
  isLoading: boolean;
  reload: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
  const [product, setProduct] = useState<Product>(DEFAULT_PRODUCT);
  const [reviews, setReviews] = useState<Review[]>(DEFAULT_REVIEWS);
  const [faqs, setFaqs] = useState<FAQItem[]>(DEFAULT_FAQS);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      await backend.init();
    } catch {
      /* ignore */
    }
    const [s, p, r, f] = await Promise.all([
      backend.getStoreSettings().catch(() => DEFAULT_SETTINGS),
      backend
        .getProduct("Aurazo Pro Performance Kit")
        .catch(() => DEFAULT_PRODUCT),
      backend.getAllReviews().catch(() => DEFAULT_REVIEWS),
      backend.getAllFAQs().catch(() => DEFAULT_FAQS),
    ]);
    setSettings(s ?? DEFAULT_SETTINGS);
    setProduct(p ?? DEFAULT_PRODUCT);
    if (r && r.length > 0) setReviews(r);
    if (f && f.length > 0) setFaqs(f);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const reload = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return (
    <StoreContext.Provider
      value={{ settings, product, reviews, faqs, isLoading, reload }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
