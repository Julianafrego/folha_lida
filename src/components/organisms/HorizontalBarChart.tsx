import { HorizontalBarItem } from "@/components/molecules/HorizontalBarItem";

type ChartItem = {
  label: string;
  value: number;
};

type HorizontalBarChartProps = {
  title: string;
  description?: string;
  items: ChartItem[];
  emptyMessage?: string;
};

export function HorizontalBarChart({
  title,
  description,
  items,
  emptyMessage = "Ainda não há dados suficientes.",
}: HorizontalBarChartProps) {
  const maxValue = Math.max(...items.map((item) => item.value), 0);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-lg font-bold tracking-tight text-zinc-900">
          {title}
        </h2>

        {description ? (
          <p className="mt-1 text-sm text-zinc-500">{description}</p>
        ) : null}
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-zinc-500">{emptyMessage}</p>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <HorizontalBarItem
              key={item.label}
              label={item.label}
              value={item.value}
              maxValue={maxValue}
            />
          ))}
        </div>
      )}
    </section>
  );
}