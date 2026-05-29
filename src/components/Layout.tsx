import { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLang, type Lang } from "../i18n";

type LayoutProps = {
  children: ReactNode;
};

const LANGS: { code: Lang; label: string }[] = [
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" },
];

export function Layout({ children }: LayoutProps) {
  const { lang, setLang, t } = useLang();

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/">
          {t.brand}
        </Link>
        <nav className="top-nav" aria-label="Основная навигация">
          <NavLink to="/">{t.nav.home}</NavLink>
          <NavLink to="/search">{t.nav.search}</NavLink>
          <a href="#contacts">{t.nav.contacts}</a>
          <NavLink className="header-question-link" to="/ask">
            {t.nav.ask}
          </NavLink>
          <div className="language-switcher" aria-label="Язык / Language">
            {LANGS.map(({ code, label }, i) => (
              <span key={code}>
                {i > 0 && <span className="lang-sep">/</span>}
                <button
                  className={lang === code ? "lang-btn lang-btn-active" : "lang-btn"}
                  onClick={() => setLang(code)}
                  aria-current={lang === code ? "true" : undefined}
                >
                  {label}
                </button>
              </span>
            ))}
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="site-footer" id="contacts">
        <div>
          <h2>{t.footer.quickLinks}</h2>
          <Link to="/start">{t.footer.startStudying}</Link>
          <Link to="/study">{t.footer.dailyStudy}</Link>
          <Link to="/exams">{t.footer.exams}</Link>
          <Link to="/contacts">{t.footer.contactsLink}</Link>
        </div>
        <div>
          <h2>{t.footer.contacts}</h2>
          <p>{t.footer.address}</p>
          <p>{t.footer.phone}</p>
          <p>{t.footer.email}</p>
        </div>
        <div>
          <h2>{t.footer.help}</h2>
          <Link to="/contacts">{t.footer.whoToContact}</Link>
          <Link to="/rules-support">{t.footer.psych}</Link>
          <Link to="/start">{t.footer.loginProblem}</Link>
        </div>
      </footer>
    </div>
  );
}
