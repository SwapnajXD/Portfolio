import type { ArchitectureDiagramData } from "@/components/ArchitectureDiagram";
import { cloudSentinel } from "./cloud-sentinel";
import { homelab } from "./homelab";
import { aliasly } from "./aliasly";
import { receipt } from "./receipt";

// Add a new project's diagram by creating architectures/<slug>.ts
// (copy the shape of any existing file) and registering it below.
export const architectures: Record<string, ArchitectureDiagramData> = {
  "cloud-sentinel": cloudSentinel,
  homelab,
  aliasly,
  receipt,
};
