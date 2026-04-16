type RatingFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

const ratingOptions = ["1", "2", "3", "4", "5"];

export function RatingField({
  label,
  value,
  onChange,
  error,
}: RatingFieldProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
        {label}
      </label>

      <div className="flex flex-wrap gap-3">
        {ratingOptions.map((option) => {
          const isSelected = value === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`flex h-12 w-12 items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 ${
                isSelected
                  ? "bg-violet-700 text-white shadow-md shadow-violet-200"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {error ? (
        <p role="alert" className="mt-1 text-sm font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}