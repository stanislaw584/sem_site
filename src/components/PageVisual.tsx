import {
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  FileCheck2,
  GraduationCap,
  Headphones,
  IdCard,
  Landmark,
  Laptop,
  Mail,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserRoundCheck,
} from "lucide-react";

const visuals = {
  home: {
    title: "SEM Guide",
    subtitle: "учеба / сервисы / помощь",
    accent: "blue",
    icon: GraduationCap,
    facts: ["6 разделов", "поиск по сайту", "контакты отделов", "форма вопроса"],
    steps: ["выбрать свою ситуацию", "открыть нужный подпункт", "проверить контакт или сервис"],
  },
  start: {
    title: "Старт",
    subtitle: "первые сервисы ДВФУ",
    accent: "blue",
    icon: Laptop,
    facts: ["единый аккаунт", "почта ДВФУ", "личный кабинет", "зачетка"],
    steps: ["активировать учетную запись", "проверить почту и кабинет", "сохранить важные ссылки"],
  },
  study: {
    title: "Учеба",
    subtitle: "каждый день",
    accent: "green",
    icon: CalendarCheck,
    facts: ["расписание", "учебный план", "рейтинг", "преподаватели"],
    steps: ["смотреть пары заранее", "понимать форму контроля", "следить за баллами"],
  },
  exams: {
    title: "Сессия",
    subtitle: "оценки и пересдачи",
    accent: "amber",
    icon: FileCheck2,
    facts: ["зачетная неделя", "экзамены", "пересдачи", "апелляция"],
    steps: ["проверить рейтинг-план", "сверить оценку в кабинете", "сразу уточнить ошибку"],
  },
  contacts: {
    title: "Контакты",
    subtitle: "куда писать",
    accent: "red",
    icon: Headphones,
    facts: ["учеба", "документы", "виза", "общежитие"],
    steps: ["определить тип вопроса", "найти нужный отдел", "написать с группой и контактами"],
  },
  opportunities: {
    title: "Возможности",
    subtitle: "рост вне учебы",
    accent: "violet",
    icon: Trophy,
    facts: ["стипендии", "конкурсы", "наука", "карьера"],
    steps: ["выбрать направление развития", "собрать достижения", "следить за сроками заявок"],
  },
  "portfolio-feedback": {
    title: "Портфолио",
    subtitle: "достижения и новости",
    accent: "green",
    icon: BriefcaseBusiness,
    facts: ["достижения", "характеристика", "новости", "соцсети"],
    steps: ["сохранять подтверждения", "обновлять портфолио", "запрашивать документы заранее"],
  },
  "rules-support": {
    title: "Правила",
    subtitle: "поддержка и безопасность",
    accent: "red",
    icon: ShieldCheck,
    facts: ["честность", "поведение", "инклюзия", "психолог"],
    steps: ["понять базовые правила", "не откладывать проблему", "обратиться за поддержкой"],
  },
  "student-status": {
    title: "Статус",
    subtitle: "заявления и изменения",
    accent: "amber",
    icon: UserRoundCheck,
    facts: ["инд. график", "акад. отпуск", "перевод", "восстановление"],
    steps: ["узнать сроки и основание", "подготовить заявление", "подать через нужный канал"],
  },
  "about-sem": {
    title: "О ШЭМ",
    subtitle: "школа и структура",
    accent: "blue",
    icon: Building2,
    facts: ["структура", "программы", "администрация", "староста"],
    steps: ["понять, кто за что отвечает", "найти подразделение", "задать вопрос адресно"],
  },
} as const;

type VisualSlug = keyof typeof visuals;

type PageVisualProps = {
  slug: string;
  compact?: boolean;
};

export function PageVisual({ slug, compact = false }: PageVisualProps) {
  const visual = visuals[(slug in visuals ? slug : "home") as VisualSlug];
  const Icon = visual.icon;

  return (
    <figure className={`page-visual page-visual-${visual.accent} ${compact ? "page-visual-compact" : ""}`}>
      <div className="visual-photo" aria-hidden="true">
        <span className="visual-sun" />
        <span className="visual-building visual-building-left" />
        <span className="visual-building visual-building-center" />
        <span className="visual-building visual-building-right" />
        <span className="visual-path" />
        <span className="visual-person visual-person-one" />
        <span className="visual-person visual-person-two" />
      </div>
      <figcaption className="visual-info">
        <div className="visual-title-row">
          <span className="visual-icon">
            <Icon size={24} aria-hidden="true" />
          </span>
          <span>
            <strong>{visual.title}</strong>
            <small>{visual.subtitle}</small>
          </span>
        </div>
        <div className="visual-facts">
          {visual.facts.map((fact) => (
            <span key={fact}>{fact}</span>
          ))}
        </div>
        <ol className="visual-steps">
          {visual.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <div className="visual-mini-icons" aria-hidden="true">
          <Mail size={18} />
          <IdCard size={18} />
          <Landmark size={18} />
          <MessageSquareText size={18} />
          <Sparkles size={18} />
        </div>
      </figcaption>
    </figure>
  );
}
