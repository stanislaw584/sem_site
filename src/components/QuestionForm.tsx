import { FormEvent } from "react";
import { Send } from "lucide-react";
import { useLang } from "../i18n";

const recipient = "xolodkova_nv@dvfu.ru";

export function QuestionForm() {
  const { t } = useLang();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const group = String(data.get("group") || "").trim();
    const contact = String(data.get("contact") || "").trim();
    const topic = String(data.get("topic") || "").trim();
    const message = String(data.get("message") || "").trim();

    const body = [
      `${t.form.emailBodyName}: ${name || t.form.notProvided}`,
      `${t.form.emailBodyGroup}: ${group || t.form.notProvided}`,
      `${t.form.emailBodyContact}: ${contact || t.form.notProvided2}`,
      "",
      `${t.form.emailBodyQuestionLabel}:`,
      message || t.form.notProvided2,
    ].join("\n");

    const subject = `${t.form.emailSubjectBase}${topic ? `: ${topic}` : ""}`;
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section className="question-section" id="ask-question" aria-labelledby="question-title">
      <div className="question-copy">
        <p className="eyebrow">{t.form.eyebrow}</p>
        <h2 id="question-title">{t.nav.ask}</h2>
        <p>{t.form.desc}</p>
        <ul>
          <li>{t.form.hint1}</li>
          <li>{t.form.hint2}</li>
          <li>{t.form.hint3}</li>
        </ul>
      </div>
      <form className="question-form" onSubmit={submit}>
        <label>
          {t.form.labelName}
          <input name="name" type="text" placeholder={t.form.placeholderName} />
        </label>
        <label>
          {t.form.labelGroup}
          <input name="group" type="text" placeholder={t.form.placeholderGroup} />
        </label>
        <label>
          {t.form.labelContact}
          <input name="contact" type="text" placeholder={t.form.placeholderContact} />
        </label>
        <label>
          {t.form.labelTopic}
          <select name="topic" defaultValue={t.form.topic1}>
            <option>{t.form.topic1}</option>
            <option>{t.form.topic2}</option>
            <option>{t.form.topic3}</option>
            <option>{t.form.topic4}</option>
            <option>{t.form.topic5}</option>
          </select>
        </label>
        <label className="question-message">
          {t.form.labelMessage}
          <textarea name="message" rows={5} placeholder={t.form.placeholderMessage} required />
        </label>
        <button type="submit">
          <Send size={18} aria-hidden="true" />
          {t.form.submitButton}
        </button>
      </form>
    </section>
  );
}
