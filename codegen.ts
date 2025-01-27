import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      "lib/schema.ts": {
        noRequire: true,
      },
    },
  ],
  documents: "./lib/graphql/**/*.graphql",
  generates: {
    "./lib/gql/": {
      preset: "client",
      plugins: [],
    },
    "./lib/resolvers-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
