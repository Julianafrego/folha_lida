import type { PropsWithChildren, ReactNode } from "react";

type ModalProps = PropsWithChildren<{
  title: string;
  description?: string;
  onClose: () => void;
  maxWidthClass?: string;
  headerAction?: ReactNode;
}>;

export function Modal({
  title,
  description,
  onClose,
  maxWidthClass = "max-w-3xl",
  headerAction,
  children,
}: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
      <div
        className={`relative max-h-[90vh] w-full overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-10 ${maxWidthClass}`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-xl text-zinc-600 transition hover:bg-zinc-200"
          aria-label="Fechar modal"
        >
          ×
        </button>

        <div className="mb-8 pr-12">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                {title}
              </h2>

              {description ? (
                <p className="mt-2 text-zinc-500">{description}</p>
              ) : null}
            </div>

            {headerAction}
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}