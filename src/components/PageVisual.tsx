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
import { type ComponentType } from "react";
import { useLang } from "../i18n";

const VISUAL_CONFIG: Record<string, { accent: string; icon: ComponentType<{ size?: number; "aria-hidden"?: "true" }> }> = {
  home: { accent: "blue", icon: GraduationCap },
  start: { accent: "blue", icon: Laptop },
  study: { accent: "green", icon: CalendarCheck },
  exams: { accent: "amber", icon: FileCheck2 },
  contacts: { accent: "red", icon: Headphones },
  opportunities: { accent: "violet", icon: Trophy },
  "portfolio-feedback": { accent: "green", icon: BriefcaseBusiness },
  "rules-support": { accent: "red", icon: ShieldCheck },
  "student-status": { accent: "amber", icon: UserRoundCheck },
  "about-sem": { accent: "blue", icon: Building2 },
};

type PageVisualProps = {
  slug: string;
  compact?: boolean;
};

export function PageVisual({ slug, compact = false }: PageVisualProps) {
  const { t } = useLang();
  const config = VISUAL_CONFIG[slug in VISUAL_CONFIG ? slug : "home"];
  const text = (t.visuals as Record<string, typeof t.visuals.home>)[slug] ?? t.visuals.home;
  const Icon = config.icon;

  return (
    <figure className={`page-visual page-visual-${config.accent} ${compact ? "page-visual-compact" : ""}`}>
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
            <strong>{text.title}</strong>
            <small>{text.subtitle}</small>
          </span>
        </div>
        <div className="visual-facts">
          {text.facts.map((fact) => (
            <span key={fact}>{fact}</span>
          ))}
        </div>
        <ol className="visual-steps">
          {text.steps.map((step) => (
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
