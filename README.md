# ABYNÉA — Boutique e-commerce

Boutique en ligne complète pour **ABYNÉA**, marque française d'accessoires de mode & tech chic :
bijoux en acier inoxydable waterproof, coques iPhone MagSafe et petite maroquinerie.

Design épuré (beige / or / blanc), **100 % mobile-first**, pensé pour une cible venue de TikTok et Instagram.

---

## ✨ Fonctionnalités

- **Page d'accueil** : bannière héros, réassurance, best-sellers, univers catégories, carrousel UGC « Vu sur TikTok », newsletter.
- **Catalogue** `/boutique` : filtres (catégorie, prix, couleur, modèle d'iPhone) + tri (prix, nouveautés, notes).
- **Fiche produit** `/produit/[slug]` : galerie avec zoom, sélecteur de variantes (couleur / modèle), alerte stock, accordéons, recommandations.
- **Panier latéral** (slide-over) : barre de progression livraison offerte, quantités, calcul temps réel.
- **Checkout 1 page** `/checkout` : formulaire validé, choix du transporteur, code promo, paiement.
- **Paiement** : intégration **Stripe** (Checkout Session) + **mode démo** automatique sans clé.
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
| Paiement       | Stripe                                           |
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

L'application fonctionne **sans aucune variable** (paiement simulé). Pour activer le paiement réel :

```bash
cp .env.example .env.local
# puis renseignez STRIPE_SECRET_KEY
```

| Variable               | Description                                                   |
| ---------------------- | ------------------------------------------------------------- |
| `STRIPE_SECRET_KEY`    | Clé secrète Stripe (test ou live). Absente → paiement simulé. |
| `NEXT_PUBLIC_SITE_URL` | URL publique du site (sitemap, robots, redirections Stripe).  |

> 💡 **Carte de test Stripe** : `4242 4242 4242 4242`, date future, CVC quelconque.

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
│   ├── api/                #   Routes API (checkout, newsletter)
│   ├── boutique/           #   Catalogue
│   ├── produit/[slug]/     #   Fiche produit dynamique
│   ├── checkout/           #   Commande
│   ├── confirmation/       #   Confirmation
│   └── …                   #   Pages annexes
├── components/
│   ├── layout/             # Header, Footer, AnnouncementBar, …
│   ├── product/            # ProductCard, galerie, filtres, …
│   ├── cart/               # CartDrawer, CheckoutClient, …
│   ├── home/               # Sections de la page d'accueil
│   └── ui/                 # Primitives (StarRating, Reveal)
├── data/products.ts        # Catalogue de démonstration (12 produits)
├── lib/                    # utils, types, constantes, stripe
├── store/                  # Stores Zustand (panier, devise)
└── hooks/                  # Hooks partagés
```

## 🌐 Déploiement

Le projet est prêt pour **Vercel** (ou tout hébergeur Node.js) :

```bash
npm run build && npm start
```

Sur Vercel : importez le dépôt, ajoutez éventuellement `STRIPE_SECRET_KEY`, puis déployez.

---

© ABYNÉA — Fait avec ♥ à Paris.
