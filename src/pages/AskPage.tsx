import { ArrowLeft, Clock, Mail, MapPin, MessageCircleQuestion, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export function AskPage() {
  document.title = "Задать вопрос | SEM Student Guide";

  return (
    <section className="ask-page">
      <Link className="back-link" to="/">
        <ArrowLeft size={18} aria-hidden="true" />
        На главную
      </Link>

      <div className="page-heading">
        <p className="eyebrow">Школа экономики и менеджмента ДВФУ</p>
        <h1>Задать вопрос</h1>
        <p>
          Не нашли нужную информацию? Задайте вопрос онлайн — ответ придёт на вашу почту.
          Или обратитесь напрямую в административный отдел ШЭМ.
        </p>
      </div>

      <a
        className="primary-link ask-cta"
        href="https://forms.yandex.ru/u/6a074497d046881c3bb6e950"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircleQuestion size={20} aria-hidden="true" />
        Задать вопрос онлайн
      </a>

      <div className="ask-grid">
        <div className="ask-card">
          <h2>
            <Clock size={20} aria-hidden="true" />
            График работы
          </h2>
          <table className="ask-hours">
            <tbody>
              <tr>
                <th>Понедельник — пятница</th>
                <td>09:00 — 18:00</td>
              </tr>
              <tr>
                <th>Обед</th>
                <td>13:00 — 14:00</td>
              </tr>
              <tr>
                <th>Суббота — воскресенье</th>
                <td>выходной</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="ask-card">
          <h2>Административный отдел ШЭМ</h2>
          <ul className="ask-contacts">
            <li>
              <MapPin size={16} aria-hidden="true" />
              Корпус G, каб. G622–G624
            </li>
            <li>
              <Phone size={16} aria-hidden="true" />
              8 (423) 265 24 24, доб. 2200–2201
            </li>
            <li>
              <Mail size={16} aria-hidden="true" />
              <a href="mailto:dubovik.ya@dvfu.ru">dubovik.ya@dvfu.ru</a>
              <span className="ask-contact-note">Дубовик Яна Александровна (начальник)</span>
            </li>
            <li>
              <Mail size={16} aria-hidden="true" />
              <a href="mailto:xolodkova_nv@dvfu.ru">xolodkova_nv@dvfu.ru</a>
              <span className="ask-contact-note">Холодкова Наталья Васильевна</span>
            </li>
          </ul>
        </div>
      </div>

      <p className="ask-hint">
        После заполнения формы ваш вопрос поступит в административный отдел ШЭМ.
        Старайтесь описать ситуацию подробно — это ускорит ответ.
      </p>
    </section>
  );
}
