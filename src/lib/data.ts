export type SkillGroup = {
  label: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["Python", "TypeScript", "JavaScript", "Bash", "SQL", "HCL"] },
  { label: "Frameworks", items: ["Next.js", "React", "Vite", "Node.js", "Express", "FastAPI"] },
  {
    label: "DevOps & Cloud",
    items: [
      "Docker",
      "Terraform",
      "AWS",
      "GitHub Actions",
      "Prometheus",
      "Grafana",
      "Grafana Alloy",
      "Loki",
      "Proxmox",
      "k3s",
      "Linux",
    ],
  },
  { label: "Tools", items: ["Git", "Nginx", "Redis", "PostgreSQL", "Tailscale", "JWT", "ngrok"] },
];

export const journeyRepo = {
  title: "DevOps journey",
  description:
    "A running log of what I'm learning in cloud and DevOps — notes, small experiments, and scripts, updated regularly.",
  link: "https://github.com/SwapnajXD/DevOps.git",
};