# ABYNÉA — Boutique e-commerce

🌐 **Site en ligne : https://abynea.github.io/abynea-shop/**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Abynea/abynea-shop)

Boutique en ligne complète pour **ABYNÉA**, marque française d'accessoires de mode & tech chic :
bijoux en acier inoxydable waterproof, coques iPhone MagSafe et petite maroquinerie.

Design épuré (beige / or / blanc), **100 % mobile-first**, pensé pour une cible venue de TikTok et Instagram.

---

## ✨ Fonctionnalités

- **Page d'accueil** : bannière héros, réassurance, best-sellers, univers catégories, carrousel UGC « Vu sur TikTok », newsletter.
- **Catalogue** `/boutique` : filtres (catégorie, prix, couleur, modèle d'iPhone) + tri (prix, nouveautés, notes).
- **Fiche produit** `/produit/[slug]` : galerie avec zoom, sélecteur de variantes (couleur / modèle), alerte stock, accordéons, recommandations.
- **Panier latéral** (slide-over) : barre de progression livraison offerte, quantités, calcul temps réel.
- **Checkout 1 page** `/checkout` : formulaire validé, choix du transporteur, code promo, sélecteur de moyen de paiement.
- **Paiement** : **Stripe** (carte bancaire + Apple Pay / Google Pay / Link via Payment Element) **et PayPal** (paiement express). **Mode démo** automatique et fonctionnel sans aucune clé.
- **Confirmation** `/confirmation` : récapitulatif, numéro de commande, suivi de colis.
- **Pages annexes** : Notre Histoire, Livraison & Retours, FAQ, Contact, Compte, CGV, Mentions Légales, Politique de retour, 404.
- **SEO** : métadonnées, Open Graph, `sitemap.xml`, `robots.txt`.

## 🧱 Stack technique

| Domaine        | Technologie                                     |
| -------------- | ----------------------------------------------- |
| Framework      | Next.js 14 (App Router) + React 18 + TypeScript |
| Style          | Tailwind CSS                                     |
| Icônes         | Lucide React                                     |
| Animations     | Framer Motion                                    |
| État global    | Zustand (+ persistance `localStorage`)           |
| Paiement       | Stripe (`@stripe/react-stripe-js`) + PayPal (`@paypal/react-paypal-js`) |
| Données        | Catalogue typé local (`src/data/products.ts`)    |

## 🚀 Démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev
# → http://localhost:3000
```

### Variables d'environnement (optionnelles)

L'application fonctionne **sans aucune variable** : le paiement est alors **simulé** (mode démo) et le parcours client reste 100 % fonctionnel. Pour activer les paiements réels :

```bash
cp .env.example .env.local
# puis renseignez les clés ci-dessous
```

| Variable                             | Description                                                                 |
| ------------------------------------ | --------------------------------------------------------------------------- |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clé publique Stripe (navigateur) — active carte + Apple/Google Pay.         |
| `STRIPE_SECRET_KEY`                  | Clé secrète Stripe (serveur) — création des PaymentIntents.                  |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID`       | Client ID PayPal (navigateur) — affiche les boutons PayPal.                  |
| `PAYPAL_CLIENT_SECRET`               | Secret PayPal (serveur) — création/capture des commandes.                    |
| `PAYPAL_ENV`                         | `live` pour la production, sinon sandbox par défaut.                         |
| `NEXT_PUBLIC_SITE_URL`               | URL publique du site (sitemap, robots, redirections).                        |

> 💡 **Carte de test Stripe** : `4242 4242 4242 4242`, date future, CVC quelconque.
> 💡 **PayPal Sandbox** : créez un compte de test sur https://developer.paypal.com/dashboard/accounts

### Modes de paiement

| Méthode                  | Sans clé (démo)     | Avec clés                            |
| ------------------------ | ------------------- | ------------------------------------ |
| Carte bancaire (Stripe)  | ✅ simulé           | ✅ Payment Element + Apple/Google Pay |
| PayPal                   | ✅ simulé           | ✅ boutons PayPal express             |

### Codes promo de démonstration

| Code        | Remise |
| ----------- | ------ |
| `ABYNEA10`  | -10 %  |
| `WELCOME10` | -10 %  |
| `TIKTOK15`  | -15 %  |

## 📜 Scripts

```bash
npm run dev        # Serveur de développement
npm run build      # Build de production
npm start          # Serveur de production
npm run lint       # ESLint
npm run typecheck  # Vérification TypeScript
```

## 📁 Structure

```
src/
├── app/                    # Routes (App Router)
│   ├── api/                #   Routes API (checkout, payment-intent, paypal, newsletter)
│   ├── boutique/           #   Catalogue
│   ├── produit/[slug]/     #   Fiche produit dynamique
│   ├── checkout/           #   Commande
│   ├── confirmation/       #   Confirmation
│   └── …                   #   Pages annexes
├── components/
│   ├── layout/             # Header, Footer, AnnouncementBar, …
│   ├── product/            # ProductCard, galerie, filtres, …
│   ├── cart/               # CartDrawer, CheckoutClient, …
│   ├── checkout/           # StripePaymentSection, PayPalPaymentSection
│   ├── home/               # Sections de la page d'accueil
│   └── ui/                 # Primitives (StarRating, Reveal)
├── data/products.ts        # Catalogue de démonstration (12 produits)
├── lib/                    # utils, types, constantes, stripe, payments
├── store/                  # Stores Zustand (panier, devise)
└── hooks/                  # Hooks partagés
```

## 🌐 Déploiement

### Option 1 — Hébergement Node.js (Vercel, Railway…) — paiements réels

Recommandé pour encaisser réellement : les routes API (`/api/payment-intent`, `/api/paypal`) doivent s'exécuter côté serveur.

```bash
npm run build && npm start
```

Sur Vercel : importez le dépôt, renseignez les clés Stripe/PayPal dans *Environment Variables*, puis déployez.

### Option 2 — GitHub Pages (statique) — vitrine + démo

🌐 https://abynea.github.io/abynea-shop/

Export statique servi depuis la branche `gh-pages` :

```bash
STATIC_EXPORT=true NEXT_PUBLIC_BASE_PATH=/abynea-shop npm run build
# puis publier le dossier `out/` sur la branche `gh-pages`
```

> ⚠️ En statique, il n'y a pas de serveur : le paiement bascule automatiquement en **mode démo** côté client. Pour encaisser, utilisez l'option 1.

---

© ABYNÉA — Fait avec ♥ à Paris.
