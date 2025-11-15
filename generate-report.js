import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, UnderlineType } from 'docx';
import fs from 'fs';

const doc = new Document({
  sections: [{
    properties: {},
    children: [
      // Заголовок
      new Paragraph({
        text: "Неделя 1",
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Команда: ",
            bold: true
          }),
          new TextRun("Команда 2")
        ],
        spacing: { after: 100 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Тема: ",
            bold: true
          }),
          new TextRun('API-сервис "DataAPI"')
        ],
        spacing: { after: 100 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Дата: ",
            bold: true
          }),
          new TextRun("11.11.2025")
        ],
        spacing: { after: 300 }
      }),

      // Выполненные задачи
      new Paragraph({
        text: "Выполненные задачи:",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 150 }
      }),

      new Paragraph({
        text: "✓ Выбор тематики проекта - API-сервис для управления данными",
        bullet: { level: 0 },
        spacing: { after: 100 }
      }),

      new Paragraph({
        text: "✓ Определение технологического стека (React, Vite, Tailwind CSS)",
        bullet: { level: 0 },
        spacing: { after: 100 }
      }),

      new Paragraph({
        text: "✓ Проектирование архитектуры REST API и структуры документации",
        bullet: { level: 0 },
        spacing: { after: 100 }
      }),

      new Paragraph({
        text: "✓ Разработка полнофункциональной документации API с интерактивными примерами",
        bullet: { level: 0 },
        spacing: { after: 100 }
      }),

      new Paragraph({
        text: "✓ Реализация следующих разделов документации:",
        bullet: { level: 0 },
        spacing: { after: 50 }
      }),

      new Paragraph({
        text: "JWT аутентификация с примерами кода",
        bullet: { level: 1 },
        spacing: { after: 50 }
      }),

      new Paragraph({
        text: "CRUD операции для управления пользователями и данными",
        bullet: { level: 1 },
        spacing: { after: 50 }
      }),

      new Paragraph({
        text: "Rate Limiting с гибкими тарифными планами",
        bullet: { level: 1 },
        spacing: { after: 50 }
      }),

      new Paragraph({
        text: "Управление API Keys с различными уровнями доступа",
        bullet: { level: 1 },
        spacing: { after: 50 }
      }),

      new Paragraph({
        text: "Версионирование API (v1, v2)",
        bullet: { level: 1 },
        spacing: { after: 50 }
      }),

      new Paragraph({
        text: "Поддержка JSON/XML форматов ответов",
        bullet: { level: 1 },
        spacing: { after: 100 }
      }),

      new Paragraph({
        text: "✓ Создание интерактивного API Explorer для тестирования endpoints",
        bullet: { level: 0 },
        spacing: { after: 100 }
      }),

      new Paragraph({
        text: "✓ Настройка CI/CD и публикация проекта на GitHub",
        bullet: { level: 0 },
        spacing: { after: 100 }
      }),

      new Paragraph({
        text: "✓ Изучение OWASP Top 10 и применение best practices безопасности",
        bullet: { level: 0 },
        spacing: { after: 300 }
      }),

      // Текущий этап
      new Paragraph({
        text: "Текущий этап:",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 150 }
      }),

      new Paragraph({
        text: "Проект находится на стадии завершения первой недели разработки. Создана полноценная документация API-сервиса с адаптивным дизайном, интерактивными примерами кода и встроенным тестовым инструментом (API Explorer). Реализована навигационная структура с 8 основными разделами, включающая детальное описание аутентификации, endpoints, системы ключей доступа и механизмов безопасности.",
        spacing: { after: 150 }
      }),

      new Paragraph({
        text: "Веб-приложение успешно развернуто с использованием современного стека технологий и готово к демонстрации базового функционала.",
        spacing: { after: 300 }
      }),

      // Проблемы и сложности
      new Paragraph({
        text: "Проблемы и сложности:",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 150 }
      }),

      new Paragraph({
        text: "GitHub Push Protection - при первоначальной попытке публикации кода система безопасности GitHub заблокировала push из-за обнаружения паттернов, похожих на реальные API ключи Stripe в примерах документации. Проблема решена путем изменения формата примеров ключей с sk_live_* на dataapi_live_*.",
        bullet: { level: 0 },
        spacing: { after: 100 }
      }),

      new Paragraph({
        text: "Настройка Tailwind CSS - потребовалось дополнительное время на правильную конфигурацию утилитарных классов и создание кастомных CSS правил для обеспечения корректной работы layout'а.",
        bullet: { level: 0 },
        spacing: { after: 100 }
      }),

      new Paragraph({
        text: "Оптимизация структуры кода - необходимость балансировки между простотой кода и функциональностью для обеспечения читаемости документации.",
        bullet: { level: 0 },
        spacing: { after: 300 }
      }),

      // План на следующую неделю
      new Paragraph({
        text: "План на следующую неделю:",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 150 }
      }),

      new Paragraph({
        text: "Разработка backend части API на Node.js/Express с подключением базы данных",
        bullet: { level: 0 },
        spacing: { after: 100 }
      }),

      new Paragraph({
        text: "Реализация JWT аутентификации и системы управления API ключами",
        bullet: { level: 0 },
        spacing: { after: 100 }
      }),

      new Paragraph({
        text: "Внедрение Rate Limiting middleware для защиты от DDoS атак",
        bullet: { level: 0 },
        spacing: { after: 100 }
      }),

      new Paragraph({
        text: "Создание CRUD endpoints для работы с данными",
        bullet: { level: 0 },
        spacing: { after: 100 }
      }),

      new Paragraph({
        text: "Интеграция Swagger/OpenAPI для автоматической генерации документации",
        bullet: { level: 0 },
        spacing: { after: 100 }
      }),

      new Paragraph({
        text: "Написание unit и integration тестов",
        bullet: { level: 0 },
        spacing: { after: 100 }
      }),

      new Paragraph({
        text: "Настройка Docker контейнеризации проекта",
        bullet: { level: 0 },
        spacing: { after: 100 }
      }),

      new Paragraph({
        text: "Продолжение изучения OWASP Top 10 и применение мер безопасности",
        bullet: { level: 0 },
        spacing: { after: 300 }
      }),

      // Распределение обязанностей
      new Paragraph({
        text: "Распределение обязанностей:",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 150 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Утепов Бекасыл ",
            bold: true
          }),
          new TextRun("(Fullstack Developer, DevOps Engineer, Security Specialist, Code Wizard 🧙‍♂️): ")
        ],
        spacing: { after: 100 }
      }),

      new Paragraph({
        text: "Разработка полной архитектуры приложения и структуры документации",
        bullet: { level: 0 },
        spacing: { after: 50 }
      }),

      new Paragraph({
        text: "Создание всех React компонентов и страниц документации (Introduction, Authentication, Endpoints, API Explorer, API Keys, Rate Limiting, Versioning, Response Formats)",
        bullet: { level: 0 },
        spacing: { after: 50 }
      }),

      new Paragraph({
        text: "Настройка routing с использованием React Router",
        bullet: { level: 0 },
        spacing: { after: 50 }
      }),

      new Paragraph({
        text: "Разработка адаптивного UI/UX дизайна с Tailwind CSS",
        bullet: { level: 0 },
        spacing: { after: 50 }
      }),

      new Paragraph({
        text: "Реализация интерактивного API Explorer для тестирования endpoints",
        bullet: { level: 0 },
        spacing: { after: 50 }
      }),

      new Paragraph({
        text: "Создание компонента CodeBlock с функцией копирования кода",
        bullet: { level: 0 },
        spacing: { after: 50 }
      }),

      new Paragraph({
        text: "Написание технической документации с примерами для cURL, JavaScript, Python, Node.js",
        bullet: { level: 0 },
        spacing: { after: 50 }
      }),

      new Paragraph({
        text: "Настройка Git репозитория и решение проблем с GitHub Push Protection",
        bullet: { level: 0 },
        spacing: { after: 50 }
      }),

      new Paragraph({
        text: "Применение принципов безопасности OWASP в документации",
        bullet: { level: 0 },
        spacing: { after: 50 }
      }),

      new Paragraph({
        text: "Настройка build процесса и оптимизация производительности",
        bullet: { level: 0 },
        spacing: { after: 200 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Жарылқасын Әкімхан ",
            bold: true
          }),
          new TextRun("(Инвестор, Product Owner): ")
        ],
        spacing: { after: 100 }
      }),

      new Paragraph({
        text: "Участие в определении концепции и целей проекта",
        bullet: { level: 0 },
        spacing: { after: 50 }
      }),

      new Paragraph({
        text: "Анализ требований к функциональности API-сервиса",
        bullet: { level: 0 },
        spacing: { after: 50 }
      }),

      new Paragraph({
        text: "Обеспечение ресурсов для разработки проекта",
        bullet: { level: 0 },
        spacing: { after: 50 }
      }),

      new Paragraph({
        text: "Контроль соответствия проекта бизнес-требованиям",
        bullet: { level: 0 },
        spacing: { after: 200 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Аңсаған ",
            bold: true
          }),
          new TextRun("(Инвестор, Stakeholder): ")
        ],
        spacing: { after: 100 }
      }),

      new Paragraph({
        text: "Участие в стратегическом планировании проекта",
        bullet: { level: 0 },
        spacing: { after: 50 }
      }),

      new Paragraph({
        text: "Оценка рыночного потенциала API-сервиса",
        bullet: { level: 0 },
        spacing: { after: 50 }
      }),

      new Paragraph({
        text: "Финансовая поддержка разработки",
        bullet: { level: 0 },
        spacing: { after: 50 }
      }),

      new Paragraph({
        text: "Мониторинг прогресса и качества выполнения задач",
        bullet: { level: 0 },
        spacing: { after: 400 }
      }),

      // Технический стек
      new Paragraph({
        text: "Использованные технологии:",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 150 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Frontend: ",
            bold: true
          }),
          new TextRun("React 19.2.0, Vite 7.2.2, React Router DOM, Tailwind CSS 4.1.17")
        ],
        spacing: { after: 100 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "UI/UX: ",
            bold: true
          }),
          new TextRun("Lucide React (иконки), адаптивный дизайн, темная боковая панель")
        ],
        spacing: { after: 100 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Инструменты разработки: ",
            bold: true
          }),
          new TextRun("ESLint 9.39.1, Git, GitHub, VS Code")
        ],
        spacing: { after: 100 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Планируется: ",
            bold: true
          }),
          new TextRun("Node.js, Express, MongoDB/PostgreSQL, JWT, Swagger, Docker")
        ],
        spacing: { after: 300 }
      }),

      // Ссылки
      new Paragraph({
        text: "Ссылки на проект:",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 200, after: 150 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "GitHub Repository: ",
            bold: true
          }),
          new TextRun({
            text: "https://github.com/bekasyldev/data-api",
            color: "0000FF",
            underline: {
              type: UnderlineType.SINGLE
            }
          })
        ],
        spacing: { after: 100 }
      }),

      new Paragraph({
        children: [
          new TextRun({
            text: "Локальный запуск: ",
            bold: true
          }),
          new TextRun("npm install && npm run dev")
        ],
        spacing: { after: 100 }
      }),
    ]
  }]
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("Отчет_Неделя_1_Команда_2_DataAPI.docx", buffer);
  console.log("✅ Отчет успешно создан: Отчет_Неделя_1_Команда_2_DataAPI.docx");
});
