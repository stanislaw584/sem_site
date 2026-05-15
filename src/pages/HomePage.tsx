import {
  BookOpen,
  BookText,
  CalendarDays,
  CheckSquare,
  CircleHelp,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { SearchBox } from "../components/SearchBox";

const sections = [
  {
    title: "1. Начать учиться",
    slug: "start",
    icon: BookOpen,
    links: ["Активировать личный кабинет", "Войти в почту ДВФУ", "Найти электронную зачетку"],
  },
  {
    title: "2. Учеба каждый день",
    slug: "study",
    icon: CalendarDays,
    links: ["Найти расписание", "Понять учебный план", "Найти преподавателя"],
  },
  {
    title: "3. Сессия и оценки",
    slug: "exams",
    icon: CheckSquare,
    links: ["Понять зачеты и экзамены", "Проверить оценки", "Узнать про пересдачи"],
  },
  {
    title: "4. К кому обратиться",
    slug: "contacts",
    icon: CircleHelp,
    links: ["Вопрос по учебе", "Вопрос по визе", "Проблема с личным кабинетом"],
  },
  {
    title: "5. Возможности",
    slug: "opportunities",
    icon: Star,
    links: ["Стипендии", "Конкурсы и олимпиады", "Работа и карьера"],
  },
  {
    title: "6. Правила и поддержка",
    slug: "rules-support",
    icon: ShieldCheck,
    links: ["Правила поведения", "Плагиат", "Психологическая помощь"],
  },
  {
    title: "7. Глоссарий",
    slug: "glossary",
    icon: BookText,
    links: ["Термины на китайском", "Термины на английском", "Документы и сервисы"],
  },
];

export function HomePage() {
  return (
    <section className="home-page" data-pagefind-body>
      <div className="hero">
        <p className="eyebrow">Школа экономики и менеджмента ДВФУ</p>
        <h1>Гид для иностранных студентов ШЭМ</h1>
        <p>
          Простая навигация по учебе, сервисам, контактам и возможностям. Выберите раздел или
          найдите нужную тему через поиск.
        </p>
        <SearchBox />
      </div>

      <div className="section-grid" aria-label="Разделы сайта">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link className="section-card" to={`/${section.slug}`} key={section.slug}>
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
    </section>
  );
}

