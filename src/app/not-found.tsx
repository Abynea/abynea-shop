import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-serif text-6xl text-gold sm:text-7xl">404</p>
      <h1 className="mt-4 font-serif text-2xl text-ink sm:text-3xl">Cette page s'est perdue…</h1>
      <p className="mt-3 max-w-md text-sm text-ink-muted">
        La page que vous recherchez n'existe pas ou a été déplacée. Retournez à l'accueil ou explorez notre boutique.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-dark">
          Retour à l'accueil
        </Link>
        <Link href="/boutique" className="btn-outline">
          Voir la boutique
        </Link>
      </div>
    </div>
  );
}
