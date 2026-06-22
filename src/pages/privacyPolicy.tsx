import classes from "@/styles/pages/privacyPolicy.module.scss";

const collectedData = [
    "Імена та прізвища контактів",
    "Номери телефонів",
    "Адреси електронної пошти (якщо вони зазначені в контакті)",
    "Додаткові поля (дати народження, нотатки тощо) — лише за вашим явним дозволом",
];

const notCollectedData = [
    "Геолокацію",
    "Фотографії / медіафайли (крім аватарів контактів, якщо ви надали згоду)",
    "Історію дзвінків та SMS",
    "Дані про інші встановлені застосунки",
    "Рекламні ідентифікатори (IDFA / GAID)",
];

const protectionMeasures = [
    "Шифрування даних під час передачі та у стані спокою (AES-256)",
    "Обмежений доступ до серверів з боку співробітників",
    "Регулярне резервне копіювання (із збереженням шифрування)",
];

const deletionSteps = [

    {
        n: 1,
        title: "За запитом",
        text: "надішліть листа на n.nadiya.ukr@gmail.com з темою «Видалення моїх контактів». Вкажіть ваш ідентифікатор користувача або email, прив'язаний до облікового запису.",
    },

];

const tocItems = [
    { id: "s1", label: "Загальні" },
    { id: "s2", label: "Дані" },
    { id: "s3", label: "Згода" },
    { id: "s4", label: "Мета" },
    { id: "s5", label: "Зберігання" },
    { id: "s6", label: "Права" },
    { id: "s7", label: "Треті особи" },
    { id: "s8", label: "Транскордонно" },
    { id: "s9", label: "Неповнолітні" },
    { id: "s10", label: "Зміни" },
    { id: "s11", label: "Контакти" },
    { id: "s12", label: "Закон України" },
];

function Placeholder({ children }: { children: React.ReactNode }) {
    return <span className={classes.placeholder}>{children}</span>;
}

export default function PrivacyPolicy() {
    return (
        <div className={classes.wrapper}>

            {/* TOC */}
            <nav className={classes.toc}>
                <div className={classes.tocInner}>
                    {tocItems.map((item) => (
                        <a key={item.id} href={`#${item.id}`} className={classes.tocLink}>
                            {item.label}
                        </a>
                    ))}
                </div>
            </nav>

            {/* HERO */}
            <div className={classes.hero}>
                <div className={classes.heroTitle}>Політика конфіденційності</div>

            </div>

            <div className={classes.container}>

                {/* 1 */}
                <section className={classes.section} id="s1">
                    <div className={classes.sectionTitle}>1. Загальні положення</div>
                    <div className={classes.body}>
                        <p>
                            Ця Політика конфіденційності (далі — «Політика») визначає порядок обробки та захисту персональних даних користувачів мобільного застосунку <strong>«Nnadiya»</strong> (далі — «Застосунок»).
                        </p>
                        <p>
                            Ми поважаємо ваше право на приватність і зобов'язуємося захищати ваші дані. Використовуючи Застосунок, ви надаєте свою згоду на збір та використання інформації відповідно до цієї Політики.
                        </p>
                        <p>
                            Обробка персональних даних здійснюється відповідно до вимог Закону України «Про захист персональних даних».
                        </p>
                    </div>
                </section>

                {/* 2 */}
                <section className={classes.section} id="s2">
                    <div className={classes.sectionTitle}>2. Які дані ми збираємо</div>
                    <div className={classes.body}>
                        <p>Єдиний тип даних, що збираються, — це інформація з вашої телефонної книги (контактів).</p>
                    </div>
                    <div className={classes.grid}>
                        <div className={`${classes.gridCard} ${classes.gridCardYes}`}>
                            <div className={classes.gridCardTitle}>Ми збираємо</div>
                            <ul className={classes.gridList}>
                                {collectedData.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                        <div className={`${classes.gridCard} ${classes.gridCardNo}`}>
                            <div className={classes.gridCardTitle}>Ми НЕ збираємо</div>
                            <ul className={classes.gridList}>
                                {notCollectedData.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 3 */}
                <section className={classes.section} id="s3">
                    <div className={classes.sectionTitle}>3. Згода користувача</div>
                    <div className={classes.body}>
                        <p>Збір даних телефонної книги відбувається виключно після явної та усвідомленої згоди користувача.</p>
                        <p>При першому запуску Застосунок запитає дозвіл на доступ до контактів. Якщо ви не надасте згоди, функція синхронізації контактів буде недоступною, але інший функціонал Застосунку (якщо він є) збережеться.</p>
                        <p>Ви можете в будь-який момент відкликати згоду через налаштування вашого пристрою (дозволи застосунку) або через інтерфейс Застосунку.</p>
                    </div>
                </section>

                {/* 4 */}
                <section className={classes.section} id="s4">
                    <div className={classes.sectionTitle}>4. Мета збору даних</div>
                    <div className={classes.body}>
                        <p>Зібрані контакти використовуються виключно для:</p>
                        <ul className={classes.gridList} style={{ marginBottom: 14 }}>
                            <li>Забезпечення роботи основного функціоналу Застосунку (наприклад, пошук друзів, запрошення, ідентифікація контактів у сервісі)</li>
                            <li>Покращення якості надання послуг</li>
                        </ul>
                        <p><strong>Ми НЕ передаємо ваші контакти третім особам</strong> і НЕ використовуємо їх для таргетованої реклами.</p>
                    </div>
                </section>

                {/* 5 */}
                <section className={classes.section} id="s5">
                    <div className={classes.sectionTitle}>5. Зберігання даних</div>
                    <div className={classes.body}>
                        <p>
                            Усі дані про контакти передаються захищеним каналом (HTTPS/TLS) і зберігаються на нашому захищеному сервері, розташованому в Українi.
                        </p>
                        <p style={{ fontWeight: 700, marginBottom: 10 }}>Заходи захисту:</p>
                        <ul className={classes.gridList} style={{ marginBottom: 14 }}>
                            {protectionMeasures.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                        <p>
                            Термін зберігання даних визначається строком використання вами Застосунку. Якщо ви не користуєтеся Застосунком більше12 місяців, ми можемо видалити ваші дані, попередивши вас за 30 днів.
                        </p>
                    </div>
                </section>

                {/* 6 */}
                <section className={classes.section} id="s6">
                    <div className={classes.sectionTitle}>6. Права користувача (видалення даних)</div>
                    <div className={classes.body}>
                        <p><strong>Ви маєте повне право в будь-який момент запитати видалення всіх ваших даних з нашого сервера.</strong></p>
                        <p>Способи видалення:</p>
                    </div>
                    <div className={classes.steps}>
                        {deletionSteps.map(({ n, title, text }) => (
                            <div className={classes.step} key={n}>
                                <div className={classes.stepNum}>{n}</div>
                                <div className={classes.stepBody}>
                                    <strong>{title}</strong>
                                    {text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={classes.body} style={{ marginTop: 16 }}>
                        <p>Строк опрацювання запиту на видалення — не більше 7 робочих днів з моменту підтвердження вашої особи. Після видалення дані не підлягають відновленню.</p>
                    </div>
                </section>

                {/* 7 */}
                <section className={classes.section} id="s7">
                    <div className={classes.sectionTitle}>7. Передача даних третім особам</div>
                    <div className={classes.body}>
                        <p>Ми не продаємо, не обмінюємо та не передаємо ваші контакти будь-яким третім сторонам, за винятком випадків, прямо передбачених законом (наприклад, на вимогу суду або правоохоронних органів).</p>
                        <p>Субпроцесори (хостинг-провайдери, хмарні сервіси) можуть мати доступ до даних, але виключно в рамках технічного обслуговування та за умови підписання з ними угод про конфіденційність (DPA).</p>
                    </div>
                </section>

                {/* 8 */}
                <section className={classes.section} id="s8">
                    <div className={classes.sectionTitle}>8. Транскордонна передача даних</div>
                    <div className={classes.body}>
                        <p>Транскордонна передача ваших даних не передбачається.</p>
                    </div>
                </section>

                {/* 9 */}
                <section className={classes.section} id="s9">
                    <div className={classes.sectionTitle}>9. Захист даних неповнолітніх</div>
                    <div className={classes.body}>
                        <p>Застосунок не призначений для дітей молодше 13 років. Ми не збираємо свідомо дані неповнолітніх. Якщо ви дізналися, що ваша дитина надала нам свої контакти, зв'яжіться з нами для негайного видалення.</p>
                    </div>
                </section>

                {/* 10 */}
                <section className={classes.section} id="s10">
                    <div className={classes.sectionTitle}>10. Зміни в Політиці</div>
                    <div className={classes.body}>
                        <p>Ми можемо періодично оновлювати цю Політику. Про суттєві зміни ми повідомимо вас  електронною поштою. Продовжуючи використовувати Застосунок після змін, ви приймаєте нову версію Політики.</p>
                    </div>
                </section>

                {/* 11 */}
                <section className={classes.section} id="s11">
                    <div className={classes.sectionTitle}>11. Контактна інформація</div>
                    <div className={classes.body}>
                        <p>З усіх питань, що стосуються обробки ваших даних, реалізації права на видалення, а також для подання скарг до наглядових органів, звертайтеся до нашого спеціаліста із захисту даних (Data Protection Officer):</p>
                    </div>
                    <div className={classes.contactGrid}>
                        <div className={classes.contactItem}>
                            <div className={classes.contactLabel}>Email</div>
                            <div className={classes.contactValue}>n.nadiya.ukr@gmail.com</div>
                        </div>

                    </div>
                </section>

                <hr className={classes.divider} />



                <div className={classes.endNote}>
                    © {new Date().getFullYear()} Nnadiya. Усі права захищені.
                </div>

            </div>
        </div>
    );
}
