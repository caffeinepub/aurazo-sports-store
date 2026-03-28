export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;
  const footerLinks = [
    { label: "Shop", href: "/" },
    { label: "About", href: "/" },
    { label: "Contact", href: "/" },
    { label: "Returns", href: "/" },
    { label: "Privacy Policy", href: "/" },
  ];
  return (
    <footer className="bg-black" style={{ borderTop: "1px solid #1a2028" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="font-heading font-black text-white text-3xl tracking-widest uppercase mb-1">
              AURAZO
            </div>
            <p className="text-gray-400 text-sm font-body">
              Built for Athletes. Designed for Winners.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-400 hover:text-white text-sm font-body transition-colors"
                data-ocid="footer.link"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mb-8">
          {["VISA", "MASTERCARD", "UPI", "RAZORPAY"].map((p) => (
            <span
              key={p}
              className="text-xs font-bold font-body text-gray-400 px-3 py-1 rounded border"
              style={{ borderColor: "#2A3138", backgroundColor: "#11151A" }}
            >
              {p}
            </span>
          ))}
        </div>
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-2 pt-6"
          style={{ borderTop: "1px solid #1a2028" }}
        >
          <p className="text-gray-500 text-xs font-body">
            © {year} Aurazo. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs font-body">
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
