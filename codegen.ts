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
    "./src/lib/__generated__/graphql.tsx": {
      // preset: "client-preset", // TODO: use this instead of below plugins
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
      }
    },
    "./src/server/__generated__/resolvers-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
