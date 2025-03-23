---
name: Dora AI
slug: kv-redis-starter
description: Dora-AI is an open-source no code webapp generator using AI.
framework: Next.js
useCase: Starter
css: Tailwind
database: Redis
---
### Clone and Deploy

Install deps

```bash
pnpm install
```

Once that's done, copy the .env.example file in this directory to .env.local (which will be ignored by Git):

```bash
cp .env.example .env.local
```

Then open `.env.local` and set the environment variables to match the ones in your Vercel Storage Dashboard.

Next, run Next.js in development mode:

```bash
pnpm dev
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples) ([Documentation](https://nextjs.org/docs/deployment)).
