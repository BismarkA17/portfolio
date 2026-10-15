// Static export for GitHub Pages. The deploy workflow sets
// NEXT_PUBLIC_BASE_PATH (e.g. "/portfolio") so links and assets resolve
// under the repo's sub-path. Locally it's empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};
