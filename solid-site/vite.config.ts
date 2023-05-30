import solid from "solid-start/vite";
import { defineConfig } from "vite";
import awsAdapter from "solid-start-aws";

export default defineConfig({
  plugins: [solid({ adapter: awsAdapter() })],
});
