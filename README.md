This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Light Mode to Dark Mode Color Mapping

### Text Colors

| Light Mode      | Dark Mode          |
| --------------- | ------------------ |
| `text-white`    | `text-neutral-500` |
| `text-zinc-300` | `text-neutral-400` |
| `text-zinc-500` | `text-neutral-200` |
| `text-zinc-900` | `text-neutral-100` |

### Background Colors

| Light Mode           | Dark Mode               | Description                  |
| -------------------- | ----------------------- | ---------------------------- |
| `bg-white`           | `bg-neutral-900`        | General background           |
| `bg-white`           | `bg-neutral-600`        | Buttons/Interactive elements |
| `bg-zinc-50`         | `bg-neutral-800`        | Container background         |
| `bg-zinc-100`        | `bg-neutral-800`        |                              |
| `bg-zinc-100:hover`  | `bg-neutral-800:hover`  |                              |
| `bg-zinc-100:active` | `bg-neutral-800:active` |                              |
| `bg-zinc-200`        | `bg-neutral-700`        |                              |
| `bg-zinc-300`        | `bg-neutral-600`        |                              |

### Border Colors

| Light Mode        | Dark Mode            |
| ----------------- | -------------------- |
| `border-zinc-300` | `border-neutral-500` |

### Divider Colors

| Light Mode | Dark Mode            |
| ---------- | -------------------- |
| `divide-*` | `divide-neutral-500` |

### Accent Colors

| Light Mode        | Dark Mode            | Description              |
| ----------------- | -------------------- | ------------------------ |
| `accent-zinc-900` | `accent-neutral-300` | Excluding radio elements |
