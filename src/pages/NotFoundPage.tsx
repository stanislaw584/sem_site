import { Link } from "react-router-dom";
import { useLang } from "../i18n";

export function NotFoundPage() {
  const { t } = useLang();

  return (
    <section className="not-found">
      <h1>{t.notFound.title}</h1>
      <p>{t.notFound.desc}</p>
      <Link className="primary-link" to="/">
        {t.backToHome}
      </Link>
    </section>
  );
}
