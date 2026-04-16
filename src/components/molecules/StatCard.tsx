type StatCardProps = {
  label: string;
  value: string | number;
  helper?: string;
};

export function StatCard({ label, value, helper }: StatCardProps) {
  return (
    <article className="rounded-2xl border border-white/40 bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </p>

      <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-900">
        {value}
      </h3>

      {helper ? (
        <p className="mt-2 text-sm text-zinc-500">{helper}</p>
      ) : null}
    </article>
  );
}