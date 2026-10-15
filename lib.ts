export const site = {
  name: "Bismark Attatsi",
  email: "bis.attatsi@gmail.com",
  github: "https://github.com/BismarkA17",
  linkedin: "https://www.linkedin.com/in/bismark-attatsi-b29214234",
  cv: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/Bismark-Attatsi-CV.pdf`,
  pulsewatchRepo: "https://github.com/BismarkA17/pulse-watch",
  applypilotRepo: "https://github.com/BismarkA17/ApplyPilot",
  analyticsRepo: "https://github.com/BismarkA17/business-revenue-dashboard",
};

/** Prefix a /public path with the GitHub Pages base path. */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
