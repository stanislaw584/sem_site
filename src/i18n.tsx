import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "ru" | "en" | "zh";

const translations = {
  ru: {
    brand: "ШЭМ Student Guide",
    nav: {
      home: "Главная",
      search: "Поиск",
      contacts: "Контакты",
      ask: "Задать вопрос",
      ariaLabel: "Основная навигация",
    },
    langSwitcherLabel: "Язык",
    hero: {
      eyebrow: "Школа экономики и менеджмента ДВФУ",
      h1: "Гид для иностранных студентов ШЭМ",
      desc: "Простая навигация по учебе, сервисам, контактам и возможностям. Выберите раздел или найдите нужную тему через поиск.",
    },
    searchPlaceholder: "Например: расписание, сессия, виза, общежитие",
    searchButton: "Поиск",
    sectionsAriaLabel: "Разделы сайта",
    sections: [
      {
        title: "1. Начать учиться",
        links: ["Активировать личный кабинет", "Войти в почту ДВФУ", "Найти электронную зачетку"],
      },
      {
        title: "2. Учеба каждый день",
        links: ["Найти расписание", "Понять учебный план", "Найти преподавателя"],
      },
      {
        title: "3. Сессия и оценки",
        links: ["Понять зачеты и экзамены", "Проверить оценки", "Узнать про пересдачи"],
      },
      {
        title: "4. К кому обратиться",
        links: ["Вопрос по учебе", "Вопрос по визе", "Проблема с личным кабинетом"],
      },
      {
        title: "5. Возможности",
        links: ["Стипендии", "Конкурсы и олимпиады", "Работа и карьера"],
      },
      {
        title: "6. Правила и поддержка",
        links: ["Правила поведения", "Плагиат", "Психологическая помощь"],
      },
      {
        title: "7. Словарик",
        links: ["Термины на китайском", "Термины на английском", "Документы и сервисы"],
      },
    ],
    footer: {
      quickLinks: "Быстрые ссылки",
      contacts: "Контакты",
      help: "Помощь",
      startStudying: "Начать учиться",
      dailyStudy: "Учеба каждый день",
      exams: "Сессия и оценки",
      contactsLink: "Контакты",
      address: "Административный отдел ШЭМ: корпус G, каб. G624",
      phone: "Тел.: 8 (423) 265 24 24, доб. 2200",
      email: "Email: xolodkova_nv@dvfu.ru",
      whoToContact: "К кому обратиться",
      psych: "Психологическая помощь",
      loginProblem: "Проблема со входом",
    },
    backToHome: "На главную",
    page: "Страница",
    checkRelevance: "Проверить актуальность",
    relatedSections: "Связанные разделы",
    asideAriaLabel: "Информация о странице",
    searchHeading: "Поиск по гиду",
    searchDesc: "В собранной версии используется Pagefind. В режиме разработки работает простой локальный поиск по заголовкам и текстам.",
    searching: "Ищу...",
    resultsFor: (q: string) => `Результаты по запросу "${q}"`,
    noResults: 'Ничего не найдено. Попробуйте другой запрос: например, "почта", "оценки", "виза".',
    emptySearch: "Введите запрос, чтобы найти нужную тему.",
    pageFallbackTitle: "Страница",
    notFound: {
      title: "Страница не найдена",
      desc: "Такой страницы пока нет. Вернитесь на главную и выберите нужный раздел.",
    },
    ask: {
      pageTitle: "Задать вопрос | ШЭМ Student Guide",
      intro: "Не нашли нужную информацию? Задайте вопрос онлайн — ответ придёт на вашу почту. Или обратитесь напрямую в административный отдел ШЭМ.",
      ctaOnline: "Задать вопрос онлайн",
      scheduleTitle: "График работы",
      monFri: "Понедельник — пятница",
      workHours: "09:00 — 18:00",
      lunch: "Обед",
      lunchHours: "13:00 — 14:00",
      satSun: "Суббота — воскресенье",
      weekend: "выходной",
      adminTitle: "Административный отдел ШЭМ",
      adminAddress: "Корпус G, каб. G622–G624",
      adminPhone: "8 (423) 265 24 24, доб. 2200–2201",
      contact1Name: "Дубовик Яна Александровна (начальник)",
      contact2Name: "Холодкова Наталья Васильевна",
      hint: "После заполнения формы ваш вопрос поступит в административный отдел ШЭМ. Старайтесь описать ситуацию подробно — это ускорит ответ.",
    },
    form: {
      eyebrow: "Нужна помощь",
      desc: "Если непонятно, куда идти или кому писать, опишите ситуацию. Вопрос откроется в почтовом клиенте, чтобы его можно было отправить ответственному сотруднику.",
      hint1: "укажите группу или программу;",
      hint2: "напишите, что уже пробовали сделать;",
      hint3: "добавьте контакт для ответа.",
      labelName: "Имя",
      placeholderName: "Например, Ли Вэй",
      labelGroup: "Группа / программа",
      placeholderGroup: "Например, Б1234 / менеджмент",
      labelContact: "Контакт для ответа",
      placeholderContact: "Email, Telegram или телефон",
      labelTopic: "Тема",
      topic1: "Учебный вопрос",
      topic2: "Документы или виза",
      topic3: "Личный кабинет / сервисы",
      topic4: "Общежитие",
      topic5: "Другое",
      labelMessage: "Сообщение",
      placeholderMessage: "Коротко опишите проблему или вопрос",
      submitButton: "Отправить вопрос",
      notProvided: "не указано",
      notProvided2: "не указан",
      emailBodyName: "Имя",
      emailBodyGroup: "Группа / программа",
      emailBodyContact: "Контакт для ответа",
      emailBodyQuestionLabel: "Вопрос",
      emailSubjectBase: "Вопрос студента ШЭМ",
    },
  },
  en: {
    brand: "SEM Student Guide",
    nav: {
      home: "Home",
      search: "Search",
      contacts: "Contacts",
      ask: "Ask a Question",
      ariaLabel: "Main navigation",
    },
    langSwitcherLabel: "Language",
    hero: {
      eyebrow: "School of Economics and Management, FEFU",
      h1: "Guide for International Students of SEM",
      desc: "Simple navigation for academic life, services, contacts and opportunities. Choose a section or search for a topic.",
    },
    searchPlaceholder: "E.g.: schedule, exams, visa, dormitory",
    searchButton: "Search",
    sectionsAriaLabel: "Site sections",
    sections: [
      {
        title: "1. Start Studying",
        links: ["Activate student portal", "Access FEFU email", "Find grade book"],
      },
      {
        title: "2. Daily Studies",
        links: ["Find schedule", "Understand study plan", "Find a teacher"],
      },
      {
        title: "3. Exams & Grades",
        links: ["Understand tests and exams", "Check grades", "Learn about retakes"],
      },
      {
        title: "4. Who to Contact",
        links: ["Academic question", "Visa question", "Student portal issue"],
      },
      {
        title: "5. Opportunities",
        links: ["Scholarships", "Competitions & Olympiads", "Work & Career"],
      },
      {
        title: "6. Rules & Support",
        links: ["Conduct rules", "Plagiarism", "Psychological support"],
      },
      {
        title: "7. Vocabulary",
        links: ["Terms in Chinese", "Terms in English", "Documents & Services"],
      },
    ],
    footer: {
      quickLinks: "Quick Links",
      contacts: "Contacts",
      help: "Help",
      startStudying: "Start Studying",
      dailyStudy: "Daily Studies",
      exams: "Exams & Grades",
      contactsLink: "Contacts",
      address: "SEM Administrative Office: Building G, room G624",
      phone: "Tel.: 8 (423) 265 24 24, ext. 2200",
      email: "Email: xolodkova_nv@dvfu.ru",
      whoToContact: "Who to Contact",
      psych: "Psychological Support",
      loginProblem: "Login Issue",
    },
    backToHome: "Back to Home",
    page: "Page",
    checkRelevance: "Check relevance",
    relatedSections: "Related Sections",
    asideAriaLabel: "Page information",
    searchHeading: "Search the Guide",
    searchDesc: "The built version uses Pagefind. In development mode a simple local search runs on titles and text.",
    searching: "Searching...",
    resultsFor: (q: string) => `Results for "${q}"`,
    noResults: 'Nothing found. Try another query: e.g., "email", "grades", "visa".',
    emptySearch: "Enter a query to find a topic.",
    pageFallbackTitle: "Page",
    notFound: {
      title: "Page Not Found",
      desc: "This page does not exist yet. Return to the home page and choose a section.",
    },
    ask: {
      pageTitle: "Ask a Question | SEM Student Guide",
      intro: "Can't find the information you need? Ask a question online — the answer will be sent to your email. Or contact the SEM Administrative Office directly.",
      ctaOnline: "Ask a Question Online",
      scheduleTitle: "Office Hours",
      monFri: "Monday — Friday",
      workHours: "09:00 — 18:00",
      lunch: "Lunch break",
      lunchHours: "13:00 — 14:00",
      satSun: "Saturday — Sunday",
      weekend: "closed",
      adminTitle: "SEM Administrative Office",
      adminAddress: "Building G, room G622–G624",
      adminPhone: "8 (423) 265 24 24, ext. 2200–2201",
      contact1Name: "Dubovik Yana Alexandrovna (Head)",
      contact2Name: "Kholodkova Natalia Vasilyevna",
      hint: "After submitting the form, your question will be sent to the SEM Administrative Office. Try to describe the situation in detail — this will speed up the response.",
    },
    form: {
      eyebrow: "Need Help",
      desc: "If you are not sure where to go or who to contact, describe the situation. The question will open in your email client so you can send it to the responsible staff member.",
      hint1: "specify your group or program;",
      hint2: "describe what you have already tried;",
      hint3: "add a contact for the reply.",
      labelName: "Name",
      placeholderName: "E.g., Li Wei",
      labelGroup: "Group / Program",
      placeholderGroup: "E.g., B1234 / management",
      labelContact: "Contact for Reply",
      placeholderContact: "Email, Telegram, or phone",
      labelTopic: "Topic",
      topic1: "Academic Question",
      topic2: "Documents or Visa",
      topic3: "Student Portal / Services",
      topic4: "Dormitory",
      topic5: "Other",
      labelMessage: "Message",
      placeholderMessage: "Briefly describe the problem or question",
      submitButton: "Send Question",
      notProvided: "not provided",
      notProvided2: "not provided",
      emailBodyName: "Name",
      emailBodyGroup: "Group / Program",
      emailBodyContact: "Contact for Reply",
      emailBodyQuestionLabel: "Question",
      emailSubjectBase: "SEM Student Question",
    },
  },
  zh: {
    brand: "经管学院学生指南",
    nav: {
      home: "首页",
      search: "搜索",
      contacts: "联系我们",
      ask: "提问",
      ariaLabel: "主导航",
    },
    langSwitcherLabel: "语言",
    hero: {
      eyebrow: "远东联邦大学经济与管理学院",
      h1: "SEM外国留学生指南",
      desc: "轻松导航学习、服务、联系和机会。选择一个栏目，或通过搜索找到所需信息。",
    },
    searchPlaceholder: "例如：课程表、考试、签证、宿舍",
    searchButton: "搜索",
    sectionsAriaLabel: "网站栏目",
    sections: [
      {
        title: "1. 开始学习",
        links: ["激活个人账户", "登录远东大学邮箱", "查找电子成绩册"],
      },
      {
        title: "2. 日常学习",
        links: ["查找课程表", "了解教学计划", "联系教师"],
      },
      {
        title: "3. 考试与成绩",
        links: ["了解期末考试", "查看成绩", "了解补考"],
      },
      {
        title: "4. 联系谁",
        links: ["学习问题", "签证问题", "个人账户问题"],
      },
      {
        title: "5. 发展机会",
        links: ["奖学金", "竞赛与学科竞赛", "工作与职业"],
      },
      {
        title: "6. 规则与支持",
        links: ["行为规范", "学术不端", "心理援助"],
      },
      {
        title: "7. 词汇表",
        links: ["中文术语", "英文术语", "文件与服务"],
      },
    ],
    footer: {
      quickLinks: "快速链接",
      contacts: "联系我们",
      help: "帮助",
      startStudying: "开始学习",
      dailyStudy: "日常学习",
      exams: "考试与成绩",
      contactsLink: "联系我们",
      address: "经管学院行政办公室：G楼，G624室",
      phone: "电话：8 (423) 265 24 24，分机 2200",
      email: "邮箱：xolodkova_nv@dvfu.ru",
      whoToContact: "联系谁",
      psych: "心理援助",
      loginProblem: "登录问题",
    },
    backToHome: "返回首页",
    page: "页面",
    checkRelevance: "检查时效性",
    relatedSections: "相关部分",
    asideAriaLabel: "页面信息",
    searchHeading: "搜索指南",
    searchDesc: "构建版本使用 Pagefind。开发模式下使用基于标题和文本的本地搜索。",
    searching: "搜索中...",
    resultsFor: (q: string) => `"${q}" 的搜索结果`,
    noResults: '未找到任何结果。请尝试其他关键词，例如："邮箱"、"成绩"、"签证"。',
    emptySearch: "请输入搜索词以查找相关内容。",
    pageFallbackTitle: "页面",
    notFound: {
      title: "页面未找到",
      desc: "该页面尚不存在。请返回首页并选择所需部分。",
    },
    ask: {
      pageTitle: "提问 | 经管学院学生指南",
      intro: "没找到所需信息？在线提问——答案将发送至您的邮箱。或直接联系经管学院行政办公室。",
      ctaOnline: "在线提问",
      scheduleTitle: "办公时间",
      monFri: "周一至周五",
      workHours: "09:00 — 18:00",
      lunch: "午休",
      lunchHours: "13:00 — 14:00",
      satSun: "周六至周日",
      weekend: "休息",
      adminTitle: "经管学院行政办公室",
      adminAddress: "G楼，G622–G624室",
      adminPhone: "8 (423) 265 24 24，分机 2200–2201",
      contact1Name: "Дубовик Яна Александровна（主任）",
      contact2Name: "Холодкова Наталья Васильевна",
      hint: "提交表单后，您的问题将发送至经管学院行政办公室。请尽量详细描述情况——这将加快回复速度。",
    },
    form: {
      eyebrow: "需要帮助",
      desc: "如果不知道该去哪里或联系谁，请描述情况。问题将在邮件客户端打开，以便发送给相关工作人员。",
      hint1: "请注明您的班级或专业；",
      hint2: "说明您已经尝试过什么；",
      hint3: "提供回复联系方式。",
      labelName: "姓名",
      placeholderName: "例如，李伟",
      labelGroup: "班级/专业",
      placeholderGroup: "例如，B1234/管理",
      labelContact: "回复联系方式",
      placeholderContact: "邮箱、Telegram或电话",
      labelTopic: "主题",
      topic1: "学习问题",
      topic2: "文件或签证",
      topic3: "个人账户/服务",
      topic4: "宿舍",
      topic5: "其他",
      labelMessage: "消息",
      placeholderMessage: "简要描述问题",
      submitButton: "发送问题",
      notProvided: "未提供",
      notProvided2: "未提供",
      emailBodyName: "姓名",
      emailBodyGroup: "班级/专业",
      emailBodyContact: "回复联系方式",
      emailBodyQuestionLabel: "问题",
      emailSubjectBase: "经管学院学生提问",
    },
  },
};

export type Translations = typeof translations.ru;

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
};

const LangContext = createContext<LangContextValue>({
  lang: "ru",
  setLang: () => {},
  t: translations.ru,
});

function getInitialLang(): Lang {
  try {
    const stored = localStorage.getItem("lang");
    if (stored === "en" || stored === "zh") return stored;
  } catch {
    // ignore
  }
  return "ru";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  function setLang(newLang: Lang) {
    setLangState(newLang);
    try {
      localStorage.setItem("lang", newLang);
    } catch {
      // ignore
    }
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
