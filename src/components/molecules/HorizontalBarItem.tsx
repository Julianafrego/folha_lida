import { useEffect, useState } from "react";

type HorizontalBarItemProps = {
  label: string;
  value: number;
  maxValue: number;
};

export function HorizontalBarItem({
  label,
  value,
  maxValue,
}: HorizontalBarItemProps) {
  
  const [barWidth, setBarWidth] = useState(0);


  const targetWidth = maxValue > 0 ? (value / maxValue) * 100 : 0;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setBarWidth(targetWidth);
    }, 50);

    return () => window.clearTimeout(timer);
  }, [targetWidth]);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="truncate font-medium text-zinc-800">{label}</span>
        <span className="shrink-0 text-zinc-500">{value}</span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200">
        <div
          className="h-full rounded-full bg-violet-600 transition-all duration-700 ease-out"
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  );
}