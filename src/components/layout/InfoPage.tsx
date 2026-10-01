import Link from "next/link";

type Section = { heading: string; body: string[] };

export function InfoPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  sections: Section[];
}) {
  return (
    <article className="container-x max-w-3xl py-12 md:py-16">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">{title}</h1>
      {intro && <p className="mt-4 text-sm leading-relaxed text-ink-muted">{intro}</p>}

      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-serif text-xl text-ink">{s.heading}</h2>
            <div className="mt-3 space-y-3">
              {s.body.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-ink-muted">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-sand p-6 text-center">
        <p className="font-serif text-lg text-ink">Une question ?</p>
        <p className="mt-1 text-sm text-ink-muted">Notre équipe vous répond sous 24h ouvrées.</p>
        <Link href="/contact" className="btn-dark mt-4">
          Nous contacter
        </Link>
      </div>
    </article>
  );
}
