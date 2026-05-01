import type { ReactNode } from "react";
import { MetaverseTransition } from "@/components/motion/MetaverseTransition";

export default function Template({ children }: { children: ReactNode }) {
  return <MetaverseTransition>{children}</MetaverseTransition>;
}