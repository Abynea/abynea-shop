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
- ⚠️ Le `GITHUB_TOKEN` de l'environnement est en lecture seule (403 « Resource not accessible by integration » sur toute écriture git/API). Pour pousser, utiliser un PAT utilisateur fourni par l'utilisateur :
  `git -c credential.helper= push "https://x-access-token:<PAT>@github.com/Abynea/abynea-shop.git" <branche>`
- En statique il n'y a pas de serveur : le paiement bascule en **mode démo** côté client. Les vrais encaissements nécessitent un hébergement Node (Vercel).

## Logo & favicons

- `src/components/ui/Logo.tsx` : `Logo` (wordmark SVG, `viewBox 0 0 200 50`, étincelle or au-dessus du É) et `LogoMark` (monogramme « A » pour le carré).
- `variant="light"` = version blanche, utilisée par `src/components/layout/BrandBand.tsx` (bandeau encre en fin de `/notre-histoire`).
- Icônes générées par `python3 scripts/generate-icons.py` (nécessite Pillow) → `src/app/favicon.ico`, `src/app/icon.svg`, `src/app/apple-icon.png`, `public/favicon-32.png`.
- Le favicon `icon.svg` est statique : le garder synchronisé avec `LogoMark` si le monogramme change.
- Image de partage social `public/og-image.png` (1200×630) générée par `python3 scripts/generate-og-image.py` (polices Playfair/Inter dans `/tmp`). Métadonnées Open Graph + Twitter (`summary_large_image`) dans `src/app/layout.tsx`, URL absolue via `metadataBase` (`NEXT_PUBLIC_SITE_URL`).

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
