import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SearchBox } from "../components/SearchBox";
import { Article, searchLocal } from "../content";
import { useLang } from "../i18n";

type PagefindResult = {
  data: () => Promise<{
    url: string;
    meta: { title?: string };
    excerpt: string;
  }>;
};

type PagefindModule = {
  search: (query: string) => Promise<{ results: PagefindResult[] }>;
};

type SearchResult = {
  title: string;
  url: string;
  excerpt: string;
};

// Dynamic import used to avoid bundler resolving pagefind at build time
const importPagefind = new Function("return import('/pagefind/pagefind.js')") as () => Promise<PagefindModule>;

function normalizePagefindUrl(url: string) {
  const match = url.match(/\/pagefind-content\/([^/.]+)\.html$/);
  return match ? `/${match[1]}` : url;
}

function articleToResult(article: Article): SearchResult {
  return {
    title: article.title,
    url: `/${article.slug}`,
    excerpt: article.summary,
  };
}

export function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const { t, lang } = useLang();
  const [pagefindResults, setPagefindResults] = useState<SearchResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fallbackResults = useMemo(
    () => searchLocal(query, lang).map(articleToResult),
    [query, lang],
  );

  useEffect(() => {
    let cancelled = false;

    async function runPagefindSearch() {
      if (!query.trim()) {
        setPagefindResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const pagefind = await importPagefind();
        const response = await pagefind.search(query);
        const loaded = await Promise.all(response.results.slice(0, 20).map((item) => item.data()));
        if (!cancelled) {
          setPagefindResults(
            loaded.map((item) => ({
              title: item.meta.title || t.pageFallbackTitle,
              url: normalizePagefindUrl(item.url),
              excerpt: item.excerpt,
            })),
          );
        }
      } catch {
        if (!cancelled) {
          setPagefindResults(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    runPagefindSearch();

    return () => {
      cancelled = true;
    };
  }, [query, t]);

  const results = pagefindResults ?? fallbackResults;

  return (
    <section className="search-page">
      <div className="page-heading">
        <p className="eyebrow">{t.nav.search}</p>
        <h1>{t.searchHeading}</h1>
        <p>{t.searchDesc}</p>
        <SearchBox
          initialValue={query}
          placeholder={t.searchPlaceholder}
          searchButton={t.searchButton}
        />
      </div>

      {query ? (
        <div className="search-results">
          <h2>{isLoading ? t.searching : t.resultsFor(query)}</h2>
          {!isLoading && results.length === 0 ? <p>{t.noResults}</p> : null}
          {results.map((result) => (
            <Link className="result-card" to={result.url} key={`${result.url}-${result.title}`}>
              <h3>{result.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: result.excerpt }} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="empty-search">{t.emptySearch}</p>
      )}
    </section>
  );
}
