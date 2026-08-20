import classes from '@/styles/pages/childSafetyStandards.module.scss';

const definitions = [
    'Будь-які зображення, відео чи текстові матеріали, що містять сексуальне насильство над неповнолітніми (CSAM — Child Sexual Abuse Material)',
    'Грумінг (grooming) — встановлення довірливих стосунків з дитиною з метою подальшого сексуального зловживання',
    'Сексуальна експлуатація в будь-яких формах, включно з примусом до створення контенту сексуального характеру',
    'Поширення, зберігання чи обговорення матеріалів, що містять дитячу порнографію або жорстоке поводження з дітьми',
    'Онлайн-переслідування та домагання щодо неповнолітніх',
];

const forbiddenActions = [
    'Розміщувати, передавати, публікувати, запитувати або поширювати будь-які матеріали сексуального характеру за участю осіб віком до 18 років',
    'Використовувати застосунок для пошуку неповнолітніх з метою сексуальної експлуатації',
    'Обмінюватися посиланнями на зовнішні ресурси, що містять CSAE-матеріали',
    'Створювати облікові записи від імені неповнолітніх для введення в оману та подальшого зловживання',
    'Згадувати, кодувати чи натякати на CSAE-матеріали з використанням будь-якого контенту (текст, зображення, аудіо, відео, емодзі)',
];

const moderationMeasures = [
    'Усі користувацькі матеріали проходять модерацію з використанням автоматичних систем розпізнавання CSAE-контенту',
    'Підозрілі матеріали негайно блокуються та скеровуються на ручну перевірку',
    'Ми співпрацюємо з базами даних хешів CSAE (зокрема з базою даних Національного центру зниклих та експлуатованих дітей — NCMEC)',
];

const detectionSteps = [
    {
        n: 1,
        title: 'Видалення та блокування',
        text: 'негайно видаляємо відповідний контент і блокуємо користувача.',
    },
    {
        n: 2,
        title: 'Передача органам',
        text: 'передаємо інформацію до уповноважених органів (правоохоронні органи, NCMEC, Інтерпол).',
    },
    {
        n: 3,
        title: 'Збереження доказів',
        text: 'зберігаємо всі логи та докази для передачі правоохоронним органам.',
    },
    {
        n: 4,
        title: 'Співпраця',
        text: 'повністю співпрацюємо з офіційними розслідуваннями.',
    },
];

const userDuties = [
    'Негайно повідомляти про будь-які підозри на CSAE через контактний канал підтримки',
    'Не взаємодіяти та не відповідати на провокаційний контент',
    'Поважати вікові обмеження та політику безпеки',
];

const tocItems = [
    { id: 's1', label: 'Загальні' },
    { id: 's2', label: 'Визначення' },
    { id: 's3', label: 'Заборона' },
    { id: 's4', label: 'Вік' },
    { id: 's5', label: 'Модерація' },
    { id: 's6', label: 'Дії' },
    { id: 's7', label: "Обов'язки" },
    { id: 's8', label: 'Контакти' },
    { id: 's9', label: 'Органи' },
    { id: 's10', label: 'Перегляд' },
];

export default function ChildSafetyStandards() {
    return (
        <div className={classes.wrapper}>
            <nav className={classes.toc}>
                <div className={classes.tocInner}>
                    {tocItems.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={classes.tocLink}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </nav>

            <div className={classes.hero}>
                <div className={classes.heroTitle}>Стандарти захисту дітей</div>
                <div className={classes.noteBar}>
                    Політика протидії сексуальному насильству над дітьми та їх
                    експлуатації (Child Sexual Abuse and Exploitation — CSAE) у
                    застосунку <strong>«Nadiya»</strong>. Політика нульової
                    толерантності.
                </div>
            </div>

            <div className={classes.container}>
                <section className={classes.section} id="s1">
                    <div className={classes.sectionTitle}>
                        1. Загальні положення
                    </div>
                    <div className={classes.body}>
                        <p>
                            Ці стандарти безпеки дітей встановлюють абсолютну
                            заборону на будь-які форми сексуального насильства
                            над дітьми (Child Sexual Abuse and Exploitation —
                            CSAE) та експлуатації неповнолітніх у застосунку{' '}
                            <strong>«Nadiya»</strong>.
                        </p>
                        <p>
                            Ми дотримуємося політики нульової толерантності
                            (zero-tolerance) до всіх форм жорстокого поводження
                            з дітьми.
                        </p>
                    </div>
                </section>

                <section className={classes.section} id="s2">
                    <div className={classes.sectionTitle}>2. Визначення</div>
                    <div className={classes.body}>
                        <p>
                            Під сексуальним насильством та експлуатацією дітей
                            розуміються:
                        </p>
                        <ul className={classes.gridList}>
                            {definitions.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className={classes.section} id="s3">
                    <div className={classes.sectionTitle}>
                        3. Категорична заборона
                    </div>
                    <div className={classes.body} style={{ marginBottom: 18 }}>
                        <p>У застосунку «Nadiya» суворо заборонено:</p>
                    </div>
                    <div
                        className={`${classes.gridCard} ${classes.gridCardNo}`}
                    >
                        <div className={classes.gridCardTitle}>Заборонено</div>
                        <ul className={classes.gridList}>
                            {forbiddenActions.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className={classes.section} id="s4">
                    <div className={classes.sectionTitle}>
                        4. Вікові обмеження
                    </div>
                    <div className={classes.body}>
                        <div className={classes.ageBadge}>18+</div>
                        <p>
                            Застосунок «Nadiya» призначений для користувачів
                            віком від 18 років (або таких, що досягли віку
                            повноліття у своїй країні).
                        </p>
                        <p>
                            Ми залишаємо за собою право запитувати підтвердження
                            віку та відмовляти у доступі користувачам, які не
                            підтвердили свій вік.
                        </p>
                    </div>
                </section>

                <section className={classes.section} id="s5">
                    <div className={classes.sectionTitle}>
                        5. Модерація та автоматична фільтрація
                    </div>
                    <div className={classes.body}>
                        <ul className={classes.gridList}>
                            {moderationMeasures.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className={classes.section} id="s6">
                    <div className={classes.sectionTitle}>
                        6. Дії у разі виявлення CSAE
                    </div>
                    <div className={classes.body} style={{ marginBottom: 18 }}>
                        <p>
                            У разі виявлення будь-якої ознаки сексуального
                            насильства над дітьми ми:
                        </p>
                    </div>
                    <div className={classes.steps}>
                        {detectionSteps.map(({ n, title, text }) => (
                            <div className={classes.step} key={n}>
                                <div className={classes.stepNum}>{n}</div>
                                <div className={classes.stepBody}>
                                    <strong>{title}</strong>
                                    {text}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 7 */}
                <section className={classes.section} id="s7">
                    <div className={classes.sectionTitle}>
                        7. Обов'язки користувачів
                    </div>
                    <div className={classes.body}>
                        <p>Користувачі застосунку «Nadiya» зобов'язані:</p>
                        <ul className={classes.gridList}>
                            {userDuties.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* 8 */}
                <section className={classes.section} id="s8">
                    <div className={classes.sectionTitle}>
                        8. Контактна інформація для повідомлень про порушення
                    </div>
                    <div className={classes.body}>
                        <p>
                            Якщо ви стали свідком будь-яких порушень цих
                            стандартів або хочете повідомити про підозрілу
                            поведінку, зверніться до нас. Крім того, ви можете
                            повідомити про порушення до відповідних органів
                            вашої країни.
                        </p>
                    </div>
                    <div className={classes.contactGrid}>
                        <div className={classes.contactItem}>
                            <div className={classes.contactLabel}>Email</div>
                            <div className={classes.contactValue}>
                                <a href="mailto:n.nadiya.ukr@gmail.com">
                                    n.nadiya.ukr@gmail.com
                                </a>
                            </div>
                        </div>
                        <div className={classes.contactItem}>
                            <div className={classes.contactLabel}>
                                NCMEC (США)
                            </div>
                            <div className={classes.contactValue}>
                                <a
                                    href="https://report.cybertip.org/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    report.cybertip.org
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 9 */}
                <section className={classes.section} id="s9">
                    <div className={classes.sectionTitle}>
                        9. Співпраця з правоохоронними органами
                    </div>
                    <div className={classes.body}>
                        <p>
                            Ми повністю співпрацюємо з правоохоронними органами
                            всіх країн у питаннях розслідування випадків
                            сексуального насильства над дітьми та надаємо всю
                            запитувану інформацію відповідно до чинного
                            законодавства.
                        </p>
                    </div>
                </section>

                {/* 10 */}
                <section className={classes.section} id="s10">
                    <div className={classes.sectionTitle}>
                        10. Перегляд політики
                    </div>
                    <div className={classes.body}>
                        <p>
                            Ці стандарти переглядаються не рідше одного разу на
                            рік і можуть бути оновлені відповідно до змін
                            законодавства та рекомендацій регуляторних органів.
                        </p>
                    </div>
                </section>

                <hr className={classes.divider} />

                <div className={classes.endNote}>
                    © {new Date().getFullYear()} Nadiya. Усі права захищені.
                </div>
            </div>
        </div>
    );
}
