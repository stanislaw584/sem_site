import { ArrowLeft } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { PageVisual } from "../components/PageVisual";
import { getArticle } from "../content";
import { useLang } from "../i18n";
import { NotFoundPage } from "./NotFoundPage";

export function ArticlePage() {
  const { slug = "" } = useParams();
  const { t } = useLang();
  const article = getArticle(slug);

  if (slug === "index") {
    return <Navigate to="/" replace />;
  }

  if (!article) {
    return <NotFoundPage />;
  }

  document.title = `${article.title} | ${t.brand}`;

  return (
    <article className="article-page" data-pagefind-body>
      <Link className="back-link" to="/">
        <ArrowLeft size={18} aria-hidden="true" />
        {t.backToHome}
      </Link>
      <div className="article-header">
        <p className="eyebrow">{article.source}</p>
        <h1>{article.title}</h1>
        {article.summary ? <p>{article.summary}</p> : null}
      </div>
      <PageVisual slug={article.slug} />
      <div className="article-layout">
        <div
          className="article-content"
          // content is generated from project markdown files, not user input
          dangerouslySetInnerHTML={{ __html: article.html }}
        />
        <aside className="article-aside" aria-label={t.asideAriaLabel}>
          <h2>{t.page}</h2>
          {article.lastReviewed ? (
            <p>
              {t.checkRelevance}: {article.lastReviewed}
            </p>
          ) : null}
          {article.related?.length ? (
            <>
              <h2>{t.relatedSections}</h2>
              {article.related.map((relSlug) => {
                const related = getArticle(relSlug);
                return related ? (
                  <Link key={relSlug} to={`/${related.slug}`}>
                    {related.title}
                  </Link>
                ) : null;
              })}
            </>
          ) : null}
        </aside>
      </div>
    </article>
  );
}
