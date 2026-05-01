# SEM Student Guide

MVP сайта-гайда для иностранных студентов Школы экономики и менеджмента ДВФУ.

Сайт сделан как статическое React-приложение: без бэкенда, авторизации и базы данных. Контент лежит отдельно в Markdown-файлах, поэтому его можно редактировать без изменения компонентов.

## Что уже есть

- Главная страница с 6 разделами по структуре MVP.
- Страницы материалов из папки `content/ru`.
- Поиск:
  - в production-сборке используется Pagefind;
  - в dev-режиме работает простой fallback-поиск по Markdown-контенту.
- Адаптивная верстка для desktop и mobile.
- Подготовленный контентный слой на русском языке.

## Стек

- Vite
- React
- TypeScript
- React Router
- Markdown + frontmatter
- Pagefind
- CSS без UI-фреймворка

## Установка

Нужен Node.js 20+.

```bash
npm install
```

## Запуск для разработки

```bash
npm run dev
```

После запуска Vite покажет локальный адрес, обычно:

```txt
http://localhost:5173/
```

Откройте этот адрес в браузере.

## Проверка TypeScript

```bash
npm run check
```

## Production-сборка

```bash
npm run build
```

Команда делает три вещи:

1. Проверяет TypeScript.
2. Собирает сайт в папку `dist`.
3. Создает поисковый индекс Pagefind в `dist/pagefind`.

Готовые файлы для сервера находятся в:

```txt
dist/
```

## Локальная проверка production-сборки

```bash
npm run preview
```

Обычно сайт будет доступен по адресу:

```txt
http://localhost:4173/
```

В этом режиме можно проверить Pagefind-поиск так же, как он будет работать на сервере.

## Деплой на VPS

Так как сайт статический, на VPS не нужен Node.js в runtime. Node нужен только для сборки.

### Вариант 1: собирать локально и загрузить `dist`

1. Соберите проект:

```bash
npm run build
```

2. Загрузите содержимое папки `dist` на сервер, например в:

```txt
/var/www/sem-student-guide
```

3. Настройте Nginx на эту папку.

Пример конфига Nginx:

```nginx
server {
    listen 80;
    server_name your-domain.ru;

    root /var/www/sem-student-guide;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

`try_files ... /index.html` нужен, потому что сайт работает как SPA: маршруты вроде `/study` и `/contacts` обрабатывает React.

## Автодеплой через GitHub Actions

В проекте есть минимальный workflow:

```txt
.github/workflows/deploy.yml
```

Он запускается при push в ветку `main` и делает:

1. Устанавливает зависимости через `npm ci`.
2. Собирает сайт через `npm run build`.
3. Подготавливает VPS: ставит `nginx` и `rsync`, если сервер на Ubuntu/Debian.
4. Создает папку деплоя.
5. Загружает содержимое `dist/` на VPS по SSH.
6. Проверяет и перезагружает Nginx.

Node.js на VPS не нужен: сборка происходит внутри GitHub Actions.

### Secrets в GitHub

В репозитории GitHub откройте:

```txt
Settings / Secrets and variables / Actions / New repository secret
```

Добавьте:

| Secret | Что указать |
| --- | --- |
| `SSH_PRIVATE_KEY` | Приватный SSH-ключ для доступа к VPS |
| `SSH_HOST` | IP-адрес или домен VPS |
| `SSH_USER` | Пользователь на сервере, например `root` или `deploy` |
| `SSH_PORT` | SSH-порт, обычно `22` |
| `DEPLOY_PATH` | Папка сайта на сервере, например `/var/www/sem-student-guide` |

Публичный ключ должен быть добавлен на сервер в:

```txt
~/.ssh/authorized_keys
```

### Подготовка папки на VPS

CI сам попробует создать папку и выдать права пользователю деплоя:

```bash
sudo mkdir -p /var/www/sem-student-guide
sudo chown -R deploy:deploy /var/www/sem-student-guide
```

Но для этого пользователь из `SSH_USER` должен иметь доступ к `sudo`. Если деплоите под `root`, отдельная настройка прав обычно не нужна. Отдельный пользователь `deploy` аккуратнее, но его нужно один раз создать на сервере и добавить ему SSH-ключ.

### Что CI не настраивает автоматически

Workflow автоматически создает базовый Nginx server block для открытия сайта по IP и по домену `dvfu-students.ru`, когда DNS начнет указывать на VPS. Он использует такой `server_name`:

```nginx
server_name _ dvfu-students.ru www.dvfu-students.ru;
```

Путь берется из секрета `DEPLOY_PATH`, например:

```txt
/var/www/sem-student-site
```

После успешного деплоя сайт должен открываться по IP сервера. Когда домен активируется и A-запись будет указывать на IP VPS, тот же сайт начнет открываться по домену.

Когда появится домен, Nginx-конфиг можно заменить на доменный вариант и добавить SSL.

Nginx-конфиг ниже нужен как пример для ручной доменной настройки.

### Nginx для GitHub Actions деплоя

```nginx
server {
    listen 80;
    server_name your-domain.ru;

    root /var/www/sem-student-guide;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

После изменения конфига:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Вариант 2: собирать прямо на VPS

На сервере:

```bash
git clone <repo-url>
cd sem-student-guide
npm install
npm run build
```

После этого укажите Nginx на папку:

```txt
<путь-к-проекту>/dist
```

## Как загрузить проект на GitHub

Если репозиторий на GitHub уже создан, подключите его как `origin`.

```bash
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git branch -M main
git add .
git commit -m "Initial MVP"
git push -u origin main
```

Если GitHub просит авторизацию, удобнее использовать GitHub Desktop или Personal Access Token вместо пароля.

Если репозиторий еще не создан:

1. Откройте GitHub.
2. Нажмите **New repository**.
3. Назовите репозиторий, например `sem-student-guide`.
4. Не добавляйте README, `.gitignore` и license на GitHub, потому что они уже есть локально.
5. Создайте репозиторий.
6. Выполните команды, которые GitHub покажет для "push an existing repository".

Проверить, подключен ли remote:

```bash
git remote -v
```

## Нужен ли Docker

Для текущего проекта Docker не нужен.

Причина простая: это статический сайт. После `npm run build` получается папка `dist/` с HTML, CSS, JS и индексом поиска. На сервере достаточно Nginx, который отдает эти файлы.

Docker может понадобиться позже, если появятся:

- backend;
- база данных;
- CMS на сервере;
- несколько сервисов;
- сложные окружения для разработки и деплоя.

Для MVP Docker добавит лишний слой: образ, registry, контейнер, volume, reverse proxy. Практической пользы сейчас мало.

## Где лежит контент

Основной контент:

```txt
content/ru/
```

Каждая страница - отдельный Markdown-файл:

- `start.md`
- `study.md`
- `exams.md`
- `contacts.md`
- `opportunities.md`
- и другие.

В начале файла есть метаданные:

```yaml
---
id: start
category: start
title: Начать учиться
summary: Первые цифровые сервисы, которые нужны студенту ШЭМ.
source: "Раздел 3 и Приложение хэндбука ШЭМ"
lastReviewed: 2026-05-01
related:
  - contacts
---
```

После изменения контента нужно заново выполнить:

```bash
npm run build
```

Это обновит и страницы, и поисковый индекс.

## Что важно проверить перед реальной публикацией

- Актуальность контактов, кабинетов, телефонов и email.
- Актуальность ссылок и названий разделов сайта ДВФУ.
- Формулировки про визы, регистрацию, отчисление и академический отпуск.
- Английскую и китайскую версии контента, когда они появятся.
