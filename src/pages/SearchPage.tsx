import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SearchBox } from "../components/SearchBox";
import { Article, searchLocal } from "../content";

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
  const [pagefindResults, setPagefindResults] = useState<SearchResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fallbackResults = useMemo(
    () => searchLocal(query).map(articleToResult),
    [query],
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
              title: item.meta.title || "Страница",
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
  }, [query]);

  const results = pagefindResults ?? fallbackResults;

  return (
    <section className="search-page">
      <div className="page-heading">
        <p className="eyebrow">Поиск</p>
        <h1>Поиск по гиду</h1>
        <p>
          В собранной версии используется Pagefind. В режиме разработки работает простой локальный
          поиск по заголовкам и текстам.
        </p>
        <SearchBox initialValue={query} />
      </div>

      {query ? (
        <div className="search-results">
          <h2>
            {isLoading ? "Ищу..." : `Результаты по запросу "${query}"`}
          </h2>
          {!isLoading && results.length === 0 ? (
            <p>Ничего не найдено. Попробуйте другой запрос: например, "почта", "оценки", "виза".</p>
          ) : null}
          {results.map((result) => (
            <Link className="result-card" to={result.url} key={`${result.url}-${result.title}`}>
              <h3>{result.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: result.excerpt }} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="empty-search">Введите запрос, чтобы найти нужную тему.</p>
      )}
    </section>
  );
}
