import { FormEvent } from "react";
import { Send } from "lucide-react";

const recipient = "xolodkova_nv@dvfu.ru";

export function QuestionForm() {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const group = String(data.get("group") || "").trim();
    const contact = String(data.get("contact") || "").trim();
    const topic = String(data.get("topic") || "").trim();
    const message = String(data.get("message") || "").trim();

    const body = [
      `Имя: ${name || "не указано"}`,
      `Группа / программа: ${group || "не указано"}`,
      `Контакт для ответа: ${contact || "не указан"}`,
      "",
      "Вопрос:",
      message || "не указан",
    ].join("\n");

    const subject = `Вопрос студента ШЭМ${topic ? `: ${topic}` : ""}`;
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section className="question-section" id="ask-question" aria-labelledby="question-title">
      <div className="question-copy">
        <p className="eyebrow">Нужна помощь</p>
        <h2 id="question-title">Задать вопрос</h2>
        <p>
          Если непонятно, куда идти или кому писать, опишите ситуацию. Вопрос откроется в почтовом
          клиенте, чтобы его можно было отправить ответственному сотруднику.
        </p>
        <ul>
          <li>укажите группу или программу;</li>
          <li>напишите, что уже пробовали сделать;</li>
          <li>добавьте контакт для ответа.</li>
        </ul>
      </div>
      <form className="question-form" onSubmit={submit}>
        <label>
          Имя
          <input name="name" type="text" placeholder="Например, Ли Вэй" />
        </label>
        <label>
          Группа / программа
          <input name="group" type="text" placeholder="Например, Б1234 / менеджмент" />
        </label>
        <label>
          Контакт для ответа
          <input name="contact" type="text" placeholder="Email, Telegram или телефон" />
        </label>
        <label>
          Тема
          <select name="topic" defaultValue="Учебный вопрос">
            <option>Учебный вопрос</option>
            <option>Документы или виза</option>
            <option>Личный кабинет / сервисы</option>
            <option>Общежитие</option>
            <option>Другое</option>
          </select>
        </label>
        <label className="question-message">
          Сообщение
          <textarea name="message" rows={5} placeholder="Коротко опишите проблему или вопрос" required />
        </label>
        <button type="submit">
          <Send size={18} aria-hidden="true" />
          Отправить вопрос
        </button>
      </form>
    </section>
  );
}
