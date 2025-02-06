import Link from "next/link";

import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <section className=" bg-white">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="font-clash_grotesk text-3xl font-extrabold  md:text-4xl">
          Beautifully designed components <br className="hidden sm:inline" />
          built with Radix UI and & Tailwind CSS.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 13 Ready.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href={siteConfig.links.docs}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Documentation
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "default" })}
        >
          GitHub
        </Link>
      </div>
    </section>
  );
}
