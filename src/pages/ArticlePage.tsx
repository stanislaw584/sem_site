import { ArrowLeft } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getArticle } from "../content";
import { NotFoundPage } from "./NotFoundPage";

export function ArticlePage() {
  const { slug = "" } = useParams();
  const article = getArticle(slug);

  if (slug === "index") {
    return <Navigate to="/" replace />;
  }

  if (!article) {
    return <NotFoundPage />;
  }

  document.title = `${article.title} | SEM Student Guide`;

  return (
    <article className="article-page" data-pagefind-body>
      <Link className="back-link" to="/">
        <ArrowLeft size={18} aria-hidden="true" />
        На главную
      </Link>
      <div className="article-header">
        <p className="eyebrow">{article.source}</p>
        <h1>{article.title}</h1>
        {article.summary ? <p>{article.summary}</p> : null}
      </div>
      <div className="article-layout">
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />
        <aside className="article-aside" aria-label="Информация о странице">
          <h2>Страница</h2>
          {article.lastReviewed ? <p>Проверить актуальность: {article.lastReviewed}</p> : null}
          {article.related?.length ? (
            <>
              <h2>Связанные разделы</h2>
              {article.related.map((slug) => {
                const related = getArticle(slug);
                return related ? (
                  <Link key={slug} to={`/${related.slug}`}>
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

