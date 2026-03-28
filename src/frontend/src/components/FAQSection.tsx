import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useStore } from "../contexts/StoreContext";
import { useFadeIn } from "../hooks/useFadeIn";

export function FAQSection() {
  const { faqs } = useStore();
  const [openId, setOpenId] = useState<bigint | null>(null);
  const ref = useFadeIn<HTMLElement>();
  const sorted = [...faqs].sort((a, b) => (a.order < b.order ? -1 : 1));

  return (
    <section
      id="faq"
      className="fade-in-section py-16 md:py-24"
      ref={ref}
      style={{ backgroundColor: "#0D1013" }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="font-heading font-black text-white text-center text-4xl md:text-5xl uppercase mb-12 tracking-wide">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <div className="flex flex-col gap-3">
          {sorted.map((faq, i) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={String(faq.id)}
                className="rounded-xl border overflow-hidden"
                style={{
                  backgroundColor: "#11151A",
                  borderColor: isOpen ? "#39FF14" : "#2A3138",
                }}
                data-ocid={`faq.item.${i + 1}`}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  data-ocid="faq.toggle"
                >
                  <span className="text-white font-bold font-body pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className="flex-shrink-0 transition-transform duration-200"
                    style={{
                      color: "#39FF14",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-400 font-body text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
