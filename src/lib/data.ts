export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  repo: string;
  category: "Infrastructure" | "Backend / DevOps" | "Full-stack";
  highlights: string[];
};

export const projects: Project[] = [
  {
    slug: "homelab",
    title: "HomeLab",
    tagline: "A self-hosted infrastructure lab with full observability",
    description:
      "A Proxmox-based homelab running multiple VMs and LXC containers, with Terraform-managed infra (via LocalStack), a Prometheus + Grafana + Loki monitoring stack, Tailscale networking, and tested disaster-recovery runbooks.",
    tech: ["Proxmox", "Terraform", "Prometheus", "Grafana", "Loki", "Tailscale"],
    repo: "https://github.com/SwapnajXD/HomeLab",
    category: "Infrastructure",
    highlights: [
      "Full observability stack: Prometheus, Grafana, Loki, Grafana Alloy",
      "Infrastructure as code with Terraform, using LocalStack to test safely",
      "Disaster recovery tested and documented with runbooks",
    ],
  },
  {
    slug: "cloud-sentinel",
    title: "Cloud Sentinel",
    tagline: "Automated AWS security auditing across services",
    description:
      "A microservice-based tool that scans an AWS account for common misconfigurations — unencrypted S3 buckets, exposed EC2 security groups, missing IAM MFA — and surfaces them on a live dashboard.",
    tech: ["Next.js", "Node.js", "Python", "Redis", "PostgreSQL", "Nginx"],
    repo: "https://github.com/SwapnajXD/Cloud-Sentinel",
    category: "Backend / DevOps",
    highlights: [
      "Flags exposed S3 buckets, open security groups, and missing MFA",
      "Gateway + worker + queue architecture (Node/TS, Python, Redis)",
      "Dashboard built with Next.js, backed by PostgreSQL",
    ],
  },
  {
    slug: "slugstream",
    title: "SlugStream",
    tagline: "A production-minded URL shortener",
    description:
      "A full containerized URL-shortening service with slug conflict protection, blocked-extension safety checks, and a clean React frontend, all orchestrated with Docker Compose.",
    tech: ["React", "Vite", "Node.js", "Express", "PostgreSQL", "Redis", "Nginx"],
    repo: "https://github.com/SwapnajXD/SlugStream",
    category: "Full-stack",
    highlights: [
      "Slug conflict detection and blocked-extension protection",
      "Fully containerized: frontend, API, database, cache, reverse proxy",
      "Production-minded touches beyond a typical student project",
    ],
  },
];

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

export type Experience = {
  title: string;
  org: string;
  note: string;
  link?: string;
  status?: "in progress";
};

export const certifications: Experience[] = [
  {
    title: "Deloitte Australia — Technology Job Simulation",
    org: "Forage",
    note: "Completed a simulated technology consulting engagement covering client requirements analysis and a proposed solution.",
  },
  {
    title: "Deloitte Australia — Data Analytics Job Simulation",
    org: "Forage",
    note: "Analyzed a client dataset to identify trends and presented findings in a written recommendation.",
  },
  {
    title: "AWS Cloud Quest: Cloud Practitioner",
    org: "AWS Educate",
    note: "Hands-on scenario-based training across core AWS services.",
  },
  {
    title: "Getting Started with Compute",
    org: "AWS Educate",
    note: "Foundational training on AWS compute services (EC2, Lambda basics).",
  },
  {
    title: "Introduction to Linux (LFS101)",
    org: "Linux Foundation",
    note: "Core Linux administration and command-line fundamentals.",
    status: "in progress",
  },
];

export const journeyRepo = {
  title: "DevOps journey",
  description:
    "A running log of what I'm learning in cloud and DevOps — notes, small experiments, and scripts, updated regularly.",
  link: "https://github.com/SwapnajXD",
};
