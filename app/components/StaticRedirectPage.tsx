"use client";

import { useEffect } from "react";
import { withBasePath } from "../../lib/sitePaths";

type StaticRedirectPageProps = {
  href: string;
  label: string;
};

export function StaticRedirectPage({ href, label }: StaticRedirectPageProps) {
  const targetHref = withBasePath(href);

  useEffect(() => {
    window.location.replace(targetHref);
  }, [targetHref]);

  return (
    <main className="page-shell" style={{ paddingTop: "6rem" }}>
      <p>
        Redirecting to <a href={targetHref}>{label}</a>...
      </p>
    </main>
  );
}
