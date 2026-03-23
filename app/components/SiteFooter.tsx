import { siteContent } from "../../content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>{siteContent.name}</p>
    </footer>
  );
}
