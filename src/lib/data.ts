export type SkillGroup = {
  label: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["Python", "TypeScript", "JavaScript", "Bash", "SQL"] },
  { label: "Frameworks", items: ["Next.js", "React", "Node.js", "Express"] },
  {
    label: "DevOps & Cloud",
    items: ["Docker", "Terraform", "AWS", "GitHub Actions", "Prometheus", "Grafana", "Linux"],
  },
  { label: "Tools", items: ["Git", "Nginx", "Redis", "PostgreSQL", "Tailscale"] },
];

export const journeyRepo = {
  title: "DevOps journey",
  description:
    "A running log of what I'm learning in cloud and DevOps — notes, small experiments, and scripts, updated regularly.",
  link: "https://github.com/SwapnajXD/DevOps.git",
};