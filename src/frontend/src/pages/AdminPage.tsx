import { Loader2, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useStore } from "../contexts/StoreContext";
import type {
  FAQItem,
  Product,
  Review,
  StoreSettings,
} from "../contexts/StoreContext";
import { backend } from "../lib/backendClient";

interface FieldProps {
  id: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}

function Field({ id, label, children, className }: FieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-gray-400 text-xs font-body uppercase tracking-wider mb-1"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-lg px-4 py-3 text-white text-sm font-body bg-[#11151A] border border-[#2A3138] focus:outline-none focus:border-[#39FF14] transition-colors";
const sectionCls = "rounded-2xl p-6 md:p-8 flex flex-col gap-6 border";

export function AdminPage() {
  const { settings, product, reviews, faqs, reload } = useStore();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [saving, setSaving] = useState<string | null>(null);

  const [localSettings, setLocalSettings] = useState<StoreSettings>(settings);
  const [localProduct, setLocalProduct] = useState<Product>(product);
  const [newReview, setNewReview] = useState<Partial<Review>>({
    name: "",
    city: "",
    rating: 5n,
    reviewText: "",
    verified: true,
  });
  const [newFaq, setNewFaq] = useState<Partial<FAQItem>>({
    question: "",
    answer: "",
    order: BigInt(faqs.length + 1),
  });

  useEffect(() => {
    backend
      .isAdmin()
      .then(setIsAdmin)
      .catch(() => setIsAdmin(false));
  }, []);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);
  useEffect(() => {
    setLocalProduct(product);
  }, [product]);

  if (isAdmin === null) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <Loader2 className="text-[#39FF14] animate-spin" size={40} />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#0a0a0a" }}
        data-ocid="admin.error_state"
      >
        <div className="text-center">
          <h1 className="font-heading font-black text-white text-4xl uppercase mb-4">
            Access Denied
          </h1>
          <p className="text-gray-400 font-body">
            You don't have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

  const saveSettings = async () => {
    setSaving("settings");
    try {
      await backend.updateStoreSettings(localSettings);
      toast.success("Settings saved!");
      reload();
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(null);
    }
  };

  const saveProduct = async () => {
    setSaving("product");
    try {
      await backend.updateProduct(localProduct);
      toast.success("Product saved!");
      reload();
    } catch {
      toast.error("Failed to save product");
    } finally {
      setSaving(null);
    }
  };

  const handleRemoveReview = async (id: bigint) => {
    try {
      await backend.removeReview(id);
      toast.success("Review removed");
      reload();
    } catch {
      toast.error("Failed to remove review");
    }
  };

  const handleAddReview = async () => {
    if (!newReview.name || !newReview.reviewText) {
      toast.error("Fill all fields");
      return;
    }
    setSaving("review");
    try {
      await backend.addReview({
        id: 0n,
        name: newReview.name ?? "",
        city: newReview.city ?? "",
        rating: newReview.rating ?? 5n,
        reviewText: newReview.reviewText ?? "",
        verified: newReview.verified ?? true,
      });
      setNewReview({
        name: "",
        city: "",
        rating: 5n,
        reviewText: "",
        verified: true,
      });
      toast.success("Review added");
      reload();
    } catch {
      toast.error("Failed to add review");
    } finally {
      setSaving(null);
    }
  };

  const handleRemoveFaq = async (id: bigint) => {
    try {
      await backend.removeFAQ(id);
      toast.success("FAQ removed");
      reload();
    } catch {
      toast.error("Failed to remove FAQ");
    }
  };

  const handleAddFaq = async () => {
    if (!newFaq.question || !newFaq.answer) {
      toast.error("Fill all fields");
      return;
    }
    setSaving("faq");
    try {
      await backend.addFAQ({
        id: 0n,
        question: newFaq.question ?? "",
        answer: newFaq.answer ?? "",
        order: newFaq.order ?? BigInt(faqs.length + 1),
      });
      setNewFaq({ question: "", answer: "", order: BigInt(faqs.length + 2) });
      toast.success("FAQ added");
      reload();
    } catch {
      toast.error("Failed to add FAQ");
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-8">
        <h1 className="font-heading font-black text-white text-5xl uppercase tracking-wide">
          Admin Panel
        </h1>

        <section
          className={sectionCls}
          style={{ backgroundColor: "#0D1013", borderColor: "#2A3138" }}
          data-ocid="admin.panel"
        >
          <h2 className="font-heading font-black text-white text-2xl uppercase">
            Store Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field id="s-headline" label="Hero Headline">
              <input
                id="s-headline"
                value={localSettings.heroHeadline}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    heroHeadline: e.target.value,
                  })
                }
                className={inputCls}
                data-ocid="admin.input"
              />
            </Field>
            <Field id="s-subheadline" label="Hero Subheadline">
              <input
                id="s-subheadline"
                value={localSettings.heroSubheadline}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    heroSubheadline: e.target.value,
                  })
                }
                className={inputCls}
                data-ocid="admin.input"
              />
            </Field>
            <Field
              id="s-announce"
              label="Announcement Text"
              className="md:col-span-2"
            >
              <input
                id="s-announce"
                value={localSettings.announcementText}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    announcementText: e.target.value,
                  })
                }
                className={inputCls}
                data-ocid="admin.input"
              />
            </Field>
            <Field id="s-countdown" label="Countdown Duration (hours)">
              <input
                id="s-countdown"
                type="number"
                value={Number(localSettings.countdownDurationHours)}
                onChange={(e) =>
                  setLocalSettings({
                    ...localSettings,
                    countdownDurationHours: BigInt(e.target.value || "24"),
                  })
                }
                className={inputCls}
                data-ocid="admin.input"
              />
            </Field>
          </div>
          <button
            type="button"
            onClick={saveSettings}
            disabled={saving === "settings"}
            className="self-start btn-neon-green font-black font-heading px-8 py-3 uppercase text-sm"
            data-ocid="admin.save_button"
          >
            {saving === "settings" ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              "Save Settings"
            )}
          </button>
        </section>

        <section
          className={sectionCls}
          style={{ backgroundColor: "#0D1013", borderColor: "#2A3138" }}
        >
          <h2 className="font-heading font-black text-white text-2xl uppercase">
            Product
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field id="p-name" label="Product Name">
              <input
                id="p-name"
                value={localProduct.name}
                onChange={(e) =>
                  setLocalProduct({ ...localProduct, name: e.target.value })
                }
                className={inputCls}
                data-ocid="admin.input"
              />
            </Field>
            <Field id="p-stock" label="Stock Count">
              <input
                id="p-stock"
                type="number"
                value={Number(localProduct.stockCount)}
                onChange={(e) =>
                  setLocalProduct({
                    ...localProduct,
                    stockCount: BigInt(e.target.value || "0"),
                  })
                }
                className={inputCls}
                data-ocid="admin.input"
              />
            </Field>
            <Field id="p-original" label="Original Price (₹)">
              <input
                id="p-original"
                type="number"
                value={Number(localProduct.originalPrice)}
                onChange={(e) =>
                  setLocalProduct({
                    ...localProduct,
                    originalPrice: BigInt(e.target.value || "0"),
                  })
                }
                className={inputCls}
                data-ocid="admin.input"
              />
            </Field>
            <Field id="p-sale" label="Sale Price (₹)">
              <input
                id="p-sale"
                type="number"
                value={Number(localProduct.salePrice)}
                onChange={(e) =>
                  setLocalProduct({
                    ...localProduct,
                    salePrice: BigInt(e.target.value || "0"),
                  })
                }
                className={inputCls}
                data-ocid="admin.input"
              />
            </Field>
            <Field id="p-buy2" label="Buy 2 Price (₹)">
              <input
                id="p-buy2"
                type="number"
                value={Number(localProduct.buy2Price ?? 0n)}
                onChange={(e) =>
                  setLocalProduct({
                    ...localProduct,
                    buy2Price: BigInt(e.target.value || "0"),
                  })
                }
                className={inputCls}
                data-ocid="admin.input"
              />
            </Field>
            <Field id="p-buy3" label="Buy 3 Price (₹)">
              <input
                id="p-buy3"
                type="number"
                value={Number(localProduct.buy3Price ?? 0n)}
                onChange={(e) =>
                  setLocalProduct({
                    ...localProduct,
                    buy3Price: BigInt(e.target.value || "0"),
                  })
                }
                className={inputCls}
                data-ocid="admin.input"
              />
            </Field>
          </div>
          <button
            type="button"
            onClick={saveProduct}
            disabled={saving === "product"}
            className="self-start btn-neon-green font-black font-heading px-8 py-3 uppercase text-sm"
            data-ocid="admin.save_button"
          >
            {saving === "product" ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              "Save Product"
            )}
          </button>
        </section>

        <section
          className={sectionCls}
          style={{ backgroundColor: "#0D1013", borderColor: "#2A3138" }}
        >
          <h2 className="font-heading font-black text-white text-2xl uppercase">
            Reviews
          </h2>
          <div className="flex flex-col gap-3">
            {reviews.map((r, i) => (
              <div
                key={String(r.id)}
                className="flex items-start justify-between gap-4 p-4 rounded-xl"
                style={{ backgroundColor: "#11151A" }}
                data-ocid={`admin.reviews.item.${i + 1}`}
              >
                <div>
                  <p className="text-white font-bold text-sm">
                    {r.name} — {r.city}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">{r.reviewText}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveReview(r.id)}
                  className="text-red-400 hover:text-red-300 flex-shrink-0"
                  data-ocid={`admin.delete_button.${i + 1}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <Field id="r-name" label="Name">
              <input
                id="r-name"
                value={newReview.name ?? ""}
                onChange={(e) =>
                  setNewReview({ ...newReview, name: e.target.value })
                }
                className={inputCls}
                placeholder="Rahul M."
                data-ocid="admin.input"
              />
            </Field>
            <Field id="r-city" label="City">
              <input
                id="r-city"
                value={newReview.city ?? ""}
                onChange={(e) =>
                  setNewReview({ ...newReview, city: e.target.value })
                }
                className={inputCls}
                placeholder="Mumbai"
                data-ocid="admin.input"
              />
            </Field>
            <Field id="r-text" label="Review Text" className="md:col-span-2">
              <textarea
                id="r-text"
                value={newReview.reviewText ?? ""}
                onChange={(e) =>
                  setNewReview({ ...newReview, reviewText: e.target.value })
                }
                className={inputCls}
                rows={3}
                placeholder="Write review..."
                data-ocid="admin.textarea"
              />
            </Field>
          </div>
          <button
            type="button"
            onClick={handleAddReview}
            disabled={saving === "review"}
            className="self-start flex items-center gap-2 btn-neon-green font-black font-heading px-8 py-3 uppercase text-sm"
            data-ocid="admin.primary_button"
          >
            <Plus size={16} />{" "}
            {saving === "review" ? "Adding..." : "Add Review"}
          </button>
        </section>

        <section
          className={sectionCls}
          style={{ backgroundColor: "#0D1013", borderColor: "#2A3138" }}
        >
          <h2 className="font-heading font-black text-white text-2xl uppercase">
            FAQs
          </h2>
          <div className="flex flex-col gap-3">
            {faqs.map((f, i) => (
              <div
                key={String(f.id)}
                className="flex items-start justify-between gap-4 p-4 rounded-xl"
                style={{ backgroundColor: "#11151A" }}
                data-ocid={`admin.faq.item.${i + 1}`}
              >
                <div>
                  <p className="text-white font-bold text-sm">{f.question}</p>
                  <p className="text-gray-400 text-xs mt-1">{f.answer}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFaq(f.id)}
                  className="text-red-400 hover:text-red-300 flex-shrink-0"
                  data-ocid={`admin.delete_button.${i + 1}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 pt-2">
            <Field id="faq-q" label="Question">
              <input
                id="faq-q"
                value={newFaq.question ?? ""}
                onChange={(e) =>
                  setNewFaq({ ...newFaq, question: e.target.value })
                }
                className={inputCls}
                placeholder="How long does delivery take?"
                data-ocid="admin.input"
              />
            </Field>
            <Field id="faq-a" label="Answer">
              <textarea
                id="faq-a"
                value={newFaq.answer ?? ""}
                onChange={(e) =>
                  setNewFaq({ ...newFaq, answer: e.target.value })
                }
                className={inputCls}
                rows={3}
                placeholder="Your answer..."
                data-ocid="admin.textarea"
              />
            </Field>
          </div>
          <button
            type="button"
            onClick={handleAddFaq}
            disabled={saving === "faq"}
            className="self-start flex items-center gap-2 btn-neon-green font-black font-heading px-8 py-3 uppercase text-sm"
            data-ocid="admin.primary_button"
          >
            <Plus size={16} /> {saving === "faq" ? "Adding..." : "Add FAQ"}
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
