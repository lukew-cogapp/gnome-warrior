import { defineConfig } from 'vite';

// Base path = repo name. Override via VITE_BASE if hosting elsewhere.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/gnome-warrior/',
});
