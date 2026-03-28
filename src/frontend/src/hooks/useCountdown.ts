import { useEffect, useState } from "react";

export function useCountdown(durationHours: number) {
  const [timeLeft, setTimeLeft] = useState({ h: "00", m: "00", s: "00" });

  useEffect(() => {
    const key = "aurazo_countdown_end";
    let endTime = Number.parseInt(localStorage.getItem(key) ?? "0", 10);
    const now = Date.now();
    if (!endTime || endTime <= now) {
      endTime = now + durationHours * 3600 * 1000;
      localStorage.setItem(key, String(endTime));
    }

    const tick = () => {
      const remaining = Math.max(0, endTime - Date.now());
      const totalSec = Math.floor(remaining / 1000);
      const h = Math.floor(totalSec / 3600);
      const m = Math.floor((totalSec % 3600) / 60);
      const s = totalSec % 60;
      setTimeLeft({
        h: String(h).padStart(2, "0"),
        m: String(m).padStart(2, "0"),
        s: String(s).padStart(2, "0"),
      });
      if (remaining <= 0) {
        endTime = Date.now() + durationHours * 3600 * 1000;
        localStorage.setItem(key, String(endTime));
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [durationHours]);

  return timeLeft;
}
