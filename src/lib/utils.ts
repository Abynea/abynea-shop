import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number, currency = "EUR", locale = "fr-FR") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function generateOrderNumber() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `ABY-${stamp}${rand}`;
}

export function generateTrackingNumber() {
  return `LP${Math.floor(100000000 + Math.random() * 899999999)}FR`;
}

export function estimatedDelivery(daysMin = 2, daysMax = 4) {
  const fmt = (d: number) => {
    const date = new Date();
    date.setDate(date.getDate() + d);
    return date.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  };
  return `${fmt(daysMin)} – ${fmt(daysMax)}`;
}
