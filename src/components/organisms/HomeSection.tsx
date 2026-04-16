import { Button } from "../atoms/Button";

export function HomeSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
          Sua biblioteca pessoal
        </p>

        <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-zinc-900">
          Organize seus livros, acompanhe leituras e registre notas.
        </h2>

        <p className="mt-4 text-lg leading-relaxed text-zinc-600">
          O Folha Lida é sua estante virtual para cadastrar livros, registrar
          anotações de leitura e visualizar métricas da sua jornada literária.
        </p>


        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/login" variant="primary">
            Entrar
          </Button>

          <Button href="/register" variant="secondary">
            Criar conta
          </Button>
        </div>

      </div>
    </section>
  );
}