import type { PropsWithChildren } from "react";

type AuthTemplateProps = PropsWithChildren<{
  title: string;
}>;

export function AuthTemplate({ title, children }: AuthTemplateProps) {
  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-6 text-2xl font-bold text-purple-800">{title}</h1>
      {children}
    </main>
  );
}