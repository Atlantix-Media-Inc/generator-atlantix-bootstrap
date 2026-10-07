export default {
  COMMIT_LINT: {
    '@commitlint/cli': '^19.6.0',
    '@commitlint/config-conventional': '^19.6.0',
  },
  JEST: {
    jest: '^29.7.0',
    'jest-environment-jsdom': '^29.7.0',
    '@testing-library/react': '^15.0.0',
    '@testing-library/dom': '^10.4.0',
    '@testing-library/jest-dom': '^6.6.3',
    'ts-node': '^10.9.2',
    '@types/jest': '^29.5.12'
  },
  HUSKY: {
    husky: '^9.1.7',
  },
  DEBUGGER: {
    'dev': 'NODE_OPTIONS=\"--inspect\" next dev',
  },
  LIT: {
    "@lit-labs/rollup-plugin-minify-html-literals": "^0.2.0",
    "@rollup/plugin-node-resolve": "^16.0.3",
    "@rollup/plugin-terser": "^1.0.0",
    "@rollup/plugin-typescript": "^12.3.0",
    "rollup": "^4.63.6",
    "rollup-plugin-minify-html-literals": "^1.2.6",
    "rollup-plugin-summary": "^3.0.1",
    "rollup-plugin-terser": "^7.0.2",
    "tslib": "^2.8.1",
    "typescript": "~6.0.2",
    "vite": "^8.3.0",
    "vite-plugin-dts": "^5.1.0"
  },
  WEB_COMPONENT_SCRIPTS: {
    "dev": "vite",
    "build": "rollup -c rollup.config.js",
    "preview": "vite preview"
  },
  WEB_COMPONENT_EXPORTS: {
    ".": {
      "types": "./dist/types/index.d.ts",
      "default": "./dist/index.js"
    }
  },
  WEB_COMPONENT_MAIN: {
    "private": false,
    "main": "./dist/index.bundle.js",
    "module": "./dist/index.bundle.js",
    "types": "./dist/types/index.d.ts"
  }
};
