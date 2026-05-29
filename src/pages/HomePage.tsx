import {
  BookOpen,
  BookText,
  CalendarDays,
  CheckSquare,
  CircleHelp,
  ShieldCheck,
  Star,
} from "lucide-react";
import { type ComponentType } from "react";
import { Link } from "react-router-dom";
import { PageVisual } from "../components/PageVisual";
import { QuestionForm } from "../components/QuestionForm";
import { SearchBox } from "../components/SearchBox";
import { useLang } from "../i18n";

const SECTION_ICONS: ComponentType<{ size?: number; "aria-hidden"?: "true" }>[] = [
  BookOpen,
  CalendarDays,
  CheckSquare,
  CircleHelp,
  Star,
  ShieldCheck,
  BookText,
];

const SECTION_SLUGS = [
  "start",
  "study",
  "exams",
  "contacts",
  "opportunities",
  "rules-support",
  "glossary",
];

export function HomePage() {
  const { t } = useLang();

  return (
    <section className="home-page" data-pagefind-body>
      <div className="hero">
        <div>
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1>{t.hero.h1}</h1>
          <p>{t.hero.desc}</p>
          <SearchBox placeholder={t.searchPlaceholder} searchButton={t.searchButton} />
        </div>
        <PageVisual slug="home" compact />
      </div>

      <div className="section-grid" aria-label="Разделы сайта">
        {t.sections.map((section, i) => {
          const Icon = SECTION_ICONS[i];
          const slug = SECTION_SLUGS[i];
          return (
            <Link className="section-card" to={`/${slug}`} key={slug}>
              <span className="card-icon">
                <Icon size={30} aria-hidden="true" />
              </span>
              <span>
                <h2>{section.title}</h2>
                <ul>
                  {section.links.map((link) => (
                    <li key={link}>{link}</li>
                  ))}
                </ul>
              </span>
            </Link>
          );
        })}
      </div>
      <QuestionForm />
    </section>
  );
}
