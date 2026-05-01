import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section className="not-found">
      <h1>Страница не найдена</h1>
      <p>Такой страницы пока нет. Вернитесь на главную и выберите нужный раздел.</p>
      <Link className="primary-link" to="/">
        На главную
      </Link>
    </section>
  );
}

