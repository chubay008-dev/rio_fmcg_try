export function BubbleField({
  count = 18,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const bubbles = Array.from({ length: count }, (_, i) => {
    const size = 4 + ((i * 37) % 22);
    const left = (i * 53) % 100;
    const duration = 6 + ((i * 13) % 10);
    const delay = (i * 0.9) % 8;
    return { size, left, duration, delay, key: i };
  });

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {bubbles.map((b) => (
        <span
          key={b.key}
          className="bubble animate-rise"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
