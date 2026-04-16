type BrandProps = {
  title?: string;
};

export function Brand({ title = "Folha Lida" }: BrandProps) {
  return <h1 className="text-xl font-bold text-purple-800">{title}</h1>;
}