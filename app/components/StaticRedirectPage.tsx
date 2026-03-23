"use client";

import Link from "next/link";
import { useEffect } from "react";

type StaticRedirectPageProps = {
  href: string;
  label: string;
};

export function StaticRedirectPage({ href, label }: StaticRedirectPageProps) {
  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return (
    <main className="page-shell" style={{ paddingTop: "6rem" }}>
      <p>
        Redirecting to <Link href={href}>{label}</Link>...
      </p>
    </main>
  );
}
