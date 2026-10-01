import type { Metadata } from "next";
import { AccountClient } from "@/components/layout/AccountClient";

export const metadata: Metadata = {
  title: "Mon compte",
  robots: { index: false, follow: false },
};

export default function ComptePage() {
  return <AccountClient />;
}
