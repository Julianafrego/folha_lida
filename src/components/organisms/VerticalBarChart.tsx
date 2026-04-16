type VerticalBarChartItem = {
  label: string;
  value: number;
};

type VerticalBarChartProps = {
  title: string;
  description?: string;
  items: VerticalBarChartItem[];
  emptyMessage?: string;
  highlightLabel?: string;
};

function getYAxisTicks(maxValue: number) {
  if (maxValue <= 0) return [0, 1];

  if (maxValue === 1) return [0, 1];
  if (maxValue === 2) return [0, 1, 2];
  if (maxValue === 3) return [0, 1, 2, 3];
  if (maxValue === 4) return [0, 1, 2, 3, 4];

  const steps = 4;
  const step = Math.ceil(maxValue / steps);
  const ticks: number[] = [];

  for (let value = 0; value <= maxValue; value += step) {
    ticks.push(value);
  }

  if (ticks[ticks.length - 1] !== maxValue) {
    ticks.push(maxValue);
  }

  return ticks;
}

export function VerticalBarChart({
  title,
  description,
  items,
  emptyMessage = "Ainda não há dados suficientes.",
  highlightLabel,
}: VerticalBarChartProps) {
  const maxValue = Math.max(...items.map((item) => item.value), 0);
  const totalValue = items.reduce((acc, item) => acc + item.value, 0);
  const averageValue = items.length > 0 ? totalValue / items.length : 0;

  const safeMaxValue = maxValue > 0 ? maxValue : 1;
  const ticks = getYAxisTicks(maxValue);

  return (
    <section className="rounded-[2rem] border border-violet-100 bg-white p-8 shadow-sm md:p-10">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>

          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-900">
            {title}
          </h2>

          {description ? (
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-500">
              {description}
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-6 self-start md:gap-8">
          <div className="text-right">
            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Média mensal
            </p>
            <p className="mt-1 text-3xl font-extrabold text-zinc-900">
              {averageValue.toFixed(1)}
            </p>
          </div>

          <div className="h-10 w-px bg-zinc-200" />

          <div className="text-right">
            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Total no ano
            </p>
            <p className="mt-1 text-3xl font-extrabold text-violet-700">
              {totalValue}
            </p>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-zinc-500">{emptyMessage}</p>
      ) : (
      <div className="overflow-x-auto">
        <div className="min-w-[300px]">
        <div className="grid grid-cols-[auto_1fr] gap-4">
          <div className="relative h-80">
            <div className="flex h-full flex-col justify-between pb-10">
              {ticks
                .slice()
                .reverse()
                .map((tick) => (
                  <div
                    key={tick}
                    className="flex translate-y-1/2 items-center justify-end text-sm font-semibold text-zinc-400"
                  >
                    {tick}
                  </div>
                ))}
            </div>
          </div>

          <div className="relative h-80">
            <div className="pointer-events-none absolute inset-0 pb-10">
              <div className="flex h-full flex-col justify-between">
                {ticks
                  .slice()
                  .reverse()
                  .map((tick) => (
                    <div
                      key={tick}
                      className="border-t border-dashed border-zinc-200"
                    />
                  ))}
              </div>
            </div>

            <div className="relative flex h-full items-end justify-between gap-3 pt-2">
              {items.map((item) => {
                const heightPercentage = (item.value / safeMaxValue) * 100;

                const isHighlighted = highlightLabel
                  ? item.label === highlightLabel
                  : item.value === maxValue && item.value > 0;

                return (
                  <div
                    key={item.label}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                  >
                    <div className="relative flex h-full w-full items-end justify-center pb-10">
                      <div className="absolute inset-x-0 bottom-10 top-0 rounded-2xl bg-zinc-50" />

                      <div
                        className={`relative z-10 w-full max-w-[46px] rounded-t-2xl transition-all duration-300 ${
                          isHighlighted
                            ? "bg-violet-600 shadow-[0_12px_30px_rgba(124,58,237,0.22)]"
                            : "bg-violet-200"
                        }`}
                        style={{
                          height: `${Math.max(
                            heightPercentage,
                            item.value > 0 ? 8 : 0
                          )}%`,
                        }}
                        title={`${item.label}: ${item.value}`}
                      />
                    </div>

                    <div className="text-center">
                      <p
                        className={`text-xs font-bold uppercase tracking-wide ${
                          isHighlighted ? "text-violet-700" : "text-zinc-400"
                        }`}
                      >
                        {item.label}
                      </p>
                      <p
                        className={`mt-1 text-xs ${
                          isHighlighted
                            ? "font-semibold text-violet-700"
                            : "text-zinc-500"
                        }`}
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        </div>
        </div>
      )}
    </section>
  );
}