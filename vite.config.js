import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
});