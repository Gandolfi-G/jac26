import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Si le dépôt GitHub ne s'appelle pas "rallye-enigmes",
// modifiez uniquement cette constante avant de publier sur GitHub Pages.
const repoName = "rallye-enigmes";

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === "production" ? `/${repoName}/` : "/",
});
