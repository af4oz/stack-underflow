# Stack Underflow

An attempt at building Stackoverflow clone without a UI library, using prisma-orm and others.

## How to run this program?

### Codesandbox setup

- **Step 1:**

  [![Edit af4oz/stack-underflow/main](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/af4oz/stack-underflow/main?embed=1)

  Wait for VM bootup process & Setup task completion....

- **Step 2:** Create a local branch on your codesandbox account.
- **Step 3:**
  If all setup tasks are succesfull
  Run `npm run dev`
  else
  Run `npm run prisma:setup && npm run build && npm run dev`

### Local Setup

**Please Note:** I have already loaded `.env` file with required variables, But be sure to check [.env.example](./.env.example) and add required `.env` files.

```sh
# Install Dependencies
npm install

# Start Mongodb replica set with docker-compose.yml

# Check Environment variables

# Setup Prisma
npx prisma generate && npx prisma db push

# Build App
npm run build

# Start Dev server
npm run dev
```

## TODO
- fix: Add E2E testing with playwright/cypress
- fix: Remove `Only alphanumeric characters & dash are allowed` on tags 🥲
- fix: Use transactions/others to ensure data consistency
- fix: Add pagination to pages/users.tsx and others
- `defaultProps` issues: See https://github.com/airbnb/babel-plugin-inline-react-svg/issues/126
- fix: check .graphql files on client and optimize server resolvers and relevant types
  - Fix type issues/mismatches between resolvers & schema.ts
- fix: `hook.js:608 Warning: Prop `className` did not match. Server: "sc-isRoRg goqrFR" Client: "sc-hRJfrW eNOCPs"`
- fix: Accepted answer tickmark is not showing up to other users (Related [Lines of code](https://github.com/af4oz/stack-underflow/blob/a6cb56aa617515afa2dcd27c6c1081c0a2cc7f41/src/server/prisma/schema.prisma#L19C1-L20C21))
- feat: Implement/Hide sorting by `Hot` tab (currently it's sorting by default:"Newest")
