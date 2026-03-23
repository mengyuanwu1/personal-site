import { Fragment } from "react";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { StyledImage } from "./components/StyledImage";
import { siteContent } from "../content/site";
import { withBasePath } from "../lib/sitePaths";

function highlightOwnName(authors: string) {
  const ownName = "Wu, Mengyuan";

  if (!authors.includes(ownName)) {
    return authors;
  }

  return authors.split(ownName).map((part, index) => (
    <Fragment key={`${part}-${index}`}>
      {index > 0 ? <strong>{ownName}</strong> : null}
      {part}
    </Fragment>
  ));
}

function PublicationLinkIcon({ icon }: { icon?: string }) {
  if (icon === "preprint") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.75 3.5h6.59l4.16 4.16V19.5A1.5 1.5 0 0 1 17 21H7a1.5 1.5 0 0 1-1.5-1.5v-14A2 2 0 0 1 7.5 3.5h.25Zm6.25 1.81V8h2.69L14 5.31ZM9 11.25a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5H9Zm0 3.5a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5H9Z" />
      </svg>
    );
  }

  if (icon === "explore") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.98 8.02 9.9 10.1a1 1 0 0 0-.55.55l-2.08 5.08a.75.75 0 0 0 .98.98l5.08-2.08a1 1 0 0 0 .55-.55l2.08-5.08a.75.75 0 0 0-.98-.98ZM12 3.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17Zm0 1.5a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z" />
      </svg>
    );
  }

  return null;
}

function SocialIcon({ kind }: { kind: "linkedin" | "github" | "orcid" | "googleScholar" | "email" }) {
  if (kind === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.94 8.5H3.56V20h3.38V8.5Zm.23-3.56a1.96 1.96 0 1 0-3.92 0 1.96 1.96 0 0 0 3.92 0ZM20 12.87c0-3.46-1.85-5.07-4.31-5.07-1.99 0-2.88 1.09-3.38 1.86V8.5H8.94c.04.77 0 11.5 0 11.5h3.37v-6.42c0-.34.03-.68.13-.92.27-.68.88-1.38 1.9-1.38 1.34 0 1.88 1.03 1.88 2.54V20H20v-7.13Z" />
      </svg>
    );
  }

  if (kind === "github") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.51 2.87 8.34 6.84 9.69.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.36 1.11 2.94.84.09-.67.35-1.11.64-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.72 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.36 1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.46.1 2.72.64.71 1.03 1.62 1.03 2.74 0 3.93-2.34 4.79-4.57 5.04.36.32.68.93.68 1.88 0 1.36-.01 2.45-.01 2.78 0 .27.18.6.69.49A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
      </svg>
    );
  }

  if (kind === "orcid") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="8.1" cy="8.15" r="1.15" />
        <path d="M7.2 10.4h1.8V16H7.2v-5.6Zm4.1 0c2.9 0 4.7 1.1 4.7 3.3 0 1.4-.74 2.39-1.97 2.87l2.06 3.1h-2.2l-1.74-2.76h-.92v2.76h-1.98v-9.3h2.05Z" />
      </svg>
    );
  }

  if (kind === "googleScholar") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m12 4 9 5-9 5-9-5 9-5Z" />
        <path d="M6.5 11.7V15c0 1.82 2.43 3.3 5.5 3.3s5.5-1.48 5.5-3.3v-3.3L12 14.7l-5.5-3Z" />
        <path d="M20 10v5.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 6.75A1.75 1.75 0 0 1 4.75 5h14.5A1.75 1.75 0 0 1 21 6.75v10.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25V6.75Zm1.9-.25L12 11.48 19.1 6.5H4.9Zm14.6 1.84-6.93 4.85a1 1 0 0 1-1.14 0L4.5 8.34v8.91c0 .14.11.25.25.25h14.5a.25.25 0 0 0 .25-.25V8.34Z" />
    </svg>
  );
}

function SocialLink({
  href,
  kind,
  label,
}: {
  href?: string;
  kind: "linkedin" | "github" | "orcid" | "googleScholar" | "email";
  label: string;
}) {
  const icon = <SocialIcon kind={kind} />;

  if (!href) {
    return (
      <span
        aria-label={`${label} placeholder`}
        className="social-icon-button social-icon-placeholder"
        data-label={label}
      >
        {icon}
      </span>
    );
  }

  const isMailto = href.startsWith("mailto:");

  return (
    <a
      aria-label={label}
      className="social-icon-button"
      data-label={label}
      href={href}
      rel={isMailto ? undefined : "noreferrer"}
      target={isMailto ? undefined : "_blank"}
    >
      {icon}
    </a>
  );
}

export default function Home() {
  return (
    <main className="page-shell">
      <SiteHeader currentPath="/" />

      <section
        aria-hidden="true"
        className="landing-hero"
        style={{ backgroundImage: `url("${withBasePath("/home_banner.png")}")` }}
      />

      <section className="editorial-section intro-section section-split" id="about">
        <div className="section-aside intro-aside">
            <p className="eyebrow">About</p>
            <div className="section-rule" style={{ ["--rule-width" as string]: "5.5ch" }} />
            <h2 className="intro-name">{siteContent.name}</h2>
            <p className="intro-aside-tags">{siteContent.heroTags.join(" • ")}</p>
            <div className="intro-socials" aria-label="Social links">
              <SocialLink href={siteContent.socialLinks.linkedin} kind="linkedin" label="LinkedIn" />
              <SocialLink href={siteContent.socialLinks.github} kind="github" label="GitHub" />
              <SocialLink href={siteContent.socialLinks.orcid} kind="orcid" label="ORCID" />
              <SocialLink
                href={siteContent.socialLinks.googleScholar}
                kind="googleScholar"
                label="Google Scholar"
              />
              <SocialLink href={siteContent.socialLinks.email} kind="email" label="Email" />
            </div>
        </div>
          <div className="section-main intro-content">
            <div className="center-rule" />
            <div className="editorial-prose">
              <p>
                I am a <b>first-year Ph.D. student in Computer Science</b> at Columbia University,
                advised by Prof. Xuhai &ldquo;Orson&rdquo; Xu in the{" "}
                <a href="https://sea-lab.space/" target="_blank" rel="noreferrer">
                  SEA Lab
                </a>
                . My research spans{" "}
                <b>human-computer interaction, AI agents, multimodal machine learning, and everyday sensing</b>.
                I design and engineer human-AI systems end-to-end and study how these systems can be made robust enough
                for real-world deployment through <b>in-the-wild longitudinal studies</b>. I am
                especially interested in building efficient systems and models that support personalization, productivity, and
                behavior change in real-world settings.
              </p>
              <p>
                I also work as a part-time full-stack developer at{" "}
                <a href="https://equahealth.io/" target="_blank" rel="noreferrer">
                  Equa Health
                </a>
                , a CMU-based startup. In my free time, I like to tinker with creative software and hardware
                projects that could bring a positive impact. Additionally, I'm a huge foodie and love to explore different restaurants in NYC.
              </p>
            </div>
          </div>
      </section>

      <section className="editorial-section section-split" id="publications">
        <div className="section-aside">
          <p className="eyebrow">Publications</p>
          <div className="section-rule" style={{ ["--rule-width" as string]: "12ch" }} />
        </div>
        <div className="section-main editorial-list-section">
          <div className="citation-list">
            {siteContent.publications.map((item) => (
              <article className="citation-item" key={`${item.year}-${item.title}`}>
                <div>
                  <h3>{item.title}</h3>
                  <p className="citation-authors">{highlightOwnName(item.authors)}</p>
                  <p className="citation-venue">{item.venue}</p>
                  {item.note ? (
                    <p className="citation-note citation-award">
                      <span aria-hidden="true">🏆</span>
                      <span>{item.note}</span>
                    </p>
                  ) : null}
                  {item.links?.length ? (
                    <div className="citation-actions">
                      {item.links.map((link) => (
                        <a
                          aria-label={link.label}
                          className="citation-action"
                          data-label={link.label}
                          href={link.href}
                          key={link.label}
                          rel="noreferrer"
                          target="_blank"
                        >
                          <PublicationLinkIcon icon={link.icon} />
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section section-split" id="news">
        <div className="section-aside">
          <p className="eyebrow">News</p>
          <div className="section-rule" style={{ ["--rule-width" as string]: "4.75ch" }} />
        </div>
        <div className="section-main editorial-list-section">
          <ul className="news-list">
            {siteContent.news.map((item) => (
              <li className="news-item" key={`${item.date}-${item.title ?? item.linkText}`}>
                <span className="news-date">{item.date}:</span>{" "}
                {item.linkHref ? (
                  <>
                    {item.titlePrefix}
                    <a href={item.linkHref} target="_blank" rel="noreferrer">
                      {item.linkText}
                    </a>
                    {item.titleSuffix}
                  </>
                ) : (
                  item.title
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="editorial-section section-split" id="projects">
        <div className="section-aside">
          <p className="eyebrow">Projects</p>
          <div className="section-rule" style={{ ["--rule-width" as string]: "7ch" }} />
        </div>
        <div className="section-main project-grid">
          {siteContent.projects.map((project) => (
            <article className="project-card" key={project.title}>
              <StyledImage
                alt={project.title}
                className="project-image"
                frameClassName="project-image-frame"
                src={project.image}
              />
              <div className="project-body">
                <div className="project-head">
                  <h3>{project.title}</h3>
                  <span>{project.note}</span>
                </div>
                <p>{project.description}</p>
                {project.link ? (
                  <a className="text-link" href={project.link} target="_blank" rel="noreferrer">
                    View project
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
