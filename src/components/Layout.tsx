import { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/">
          ШЭМ Student Guide
        </Link>
        <nav className="top-nav" aria-label="Основная навигация">
          <NavLink to="/">Главная</NavLink>
          <NavLink to="/search">Поиск</NavLink>
          <a href="#contacts">Контакты</a>
          <Link className="header-question-link" to="/#ask-question">
            Задать вопрос
          </Link>
          <span className="language-switcher" aria-label="Языки">
            RU / EN / 中文
          </span>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="site-footer" id="contacts">
        <div>
          <h2>Быстрые ссылки</h2>
          <Link to="/start">Начать учиться</Link>
          <Link to="/study">Учеба каждый день</Link>
          <Link to="/exams">Сессия и оценки</Link>
          <Link to="/contacts">Контакты</Link>
        </div>
        <div>
          <h2>Контакты</h2>
          <p>Административный отдел ШЭМ: корпус G, каб. G624</p>
          <p>Тел.: 8 (423) 265 24 24, доб. 2200</p>
          <p>Email: xolodkova_nv@dvfu.ru</p>
        </div>
        <div>
          <h2>Помощь</h2>
          <Link to="/contacts">К кому обратиться</Link>
          <Link to="/rules-support">Психологическая помощь</Link>
          <Link to="/start">Проблема со входом</Link>
        </div>
      </footer>
    </div>
  );
}
