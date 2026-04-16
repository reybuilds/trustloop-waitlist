import { useEffect, useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { getWaitlistCount } from '@/utils/waitlist.functions';

export function WaitlistCount({ refreshKey = 0 }: { refreshKey?: number }) {
  const fetchCount = useServerFn(getWaitlistCount);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchCount()
      .then((r) => {
        if (!cancelled) setCount(r.count);
      })
      .catch(() => {
        if (!cancelled) setCount(null);
      });
    return () => {
      cancelled = true;
    };
  }, [fetchCount, refreshKey]);

  const display = count === null ? '—' : count < 100 ? '100+' : `${count}+`;

  return (
    <div className="flex items-center justify-center lg:justify-start gap-3">
      <div className="flex -space-x-2">
        {[
          'oklch(0.72 0.15 320)',
          'oklch(0.75 0.13 200)',
          'oklch(0.78 0.14 60)',
          'oklch(0.70 0.16 350)',
        ].map((bg, i) => (
          <div
            key={i}
            className="h-7 w-7 rounded-full border-2 border-background flex items-center justify-center"
            style={{ background: bg }}
            aria-hidden
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-white/90" fill="currentColor">
              <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-3.3 0-8 1.7-8 5v1h16v-1c0-3.3-4.7-5-8-5Z" />
            </svg>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Join <span className="font-semibold text-foreground">{display}</span> people on the waitlist
      </p>
    </div>
  );
}
