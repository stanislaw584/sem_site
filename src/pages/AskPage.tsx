import { ArrowLeft, Clock, Mail, MapPin, MessageCircleQuestion, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n";

export function AskPage() {
  const { t } = useLang();
  document.title = t.ask.pageTitle;

  return (
    <section className="ask-page">
      <Link className="back-link" to="/">
        <ArrowLeft size={18} aria-hidden="true" />
        {t.backToHome}
      </Link>

      <div className="page-heading">
        <p className="eyebrow">{t.hero.eyebrow}</p>
        <h1>{t.nav.ask}</h1>
        <p>{t.ask.intro}</p>
      </div>

      <a
        className="primary-link ask-cta"
        href="https://forms.yandex.ru/u/6a074497d046881c3bb6e950"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircleQuestion size={20} aria-hidden="true" />
        {t.ask.ctaOnline}
      </a>

      <div className="ask-grid">
        <div className="ask-card">
          <h2>
            <Clock size={20} aria-hidden="true" />
            {t.ask.scheduleTitle}
          </h2>
          <table className="ask-hours">
            <tbody>
              <tr>
                <th>{t.ask.monFri}</th>
                <td>{t.ask.workHours}</td>
              </tr>
              <tr>
                <th>{t.ask.lunch}</th>
                <td>{t.ask.lunchHours}</td>
              </tr>
              <tr>
                <th>{t.ask.satSun}</th>
                <td>{t.ask.weekend}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="ask-card">
          <h2>{t.ask.adminTitle}</h2>
          <ul className="ask-contacts">
            <li>
              <MapPin size={16} aria-hidden="true" />
              {t.ask.adminAddress}
            </li>
            <li>
              <Phone size={16} aria-hidden="true" />
              {t.ask.adminPhone}
            </li>
            <li>
              <Mail size={16} aria-hidden="true" />
              <a href="mailto:dubovik.ya@dvfu.ru">dubovik.ya@dvfu.ru</a>
              <span className="ask-contact-note">{t.ask.contact1Name}</span>
            </li>
            <li>
              <Mail size={16} aria-hidden="true" />
              <a href="mailto:xolodkova_nv@dvfu.ru">xolodkova_nv@dvfu.ru</a>
              <span className="ask-contact-note">{t.ask.contact2Name}</span>
            </li>
          </ul>
        </div>
      </div>

      <p className="ask-hint">{t.ask.hint}</p>
    </section>
  );
}
