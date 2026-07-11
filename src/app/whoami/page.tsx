import type { Metadata } from "next";
import WhoAmIReveal from "@/components/WhoAmIReveal";

export const metadata: Metadata = {
  title: "whoami",
  robots: { index: false, follow: false },
};

export default function WhoAmI() {
  return <WhoAmIReveal />;
}
