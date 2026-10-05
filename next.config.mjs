import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

process.env.NEXT_IGNORE_INCORRECT_LOCKFILE = "1";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
