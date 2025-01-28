import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      "./src/server/schema.ts": {
        noRequire: true,
      },
    },
  ],
  documents: "./src/lib/graphql/**/*.graphql",
  generates: {
    "./src/lib/__generated__/": {
      preset: "client",
      plugins: [],
    },
    "./src/server/__generated__/resolvers-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
