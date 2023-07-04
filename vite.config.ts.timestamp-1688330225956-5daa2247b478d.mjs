// vite.config.ts
import { defineConfig } from "file:///home/walid/Documents/Mes_projets/semanticMap/node_modules/vite/dist/node/index.js";
import { resolve as resolve2 } from "path";
import preact from "file:///home/walid/Documents/Mes_projets/semanticMap/node_modules/@preact/preset-vite/dist/esm/index.mjs";

// scripts/make-manifest.ts
import * as fs from "fs";
import * as path from "path";

// package.json
var package_default = {
  name: "chrome-extension-template-preact-vite",
  version: "0.0.1",
  description: "Chrome extension template with Preact, Tailwind CSS, Vite and Typescript preconfigured.",
  license: "MIT",
  repository: {
    type: "git",
    url: "https://github.com/fell-lucas/chrome-extension-template-preact-vite.git"
  },
  scripts: {
    build: "vite build",
    dev: "nodemon",
    test: "jest",
    "test:cov": "jest --coverage",
    format: "prettier src/ scripts/ --write"
  },
  type: "module",
  devDependencies: {
    "@babel/core": "^7.21.0",
    "@babel/plugin-proposal-class-properties": "^7.18.6",
    "@babel/plugin-transform-react-jsx": "^7.21.0",
    "@babel/preset-env": "^7.20.2",
    "@preact/preset-vite": "^2.5.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/preact": "^3.0.0",
    "@types/chrome": "^0.0.235",
    "@types/jest": "^29.0.0",
    "@types/node": "^18.0.0",
    "@typescript-eslint/eslint-plugin": "^5.54.1",
    "@typescript-eslint/parser": "^5.54.1",
    autoprefixer: "^10.4.14",
    "babel-jest": "^29.0.0",
    eslint: "^8.35.0",
    "eslint-config-preact": "^1.3.0",
    "eslint-config-prettier": "^8.7.0",
    "eslint-plugin-import": "^2.27.5",
    "eslint-plugin-jsx-a11y": "^6.7.1",
    "eslint-plugin-prettier": "^4.2.1",
    jest: "^27.0.0",
    "jest-environment-jsdom": "^29.5.0",
    "jest-preset-preact": "^4.0.5",
    nodemon: "^2.0.21",
    postcss: "^8.4.21",
    preact: "^10.13.0",
    "preact-render-to-string": "^5.0.0",
    prettier: "^2.8.4",
    "prettier-plugin-tailwindcss": "^0.2.4",
    tailwindcss: "^3.2.7",
    typescript: "^5.0.0",
    vite: "^4.0.0"
  },
  eslintConfig: {
    env: {
      browser: true,
      es6: true,
      node: true
    },
    extends: [
      "preact",
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: "latest",
      sourceType: "module"
    },
    plugins: [
      "@typescript-eslint"
    ],
    globals: {
      chrome: "readonly"
    },
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
      "prettier/prettier": [
        "warn",
        {
          singleQuote: true,
          jsxSingleQuote: true,
          trailingComma: "es5",
          arrowParens: "avoid"
        }
      ]
    }
  },
  dependencies: {
    htmlparser2: "^9.0.0",
    "modern-errors": "^6.0.0"
  }
};

// src/manifest.ts
var manifest = {
  manifest_version: 3,
  name: package_default.name,
  version: package_default.version,
  description: package_default.description,
  options_page: "src/options/index.html",
  permissions: ["activeTab", "scripting"],
  background: { service_worker: "src/background/index.js" },
  action: {
    default_popup: "src/popup/index.html",
    default_icon: "icon-34.png"
  },
  chrome_url_overrides: {
    newtab: "src/newtab/index.html"
  },
  icons: {
    "128": "icon-128.png"
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/content/index.js"]
    }
  ],
  devtools_page: "src/devtools/index.html",
  web_accessible_resources: [
    {
      resources: ["icon-128.png", "icon-34.png"],
      matches: []
    }
  ]
};
var manifest_default = manifest;

// scripts/color-log.ts
function colorLog(message, type) {
  let color = type || COLORS.FgBlack;
  switch (type) {
    case "success":
      color = COLORS.FgGreen;
      break;
    case "info":
      color = COLORS.FgBlue;
      break;
    case "error":
      color = COLORS.FgRed;
      break;
    case "warning":
      color = COLORS.FgYellow;
      break;
  }
  console.log(color, message);
}
var COLORS = {
  Reset: "\x1B[0m",
  Bright: "\x1B[1m",
  Dim: "\x1B[2m",
  Underscore: "\x1B[4m",
  Blink: "\x1B[5m",
  Reverse: "\x1B[7m",
  Hidden: "\x1B[8m",
  FgBlack: "\x1B[30m",
  FgRed: "\x1B[31m",
  FgGreen: "\x1B[32m",
  FgYellow: "\x1B[33m",
  FgBlue: "\x1B[34m",
  FgMagenta: "\x1B[35m",
  FgCyan: "\x1B[36m",
  FgWhite: "\x1B[37m",
  BgBlack: "\x1B[40m",
  BgRed: "\x1B[41m",
  BgGreen: "\x1B[42m",
  BgYellow: "\x1B[43m",
  BgBlue: "\x1B[44m",
  BgMagenta: "\x1B[45m",
  BgCyan: "\x1B[46m",
  BgWhite: "\x1B[47m"
};

// scripts/make-manifest.ts
var __vite_injected_original_dirname = "/home/walid/Documents/Mes_projets/semanticMap/scripts";
var { resolve } = path;
var outDir = resolve(__vite_injected_original_dirname, "..", "public");
function makeManifest() {
  return {
    name: "make-manifest",
    buildEnd() {
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
      }
      const manifestPath = resolve(outDir, "manifest.json");
      fs.writeFileSync(manifestPath, JSON.stringify(manifest_default, null, 2));
      colorLog(`
Manifest file copy complete: ${manifestPath}`, "success");
    }
  };
}

// vite.config.ts
var __vite_injected_original_dirname2 = "/home/walid/Documents/Mes_projets/semanticMap";
var src = resolve2(__vite_injected_original_dirname2, "src");
var assetsDir = resolve2(src, "assets");
var outDir2 = resolve2(__vite_injected_original_dirname2, "dist");
var publicDir = resolve2(__vite_injected_original_dirname2, "public");
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@src": src,
      "@assets": assetsDir
    }
  },
  plugins: [makeManifest(), preact()],
  publicDir,
  build: {
    outDir: outDir2,
    rollupOptions: {
      input: {
        content: resolve2(src, "content", "index.ts"),
        background: resolve2(src, "background", "index.ts"),
        popup: resolve2(src, "popup", "index.html"),
        newtab: resolve2(src, "newtab", "index.html"),
        devtools: resolve2(src, "devtools", "index.html"),
        options: resolve2(src, "options", "index.html")
      },
      output: {
        entryFileNames: (chunk) => `src/${chunk.name}/index.js`
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic2NyaXB0cy9tYWtlLW1hbmlmZXN0LnRzIiwgInBhY2thZ2UuanNvbiIsICJzcmMvbWFuaWZlc3QudHMiLCAic2NyaXB0cy9jb2xvci1sb2cudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS93YWxpZC9Eb2N1bWVudHMvTWVzX3Byb2pldHMvc2VtYW50aWNNYXBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3dhbGlkL0RvY3VtZW50cy9NZXNfcHJvamV0cy9zZW1hbnRpY01hcC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS93YWxpZC9Eb2N1bWVudHMvTWVzX3Byb2pldHMvc2VtYW50aWNNYXAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCBwcmVhY3QgZnJvbSAnQHByZWFjdC9wcmVzZXQtdml0ZSc7XG5pbXBvcnQgbWFrZU1hbmlmZXN0IGZyb20gJy4vc2NyaXB0cy9tYWtlLW1hbmlmZXN0JztcblxuY29uc3Qgc3JjID0gcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKTtcbmNvbnN0IGFzc2V0c0RpciA9IHJlc29sdmUoc3JjLCAnYXNzZXRzJyk7XG5jb25zdCBvdXREaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgJ2Rpc3QnKTtcbmNvbnN0IHB1YmxpY0RpciA9IHJlc29sdmUoX19kaXJuYW1lLCAncHVibGljJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0BzcmMnOiBzcmMsXG4gICAgICAnQGFzc2V0cyc6IGFzc2V0c0RpcixcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbbWFrZU1hbmlmZXN0KCksIHByZWFjdCgpXSxcbiAgcHVibGljRGlyLFxuICBidWlsZDoge1xuICAgIG91dERpcixcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBpbnB1dDoge1xuICAgICAgICBjb250ZW50OiByZXNvbHZlKHNyYywgJ2NvbnRlbnQnLCAnaW5kZXgudHMnKSxcbiAgICAgICAgYmFja2dyb3VuZDogcmVzb2x2ZShzcmMsICdiYWNrZ3JvdW5kJywgJ2luZGV4LnRzJyksXG4gICAgICAgIHBvcHVwOiByZXNvbHZlKHNyYywgJ3BvcHVwJywgJ2luZGV4Lmh0bWwnKSxcbiAgICAgICAgbmV3dGFiOiByZXNvbHZlKHNyYywgJ25ld3RhYicsICdpbmRleC5odG1sJyksXG4gICAgICAgIGRldnRvb2xzOiByZXNvbHZlKHNyYywgJ2RldnRvb2xzJywgJ2luZGV4Lmh0bWwnKSxcbiAgICAgICAgb3B0aW9uczogcmVzb2x2ZShzcmMsICdvcHRpb25zJywgJ2luZGV4Lmh0bWwnKSxcbiAgICAgIH0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6IGNodW5rID0+IGBzcmMvJHtjaHVuay5uYW1lfS9pbmRleC5qc2AsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvd2FsaWQvRG9jdW1lbnRzL01lc19wcm9qZXRzL3NlbWFudGljTWFwL3NjcmlwdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3dhbGlkL0RvY3VtZW50cy9NZXNfcHJvamV0cy9zZW1hbnRpY01hcC9zY3JpcHRzL21ha2UtbWFuaWZlc3QudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvd2FsaWQvRG9jdW1lbnRzL01lc19wcm9qZXRzL3NlbWFudGljTWFwL3NjcmlwdHMvbWFrZS1tYW5pZmVzdC50c1wiO2ltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgbWFuaWZlc3QgZnJvbSAnLi4vc3JjL21hbmlmZXN0JztcbmltcG9ydCBjb2xvckxvZyBmcm9tICcuL2NvbG9yLWxvZyc7XG5cbmNvbnN0IHsgcmVzb2x2ZSB9ID0gcGF0aDtcblxuY29uc3Qgb3V0RGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsICcuLicsICdwdWJsaWMnKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZU1hbmlmZXN0KCkge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICdtYWtlLW1hbmlmZXN0JyxcbiAgICBidWlsZEVuZCgpIHtcbiAgICAgIGlmICghZnMuZXhpc3RzU3luYyhvdXREaXIpKSB7XG4gICAgICAgIGZzLm1rZGlyU3luYyhvdXREaXIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtYW5pZmVzdFBhdGggPSByZXNvbHZlKG91dERpciwgJ21hbmlmZXN0Lmpzb24nKTtcblxuICAgICAgZnMud3JpdGVGaWxlU3luYyhtYW5pZmVzdFBhdGgsIEpTT04uc3RyaW5naWZ5KG1hbmlmZXN0LCBudWxsLCAyKSk7XG5cbiAgICAgIGNvbG9yTG9nKGBcXG5NYW5pZmVzdCBmaWxlIGNvcHkgY29tcGxldGU6ICR7bWFuaWZlc3RQYXRofWAsICdzdWNjZXNzJyk7XG4gICAgfSxcbiAgfTtcbn1cbiIsICJ7XG4gIFwibmFtZVwiOiBcImNocm9tZS1leHRlbnNpb24tdGVtcGxhdGUtcHJlYWN0LXZpdGVcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjFcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkNocm9tZSBleHRlbnNpb24gdGVtcGxhdGUgd2l0aCBQcmVhY3QsIFRhaWx3aW5kIENTUywgVml0ZSBhbmQgVHlwZXNjcmlwdCBwcmVjb25maWd1cmVkLlwiLFxuICBcImxpY2Vuc2VcIjogXCJNSVRcIixcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9mZWxsLWx1Y2FzL2Nocm9tZS1leHRlbnNpb24tdGVtcGxhdGUtcHJlYWN0LXZpdGUuZ2l0XCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImJ1aWxkXCI6IFwidml0ZSBidWlsZFwiLFxuICAgIFwiZGV2XCI6IFwibm9kZW1vblwiLFxuICAgIFwidGVzdFwiOiBcImplc3RcIixcbiAgICBcInRlc3Q6Y292XCI6IFwiamVzdCAtLWNvdmVyYWdlXCIsXG4gICAgXCJmb3JtYXRcIjogXCJwcmV0dGllciBzcmMvIHNjcmlwdHMvIC0td3JpdGVcIlxuICB9LFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGJhYmVsL2NvcmVcIjogXCJeNy4yMS4wXCIsXG4gICAgXCJAYmFiZWwvcGx1Z2luLXByb3Bvc2FsLWNsYXNzLXByb3BlcnRpZXNcIjogXCJeNy4xOC42XCIsXG4gICAgXCJAYmFiZWwvcGx1Z2luLXRyYW5zZm9ybS1yZWFjdC1qc3hcIjogXCJeNy4yMS4wXCIsXG4gICAgXCJAYmFiZWwvcHJlc2V0LWVudlwiOiBcIl43LjIwLjJcIixcbiAgICBcIkBwcmVhY3QvcHJlc2V0LXZpdGVcIjogXCJeMi41LjBcIixcbiAgICBcIkB0ZXN0aW5nLWxpYnJhcnkvamVzdC1kb21cIjogXCJeNS4xNi41XCIsXG4gICAgXCJAdGVzdGluZy1saWJyYXJ5L3ByZWFjdFwiOiBcIl4zLjAuMFwiLFxuICAgIFwiQHR5cGVzL2Nocm9tZVwiOiBcIl4wLjAuMjM1XCIsXG4gICAgXCJAdHlwZXMvamVzdFwiOiBcIl4yOS4wLjBcIixcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjE4LjAuMFwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNS41NC4xXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjUuNTQuMVwiLFxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMTRcIixcbiAgICBcImJhYmVsLWplc3RcIjogXCJeMjkuMC4wXCIsXG4gICAgXCJlc2xpbnRcIjogXCJeOC4zNS4wXCIsXG4gICAgXCJlc2xpbnQtY29uZmlnLXByZWFjdFwiOiBcIl4xLjMuMFwiLFxuICAgIFwiZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl44LjcuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1pbXBvcnRcIjogXCJeMi4yNy41XCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLWpzeC1hMTF5XCI6IFwiXjYuNy4xXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXByZXR0aWVyXCI6IFwiXjQuMi4xXCIsXG4gICAgXCJqZXN0XCI6IFwiXjI3LjAuMFwiLFxuICAgIFwiamVzdC1lbnZpcm9ubWVudC1qc2RvbVwiOiBcIl4yOS41LjBcIixcbiAgICBcImplc3QtcHJlc2V0LXByZWFjdFwiOiBcIl40LjAuNVwiLFxuICAgIFwibm9kZW1vblwiOiBcIl4yLjAuMjFcIixcbiAgICBcInBvc3Rjc3NcIjogXCJeOC40LjIxXCIsXG4gICAgXCJwcmVhY3RcIjogXCJeMTAuMTMuMFwiLFxuICAgIFwicHJlYWN0LXJlbmRlci10by1zdHJpbmdcIjogXCJeNS4wLjBcIixcbiAgICBcInByZXR0aWVyXCI6IFwiXjIuOC40XCIsXG4gICAgXCJwcmV0dGllci1wbHVnaW4tdGFpbHdpbmRjc3NcIjogXCJeMC4yLjRcIixcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjMuMi43XCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMC4wXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjQuMC4wXCJcbiAgfSxcbiAgXCJlc2xpbnRDb25maWdcIjoge1xuICAgIFwiZW52XCI6IHtcbiAgICAgIFwiYnJvd3NlclwiOiB0cnVlLFxuICAgICAgXCJlczZcIjogdHJ1ZSxcbiAgICAgIFwibm9kZVwiOiB0cnVlXG4gICAgfSxcbiAgICBcImV4dGVuZHNcIjogW1xuICAgICAgXCJwcmVhY3RcIixcbiAgICAgIFwiZXNsaW50OnJlY29tbWVuZGVkXCIsXG4gICAgICBcInBsdWdpbjpAdHlwZXNjcmlwdC1lc2xpbnQvcmVjb21tZW5kZWRcIixcbiAgICAgIFwicGx1Z2luOnByZXR0aWVyL3JlY29tbWVuZGVkXCJcbiAgICBdLFxuICAgIFwicGFyc2VyXCI6IFwiQHR5cGVzY3JpcHQtZXNsaW50L3BhcnNlclwiLFxuICAgIFwicGFyc2VyT3B0aW9uc1wiOiB7XG4gICAgICBcImVjbWFGZWF0dXJlc1wiOiB7XG4gICAgICAgIFwianN4XCI6IHRydWVcbiAgICAgIH0sXG4gICAgICBcImVjbWFWZXJzaW9uXCI6IFwibGF0ZXN0XCIsXG4gICAgICBcInNvdXJjZVR5cGVcIjogXCJtb2R1bGVcIlxuICAgIH0sXG4gICAgXCJwbHVnaW5zXCI6IFtcbiAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50XCJcbiAgICBdLFxuICAgIFwiZ2xvYmFsc1wiOiB7XG4gICAgICBcImNocm9tZVwiOiBcInJlYWRvbmx5XCJcbiAgICB9LFxuICAgIFwicnVsZXNcIjoge1xuICAgICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXCI6IFwib2ZmXCIsXG4gICAgICBcInByZXR0aWVyL3ByZXR0aWVyXCI6IFtcbiAgICAgICAgXCJ3YXJuXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBcInNpbmdsZVF1b3RlXCI6IHRydWUsXG4gICAgICAgICAgXCJqc3hTaW5nbGVRdW90ZVwiOiB0cnVlLFxuICAgICAgICAgIFwidHJhaWxpbmdDb21tYVwiOiBcImVzNVwiLFxuICAgICAgICAgIFwiYXJyb3dQYXJlbnNcIjogXCJhdm9pZFwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImh0bWxwYXJzZXIyXCI6IFwiXjkuMC4wXCIsXG4gICAgXCJtb2Rlcm4tZXJyb3JzXCI6IFwiXjYuMC4wXCJcbiAgfVxufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS93YWxpZC9Eb2N1bWVudHMvTWVzX3Byb2pldHMvc2VtYW50aWNNYXAvc3JjXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS93YWxpZC9Eb2N1bWVudHMvTWVzX3Byb2pldHMvc2VtYW50aWNNYXAvc3JjL21hbmlmZXN0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3dhbGlkL0RvY3VtZW50cy9NZXNfcHJvamV0cy9zZW1hbnRpY01hcC9zcmMvbWFuaWZlc3QudHNcIjtpbXBvcnQgcGFja2FnZUpzb24gZnJvbSAnLi4vcGFja2FnZS5qc29uJztcbmltcG9ydCB7IE1hbmlmZXN0VHlwZSB9IGZyb20gJ0BzcmMvbWFuaWZlc3QtdHlwZSc7XG5cbmNvbnN0IG1hbmlmZXN0OiBNYW5pZmVzdFR5cGUgPSB7XG4gIG1hbmlmZXN0X3ZlcnNpb246IDMsXG4gIG5hbWU6IHBhY2thZ2VKc29uLm5hbWUsXG4gIHZlcnNpb246IHBhY2thZ2VKc29uLnZlcnNpb24sXG4gIGRlc2NyaXB0aW9uOiBwYWNrYWdlSnNvbi5kZXNjcmlwdGlvbixcbiAgb3B0aW9uc19wYWdlOiAnc3JjL29wdGlvbnMvaW5kZXguaHRtbCcsXG4gIHBlcm1pc3Npb25zOiBbJ2FjdGl2ZVRhYicsICdzY3JpcHRpbmcnXSxcbiAgYmFja2dyb3VuZDogeyBzZXJ2aWNlX3dvcmtlcjogJ3NyYy9iYWNrZ3JvdW5kL2luZGV4LmpzJyB9LFxuICBhY3Rpb246IHtcbiAgICBkZWZhdWx0X3BvcHVwOiAnc3JjL3BvcHVwL2luZGV4Lmh0bWwnLFxuICAgIGRlZmF1bHRfaWNvbjogJ2ljb24tMzQucG5nJyxcbiAgfSxcbiAgY2hyb21lX3VybF9vdmVycmlkZXM6IHtcbiAgICBuZXd0YWI6ICdzcmMvbmV3dGFiL2luZGV4Lmh0bWwnLFxuICB9LFxuICBpY29uczoge1xuICAgICcxMjgnOiAnaWNvbi0xMjgucG5nJyxcbiAgfSxcbiAgY29udGVudF9zY3JpcHRzOiBbXG4gICAge1xuICAgICAgbWF0Y2hlczogWydodHRwOi8vKi8qJywgJ2h0dHBzOi8vKi8qJywgJzxhbGxfdXJscz4nXSxcbiAgICAgIGpzOiBbJ3NyYy9jb250ZW50L2luZGV4LmpzJ10sXG4gICAgfSxcbiAgXSxcbiAgZGV2dG9vbHNfcGFnZTogJ3NyYy9kZXZ0b29scy9pbmRleC5odG1sJyxcbiAgd2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzOiBbXG4gICAge1xuICAgICAgcmVzb3VyY2VzOiBbJ2ljb24tMTI4LnBuZycsICdpY29uLTM0LnBuZyddLFxuICAgICAgbWF0Y2hlczogW10sXG4gICAgfSxcbiAgXSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1hbmlmZXN0O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS93YWxpZC9Eb2N1bWVudHMvTWVzX3Byb2pldHMvc2VtYW50aWNNYXAvc2NyaXB0c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvd2FsaWQvRG9jdW1lbnRzL01lc19wcm9qZXRzL3NlbWFudGljTWFwL3NjcmlwdHMvY29sb3ItbG9nLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3dhbGlkL0RvY3VtZW50cy9NZXNfcHJvamV0cy9zZW1hbnRpY01hcC9zY3JpcHRzL2NvbG9yLWxvZy50c1wiO3R5cGUgQ29sb3JUeXBlID0gJ3N1Y2Nlc3MnIHwgJ2luZm8nIHwgJ2Vycm9yJyB8ICd3YXJuaW5nJyB8IGtleW9mIHR5cGVvZiBDT0xPUlM7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbG9yTG9nKG1lc3NhZ2U6IHN0cmluZywgdHlwZT86IENvbG9yVHlwZSkge1xuICBsZXQgY29sb3I6IHN0cmluZyA9IHR5cGUgfHwgQ09MT1JTLkZnQmxhY2s7XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICBjb2xvciA9IENPTE9SUy5GZ0dyZWVuO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnaW5mbyc6XG4gICAgICBjb2xvciA9IENPTE9SUy5GZ0JsdWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdlcnJvcic6XG4gICAgICBjb2xvciA9IENPTE9SUy5GZ1JlZDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3dhcm5pbmcnOlxuICAgICAgY29sb3IgPSBDT0xPUlMuRmdZZWxsb3c7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIGNvbnNvbGUubG9nKGNvbG9yLCBtZXNzYWdlKTtcbn1cblxuY29uc3QgQ09MT1JTID0ge1xuICBSZXNldDogJ1xceDFiWzBtJyxcbiAgQnJpZ2h0OiAnXFx4MWJbMW0nLFxuICBEaW06ICdcXHgxYlsybScsXG4gIFVuZGVyc2NvcmU6ICdcXHgxYls0bScsXG4gIEJsaW5rOiAnXFx4MWJbNW0nLFxuICBSZXZlcnNlOiAnXFx4MWJbN20nLFxuICBIaWRkZW46ICdcXHgxYls4bScsXG4gIEZnQmxhY2s6ICdcXHgxYlszMG0nLFxuICBGZ1JlZDogJ1xceDFiWzMxbScsXG4gIEZnR3JlZW46ICdcXHgxYlszMm0nLFxuICBGZ1llbGxvdzogJ1xceDFiWzMzbScsXG4gIEZnQmx1ZTogJ1xceDFiWzM0bScsXG4gIEZnTWFnZW50YTogJ1xceDFiWzM1bScsXG4gIEZnQ3lhbjogJ1xceDFiWzM2bScsXG4gIEZnV2hpdGU6ICdcXHgxYlszN20nLFxuICBCZ0JsYWNrOiAnXFx4MWJbNDBtJyxcbiAgQmdSZWQ6ICdcXHgxYls0MW0nLFxuICBCZ0dyZWVuOiAnXFx4MWJbNDJtJyxcbiAgQmdZZWxsb3c6ICdcXHgxYls0M20nLFxuICBCZ0JsdWU6ICdcXHgxYls0NG0nLFxuICBCZ01hZ2VudGE6ICdcXHgxYls0NW0nLFxuICBCZ0N5YW46ICdcXHgxYls0Nm0nLFxuICBCZ1doaXRlOiAnXFx4MWJbNDdtJyxcbn0gYXMgY29uc3Q7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlULFNBQVMsb0JBQW9CO0FBQ3RWLFNBQVMsV0FBQUEsZ0JBQWU7QUFDeEIsT0FBTyxZQUFZOzs7QUNGa1UsWUFBWSxRQUFRO0FBQ3pXLFlBQVksVUFBVTs7O0FDRHRCO0FBQUEsRUFDRSxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsRUFDWCxhQUFlO0FBQUEsRUFDZixTQUFXO0FBQUEsRUFDWCxZQUFjO0FBQUEsSUFDWixNQUFRO0FBQUEsSUFDUixLQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsU0FBVztBQUFBLElBQ1QsT0FBUztBQUFBLElBQ1QsS0FBTztBQUFBLElBQ1AsTUFBUTtBQUFBLElBQ1IsWUFBWTtBQUFBLElBQ1osUUFBVTtBQUFBLEVBQ1o7QUFBQSxFQUNBLE1BQVE7QUFBQSxFQUNSLGlCQUFtQjtBQUFBLElBQ2pCLGVBQWU7QUFBQSxJQUNmLDJDQUEyQztBQUFBLElBQzNDLHFDQUFxQztBQUFBLElBQ3JDLHFCQUFxQjtBQUFBLElBQ3JCLHVCQUF1QjtBQUFBLElBQ3ZCLDZCQUE2QjtBQUFBLElBQzdCLDJCQUEyQjtBQUFBLElBQzNCLGlCQUFpQjtBQUFBLElBQ2pCLGVBQWU7QUFBQSxJQUNmLGVBQWU7QUFBQSxJQUNmLG9DQUFvQztBQUFBLElBQ3BDLDZCQUE2QjtBQUFBLElBQzdCLGNBQWdCO0FBQUEsSUFDaEIsY0FBYztBQUFBLElBQ2QsUUFBVTtBQUFBLElBQ1Ysd0JBQXdCO0FBQUEsSUFDeEIsMEJBQTBCO0FBQUEsSUFDMUIsd0JBQXdCO0FBQUEsSUFDeEIsMEJBQTBCO0FBQUEsSUFDMUIsMEJBQTBCO0FBQUEsSUFDMUIsTUFBUTtBQUFBLElBQ1IsMEJBQTBCO0FBQUEsSUFDMUIsc0JBQXNCO0FBQUEsSUFDdEIsU0FBVztBQUFB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QUNULE9BQU87QUFBQSxFQUNQLFNBQVM7QUFBQSxFQUNULFVBQVU7QUFBQSxFQUNWLFFBQVE7QUFBQSxFQUNSLFdBQVc7QUFBQSxFQUNYLFFBQVE7QUFBQSxFQUNSLFNBQVM7QUFDWDs7O0FIL0NBLElBQU0sbUNBQW1DO0FBS3pDLElBQU0sRUFBRSxRQUFRLElBQUk7QUFFcEIsSUFBTSxTQUFTLFFBQVEsa0NBQVcsTUFBTSxRQUFRO0FBRWpDLFNBQVIsZUFBZ0M7QUFDckMsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sV0FBVztBQUNULFVBQUksQ0FBSSxjQUFXLE1BQU0sR0FBRztBQUMxQixRQUFHLGFBQVUsTUFBTTtBQUFBLE1BQ3JCO0FBRUEsWUFBTSxlQUFlLFFBQVEsUUFBUSxlQUFlO0FBRXBELE1BQUcsaUJBQWMsY0FBYyxLQUFLLFVBQVUsa0JBQVUsTUFBTSxDQUFDLENBQUM7QUFFaEUsZUFBUztBQUFBLCtCQUFrQyxnQkFBZ0IsU0FBUztBQUFBLElBQ3RFO0FBQUEsRUFDRjtBQUNGOzs7QUR4QkEsSUFBTUMsb0NBQW1DO0FBS3pDLElBQU0sTUFBTUMsU0FBUUMsbUNBQVcsS0FBSztBQUNwQyxJQUFNLFlBQVlELFNBQVEsS0FBSyxRQUFRO0FBQ3ZDLElBQU1FLFVBQVNGLFNBQVFDLG1DQUFXLE1BQU07QUFDeEMsSUFBTSxZQUFZRCxTQUFRQyxtQ0FBVyxRQUFRO0FBRTdDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLFdBQVc7QUFBQSxJQUNiO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUyxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7QUFBQSxFQUNsQztBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBQUM7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLE9BQU87QUFBQSxRQUNMLFNBQVNGLFNBQVEsS0FBSyxXQUFXLFVBQVU7QUFBQSxRQUMzQyxZQUFZQSxTQUFRLEtBQUssY0FBYyxVQUFVO0FBQUEsUUFDakQsT0FBT0EsU0FBUSxLQUFLLFNBQVMsWUFBWTtBQUFBLFFBQ3pDLFFBQVFBLFNBQVEsS0FBSyxVQUFVLFlBQVk7QUFBQSxRQUMzQyxVQUFVQSxTQUFRLEtBQUssWUFBWSxZQUFZO0FBQUEsUUFDL0MsU0FBU0EsU0FBUSxLQUFLLFdBQVcsWUFBWTtBQUFBLE1BQy9DO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixnQkFBZ0IsV0FBUyxPQUFPLE1BQU07QUFBQSxNQUN4QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicmVzb2x2ZSIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJyZXNvbHZlIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgIm91dERpciJdCn0K
