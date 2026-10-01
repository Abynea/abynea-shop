# AGENTS.md — ABYNÉA

Boutique e-commerce Next.js 14 (App Router) + TypeScript + Tailwind, mobile-first.

## Commandes

```bash
npm run dev            # dev server
npm run typecheck      # tsc --noEmit (doit rester à 0 erreur)
npm run lint           # next lint (doit rester clean)
npm run build          # build serveur (API routes actives)

# Export statique pour GitHub Pages
STATIC_EXPORT=true NEXT_PUBLIC_BASE_PATH=/abynea-shop npm run build   # -> out/
```

## Déploiement

- **Repo** : https://github.com/Abynea/abynea-shop (owner `Abynea`).
- **GitHub Pages** : https://abynea.github.io/abynea-shop/ — servi depuis la branche `gh-pages` (racine), build_type `legacy`.
- Le PAT disponible n'a **pas** le scope `workflow` : ne pas ajouter de fichier `.github/workflows/*`, déployer en poussant `out/` sur `gh-pages` (force push).
- En statique il n'y a pas de serveur : le paiement bascule en **mode démo** côté client. Les vrais encaissements nécessitent un hébergement Node (Vercel).

## Paiements

- Stripe : `src/components/checkout/StripePaymentSection.tsx` (Payment Element + Express Checkout Apple/Google Pay), API `/api/payment-intent`.
- PayPal : `src/components/checkout/PayPalPaymentSection.tsx`, API `/api/paypal` (create/capture).
- Logique de totaux partagée : `src/lib/payments.ts`. Calcul panier : `src/components/cart/CheckoutClient.tsx` (`Math.round` sur le total).
- Sans clés → réponse `{ mode: "demo", orderNumber, trackingNumber }`. Ne jamais exposer `STRIPE_SECRET_KEY` / `PAYPAL_CLIENT_SECRET` au client.
- Variables : voir `.env.example` (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_ENV`).

## Conventions

- Produits de démo : `src/data/products.ts` (12 produits, textes FR).
- Store panier Zustand persistant : `src/store/`.
- Charte : fond `#FAFAFA`, texte `#111111`, accent or `#D4AF37`, titres serif (Playfair), corps sans-serif.
