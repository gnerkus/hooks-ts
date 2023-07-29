"use client";
import { Metadata } from "next";
import { SQLClientProvider } from "@nanotome/hooks-ts";
import QueryRunner from "../components/QueryRunner";

const CARD_CONTENT = [
  {
    title: "Caching Tasks",
    href: "https://turbo.build/repo/docs/core-concepts/caching",
    cta: "Read More",
  },
  {
    title: "Running Tasks",
    href: "https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks",
    cta: "Read More",
  },
  {
    title: "Configuration Options",
    href: "https://turbo.build/repo/docs/reference/configuration",
    cta: "Read More",
  },
];

export const metadata: Metadata = {
  title: "Web - Turborepo Example",
};

export default function Home() {
  return (
    <SQLClientProvider>
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <main className="mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8">
          <h3 className="mx-auto text-center text-md tracking-tight sm:text-4xl lg:text-5xl xl:text-5xl">
            <QueryRunner />
          </h3>
        </main>
      </div>
    </SQLClientProvider>
  );
}
