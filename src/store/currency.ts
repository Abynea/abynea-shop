"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CurrencyCode = "EUR" | "USD" | "GBP";

type CurrencyMeta = {
  code: CurrencyCode;
  label: string;
  symbol: string;
  /** Taux indicatif depuis l'euro (démo) */
  rate: number;
};

export const CURRENCIES: Record<CurrencyCode, CurrencyMeta> = {
  EUR: { code: "EUR", label: "Euro", symbol: "€", rate: 1 },
  USD: { code: "USD", label: "Dollar US", symbol: "$", rate: 1.08 },
  GBP: { code: "GBP", label: "Livre", symbol: "£", rate: 0.85 },
};

type CurrencyState = {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  convert: (amountEur: number) => number;
};

export const useCurrency = create<CurrencyState>()(
  persist(
    (set, get) => ({
      currency: "EUR",
      setCurrency: (code) => set({ currency: code }),
      convert: (amountEur) => {
        const rate = CURRENCIES[get().currency].rate;
        return Math.round(amountEur * rate * 100) / 100;
      },
    }),
    { name: "abynea-currency" }
  )
);
