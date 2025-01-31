# Stack Underflow

This repo contains code for a website that is similar stackoverflow site. It uses MERN architecture but with Next.js & Graphql.

## How to run this program?

### Codesandbox setup

- **Step 1:**

  [![Edit af4oz/stack-underflow/main](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/af4oz/stack-underflow/main?embed=1)

  Wait for VM bootup process....

- **Step 2:** Create a local branch on your codesandbox account.
- **Step 3:**  
  Run `npm run dev`

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
