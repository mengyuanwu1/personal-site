import Link from "next/link";
import { siteContent } from "../../content/site";

export function SiteHeader({ currentPath }: { currentPath: string }) {
  return (
    <header className="site-header">
      <Link aria-label={siteContent.name} className="brand" href="/">
        <img
          alt={siteContent.logoMark}
          className="brand-logo"
          height="61"
          src={siteContent.logoImage}
          width="100"
        />
      </Link>

      <nav className="site-nav" aria-label="Primary">
        {siteContent.navigation.map((item) =>
          item.external ? (
            <a href={item.href} key={item.label} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ) : item.href.startsWith("/#") ? (
            <a href={item.href} key={item.label}>
              {item.label}
            </a>
          ) : (
            <Link
              aria-current={currentPath === item.href ? "page" : undefined}
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ),
        )}
      </nav>
    </header>
  );
}
