module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:next/recommended", 
      "next/core-web-vitals", // Next.js 推奨設定を追加
    ],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: "module",
    },
    settings: {
      react: {
        version: "detect", // React バージョンを自動検出
      },
    },
    rules: {
      "indent": ["error", 2],
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "no-unused-vars": "warn",
      "no-console": "warn",
      "eqeqeq": ["error", "always"],
      "react/react-in-jsx-scope": "off", // React 17+ では不要
      "react/prop-types": "off", // TypeScript を使用する場合は無効化
      "no-empty-pattern": "error", // 空のオブジェクトパターンをエラーとして設定
      "no-irregular-whitespace": "error", // 不規則な空白をエラーとして設定
      "@next/next/no-html-link-for-pages": "off", 
    },
  };
  