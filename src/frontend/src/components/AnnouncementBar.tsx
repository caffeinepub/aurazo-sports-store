import { useStore } from "../contexts/StoreContext";

export function AnnouncementBar() {
  const { settings } = useStore();
  const text = `${settings.announcementText} ✦ `;

  return (
    <div className="w-full bg-black overflow-hidden" style={{ height: "36px" }}>
      <div className="flex items-center h-full">
        <div
          className="flex-shrink-0 z-10 bg-black flex items-center px-3 h-full"
          style={{ borderRight: "1px solid #39FF14" }}
        >
          <span
            className="text-xs font-bold font-heading tracking-wider px-2 py-0.5 rounded-sm"
            style={{ backgroundColor: "#39FF14", color: "#000" }}
          >
            🔥 OFFER
          </span>
        </div>
        <div className="overflow-hidden flex-1">
          <div
            className="flex whitespace-nowrap"
            style={{ animation: "marquee 25s linear infinite" }}
          >
            <span
              className="text-xs font-semibold font-body px-4"
              style={{ color: "#39FF14" }}
            >
              {text}
              {text}
              {text}
              {text}
            </span>
            <span
              className="text-xs font-semibold font-body px-4"
              style={{ color: "#39FF14" }}
            >
              {text}
              {text}
              {text}
              {text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
