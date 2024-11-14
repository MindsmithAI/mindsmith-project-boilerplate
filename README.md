This is a boilerplate for the frontend stack that Mindsmith uses. It has typescript, tailwind, nextjs, shadcn/ui already configured. The goal is to get you the boilerplate that you would get if we added you to our main repo but without the distractions of the rest of the codebase.

This project uses shadcn/ui for the components, but doesn't have any of them installed yet. You can find the components you want to use [here](https://ui.shadcn.com/docs/components). And install them with the commands they have ex: `npx shadcn@latest add accordion`

Mindsmith currently uses the pages router, but you can use the app router if you want, which is what this boilerplate uses.

(general nextjs stuff below)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
