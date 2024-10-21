import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.resolve.alias["pdfjs-dist"] = join(__dirname, "node_modules/pdfjs-dist/build/pdf.js");
    config.resolve.alias["pdfjs-dist/build/pdf.worker.entry"] = join(
      __dirname,
      "node_modules/pdfjs-dist/build/pdf.worker.js"
    );

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        http: false,
        https: false,
        url: false,
      };
    }

    return config;
  },
};

export default nextConfig;
