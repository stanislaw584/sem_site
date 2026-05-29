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
    },
    hero: {
      eyebrow: "Школа экономики и менеджмента ДВФУ",
      h1: "Гид для иностранных студентов ШЭМ",
      desc: "Простая навигация по учебе, сервисам, контактам и возможностям. Выберите раздел или найдите нужную тему через поиск.",
    },
    searchPlaceholder: "Например: расписание, сессия, виза, общежитие",
    searchButton: "Поиск",
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
    searchHeading: "Поиск по гиду",
    searchDesc:
      "В собранной версии используется Pagefind. В режиме разработки работает простой локальный поиск по заголовкам и текстам.",
    searching: "Ищу...",
    resultsFor: (q: string) => `Результаты по запросу "${q}"`,
    noResults: 'Ничего не найдено. Попробуйте другой запрос: например, "почта", "оценки", "виза".',
    emptySearch: "Введите запрос, чтобы найти нужную тему.",
    pageFallbackTitle: "Страница",
  },
  en: {
    brand: "SEM Student Guide",
    nav: {
      home: "Home",
      search: "Search",
      contacts: "Contacts",
      ask: "Ask a Question",
    },
    hero: {
      eyebrow: "School of Economics and Management, FEFU",
      h1: "Guide for International Students of SEM",
      desc: "Simple navigation for academic life, services, contacts and opportunities. Choose a section or search for a topic.",
    },
    searchPlaceholder: "E.g.: schedule, exams, visa, dormitory",
    searchButton: "Search",
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
    searchHeading: "Search the Guide",
    searchDesc:
      "The built version uses Pagefind. In development mode a simple local search runs on titles and text.",
    searching: "Searching...",
    resultsFor: (q: string) => `Results for "${q}"`,
    noResults: 'Nothing found. Try another query: e.g., "email", "grades", "visa".',
    emptySearch: "Enter a query to find a topic.",
    pageFallbackTitle: "Page",
  },
  zh: {
    brand: "经管学院学生指南",
    nav: {
      home: "首页",
      search: "搜索",
      contacts: "联系我们",
      ask: "提问",
    },
    hero: {
      eyebrow: "远东联邦大学经济与管理学院",
      h1: "SEM外国留学生指南",
      desc: "轻松导航学习、服务、联系和机会。选择一个栏目，或通过搜索找到所需信息。",
    },
    searchPlaceholder: "例如：课程表、考试、签证、宿舍",
    searchButton: "搜索",
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
    searchHeading: "搜索指南",
    searchDesc: "构建版本使用 Pagefind。开发模式下使用基于标题和文本的本地搜索。",
    searching: "搜索中...",
    resultsFor: (q: string) => `"${q}" 的搜索结果`,
    noResults: '未找到任何结果。请尝试其他关键词，例如："邮箱"、"成绩"、"签证"。',
    emptySearch: "请输入搜索词以查找相关内容。",
    pageFallbackTitle: "页面",
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
