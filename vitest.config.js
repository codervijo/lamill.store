// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    // genai/ is the pre-port TanStack source kept for reference — not part of this build.
    exclude: ['**/node_modules/**', 'genai/**'],
  },
});
