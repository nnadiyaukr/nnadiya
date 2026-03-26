import { useState } from 'react';

const styles = `
  :root {
    --navy: #0d1f3c;
    --blue: #1a3a6b;
    --white: #ffffff;
    --gray: #6b7280;
    --red: #c0392b;
    --green: #1e6b4a;
    --green-light: #e8f5ee;
    --border: #ddd8cc;
  }

  .viplata-page * { box-sizing: border-box; margin: 0; padding: 0; }
  .viplata-page { scroll-behavior: smooth; }

  .viplata-page {
    font-family: 'Roboto', sans-serif;
    background: -webkit-linear-gradient(90deg, #ca5875, #96c0ee);
    background: linear-gradient(90deg, #ca5875, #96c0ee);
    color: var(--navy);
    font-size: 16px;
    line-height: 1.75;
  }

  .viplata-page .toc {
  margin-top: 30px;
    background: var(--white);
    border-bottom: 2px solid #c9993a;
    position: sticky;
    top: 0;
    z-index: 2;
    box-shadow: 0 2px 12px rgba(13,31,60,0.08);
  }
  .viplata-page .toc-inner {
    max-width: 1080px;
    margin: 0 auto;
    padding: 0 24px;
    overflow-x: auto;
    white-space: nowrap;
    display: flex;
    gap: 0;
  }
  .viplata-page .toc a {
    display: inline-block;
    padding: 14px 18px;
    font-size: 13px;
    font-weight: 700;
    color: var(--blue);
    text-decoration: none;
    border-bottom: 3px solid transparent;
    transition: color 0.2s, border-color 0.2s;
    letter-spacing: 0.3px;
  }
  .viplata-page .toc a:hover { color: #000000; border-bottom-color: #000000; }

  .viplata-page .container {
    max-width: 860px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .viplata-page .section {
    padding: 56px 0 24px;
  }

  .viplata-page .section-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 28px;
  }

  .viplata-page .section h2 {
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    line-height: 1.2;
    text-align: center;
    max-width: 700px;
    margin: 0 auto;
    color: #ffffff;
    background: black;
    border-radius: 30px;
    padding: 20px;
    font-size: clamp(25px, 23.5714285714px + 0.4464285714vw, 27px);
  }

  .viplata-page .divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 48px 0 0;
  }

  .viplata-page p { margin-bottom: 16px; }
  .viplata-page p:last-child { margin-bottom: 0; }
  .viplata-page ul, .viplata-page ol { padding-left: 22px; margin-bottom: 16px; }
  .viplata-page li { margin-bottom: 8px; }

  .viplata-page .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
    margin: 24px 0;
  }
  .viplata-page .card {
    background: var(--white);
    border-radius: 16px;
    padding: 24px;
    border: 1.5px solid var(--border);
    box-shadow: 0 2px 8px rgba(13,31,60,0.05);
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .viplata-page .card:hover { box-shadow: 0 6px 24px rgba(13,31,60,0.1); transform: translateY(-2px); }
  .viplata-page .card h3 { font-size: 15px; font-weight: 700; margin-bottom: 8px; color: var(--navy); }
  .viplata-page .card p { font-size: 14px; color: var(--gray); margin: 0; }

  .viplata-page .amount-table {
    width: 100%;
    border-collapse: collapse;
    margin: 24px 0;
    background: var(--white);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(13,31,60,0.08);
  }
  .viplata-page .amount-table thead { background: var(--navy); color: var(--white); }
  .viplata-page .amount-table th { padding: 16px 20px; font-size: 13px; font-weight: 700; letter-spacing: 0.5px; text-align: left; }
  .viplata-page .amount-table td { padding: 16px 20px; border-bottom: 1px solid var(--border); font-size: 14px; vertical-align: top; }
  .viplata-page .amount-table tr:last-child td { border-bottom: none; }
  .viplata-page .amount-table tr:nth-child(even) td { background: rgba(247,244,238,0.6); }
  .viplata-page .big-amount { font-family: 'Roboto', sans-serif; font-size: 22px; font-weight: 700; color: #000000; }
  .viplata-page .year-row { font-size: 13px; color: var(--blue); margin: 4px 0; }

  .viplata-page .alert {
    border-radius: 12px;
    padding: 18px 22px;
    margin: 20px 0;
    border-left: 4px solid #000000;
    font-size: 15px;
    background: rgba(0, 0, 0, 0.11);
    color: inherit;
  }
  .viplata-page .alert strong { display: block; margin-bottom: 4px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }

  .viplata-page .steps { margin: 24px 0; }
  .viplata-page .step {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    position: relative;
  }
  .viplata-page .step:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 20px; top: 48px;
    width: 2px;
    height: calc(100% - 35px);
    background: linear-gradient(to bottom, #ffffff);
  }
  .viplata-page .step-num {
    width: 42px; height: 42px;
    background: var(--navy);
    color: #ffffff;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    font-weight: 700;
    flex-shrink: 0;
  }
  .viplata-page .step-body { padding-top: 8px; }
  .viplata-page .step-body h4 { font-size: 15px; font-weight: 700; margin-bottom: 6px; color: #000000; }
  .viplata-page .step-body p { font-size: 14px; color: #000000; margin: 0; }

  .viplata-page .category-list { list-style: none; padding: 0; margin: 16px 0; }
  .viplata-page .category-list li {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 14px 18px;
    background: var(--white);
    border-radius: 10px;
    margin-bottom: 10px;
    border: 1.5px solid var(--border);
    font-size: 14px;
  }
  .viplata-page .cat-num {
    background: var(--navy);
    color: #ffffff;
    font-weight: 700;
    font-size: 12px;
    padding: 3px 9px;
    border-radius: 20px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .viplata-page .faq-item {
    background: var(--white);
    border-radius: 12px;
    border: 1.5px solid var(--border);
    margin-bottom: 12px;
    overflow: hidden;
  }
  .viplata-page .faq-q {
    padding: 18px 22px;
    font-weight: 700;
    cursor: pointer;
    display: flex; justify-content: space-between; align-items: center;
    font-size: 15px;
    color: var(--navy);
    user-select: none;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
  }
  .viplata-page .faq-q:hover { background: rgba(201,153,58,0.07); }
  .viplata-page .faq-arrow { transition: transform 0.3s; font-size: 12px; color: #000000; }
  .viplata-page .faq-arrow.open { transform: rotate(180deg); }
  .viplata-page .faq-a {
    padding: 0 22px 18px;
    font-size: 14px;
    color: var(--gray);
    line-height: 1.7;
  }

  .viplata-page .doc-list { list-style: none; padding: 0; margin: 16px 0; }
  .viplata-page .doc-list li {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 12px 0;
    border-bottom: 1px solid var(--border);
    font-size: 14px;
  }
  .viplata-page .doc-list li:last-child { border-bottom: none; }

  .viplata-page .conclusion {
    background: rgba(0, 0, 0, 0.11);
    color: #ffffff;
    border-radius: 20px;
    padding: 48px 40px;
    margin: 48px 0 64px;
    text-align: center;
  }
  .viplata-page .conclusion h2 {
    font-family: 'Roboto', sans-serif;
    font-size: 28px;
    margin-bottom: 16px;
    color: #ffffff;
    background: black;
    border-radius: 30px;
    padding: 20px;
    max-width: 700px;
    margin: 0 auto 16px;
  }
  .viplata-page .conclusion p { color: #ffffff; max-width: 580px; margin: 0 auto 12px; }
  .viplata-page .checklist { list-style: disc; padding-left: 24px; margin: 24px auto; max-width: 480px; text-align: left; }
  .viplata-page .checklist li { color: #ffffff; margin-bottom: 12px; font-size: 15px; }

  .viplata-page footer {
    background: var(--navy);
    color: rgba(255,255,255,0.45);
    text-align: center;
    padding: 24px;
    font-size: 13px;
  }

  .viplata-page .payment-flow {
    display: flex;
    gap: 0;
    margin: 24px 0;
    flex-wrap: wrap;
  }
  .viplata-page .pf-item {
    flex: 1;
    min-width: 160px;
    text-align: center;
    padding: 20px 12px;
    background: var(--white);
    border: 1.5px solid var(--border);
    position: relative;
  }
  .viplata-page .pf-item:first-child { border-radius: 14px 0 0 14px; }
  .viplata-page .pf-item:last-child { border-radius: 0 14px 14px 0; }
  .viplata-page .pf-item:not(:last-child)::after {
    content: '→';
    position: absolute;
    right: -14px; top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    color: #000000;
    z-index: 1;
    background: transparent;
    padding: 0 4px;
  }
  .viplata-page .pf-num { font-family: 'Roboto', sans-serif; font-size: 28px; color: #000000; font-weight: 700; }
  .viplata-page .pf-label { font-size: 12px; color: var(--gray); margin-top: 4px; }

  .viplata-page .situation {
    background: var(--white);
    border-radius: 14px;
    border: 1.5px solid var(--border);
    margin-bottom: 16px;
    overflow: hidden;
  }
  .viplata-page .situation-header {
    background: #ffffff;
    color: #000000;
    padding: 16px 20px;
    border-bottom: 1px solid var(--border);
    font-weight: 700;
    font-size: 15px;
    display: flex; align-items: center; gap: 10px;
  }
  .viplata-page .sit-num {
    background: #000000;
    color: white;
    font-size: 12px;
    padding: 3px 10px;
    border-radius: 20px;
    font-weight: 700;
  }
  .viplata-page .situation-body { padding: 18px 20px; font-size: 14px; color: var(--gray); line-height: 1.7; }
  .viplata-page .situation-verdict {
    margin-top: 12px;
    padding: 12px 14px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
  }
  .viplata-page .verdict-legal { background: #fee2e2; color: var(--red); }
  .viplata-page .verdict-fight { background: var(--green-light); color: var(--green); }

  @media (max-width: 640px) {
    .viplata-page .toc a { padding: 10px 10px; font-size: 11px; }
    .viplata-page .section { padding: 32px 0 12px; }
    .viplata-page .conclusion { padding: 24px 16px; }
    .viplata-page .pf-item:not(:last-child)::after { display: none; }
    .viplata-page .pf-item { border-radius: 10px; margin-bottom: 8px; }
    .viplata-page .card-grid { grid-template-columns: 1fr; }
    .viplata-page .amount-table th, .viplata-page .amount-table td { padding: 10px 12px; font-size: 13px; }
    .viplata-page .big-amount { font-size: 18px; }
    .viplata-page .step { gap: 12px; }
    .viplata-page .step-num { width: 34px; height: 34px; font-size: 15px; }
    .viplata-page .payment-flow { flex-direction: column; }
    .viplata-page .section h2 { font-size: 18px; padding: 14px 16px; border-radius: 20px; }
    .viplata-page .situation-header { font-size: 13px; flex-wrap: wrap; }
    .viplata-page .faq-q { font-size: 13px; padding: 14px 16px; }
    .viplata-page .category-list li { padding: 10px 12px; font-size: 13px; }
    .viplata-page .alert { padding: 14px 16px; font-size: 14px; }
    .viplata-page .conclusion h2 { font-size: 20px; padding: 14px 16px; border-radius: 20px; }
  }

  @media (max-width: 400px) {
    .viplata-page { font-size: 14px; }
    .viplata-page .container { padding: 0 12px; }
    .viplata-page .toc a { padding: 8px 8px; font-size: 10px; }
    .viplata-page .section h2 { font-size: 16px; padding: 12px 14px; border-radius: 16px; }
    .viplata-page .amount-table th, .viplata-page .amount-table td { padding: 8px 10px; font-size: 12px; }
    .viplata-page .big-amount { font-size: 16px; }
    .viplata-page .step-num { width: 30px; height: 30px; font-size: 13px; }
    .viplata-page .faq-q { font-size: 12px; padding: 12px 14px; }
    .viplata-page .situation-header { font-size: 12px; padding: 12px 14px; }
    .viplata-page .situation-body { font-size: 13px; padding: 14px 14px; }
    .viplata-page .category-list li { font-size: 12px; padding: 8px 10px; }
    .viplata-page .card { padding: 16px; }
    .viplata-page .conclusion { padding: 20px 12px; }
    .viplata-page .conclusion h2 { font-size: 16px; }
    .viplata-page .checklist { font-size: 13px; }
    .viplata-page .pf-num { font-size: 22px; }
    .viplata-page .alert { font-size: 13px; padding: 12px 14px; }
  }

  @media (max-width: 320px) {
    .viplata-page { font-size: 13px; }
    .viplata-page .container { padding: 0 8px; }
    .viplata-page .toc a { padding: 7px 6px; font-size: 9px; }
    .viplata-page .section h2 { font-size: 14px; padding: 10px 12px; border-radius: 14px; }
    .viplata-page .step-num { width: 26px; height: 26px; font-size: 12px; }
    .viplata-page .faq-q { font-size: 11px; }
    .viplata-page .amount-table th, .viplata-page .amount-table td { padding: 6px 8px; font-size: 11px; }
    .viplata-page .big-amount { font-size: 14px; }
    .viplata-page .card { padding: 12px; }
    .viplata-page .situation-header { font-size: 11px; }
    .viplata-page .situation-body { font-size: 12px; }
    .viplata-page .category-list li { font-size: 11px; }
    .viplata-page .conclusion h2 { font-size: 14px; padding: 10px 12px; }
    .viplata-page .checklist { font-size: 12px; }
  }
`;

const faqData = [
    {
        q: 'Скільки грошей дають за загиблого військового?',
        a: 'Залежно від обставин смерті родичам виплачують або 15 000 000 грн, або 2 271 000 грн (750 прожиткових мінімумів у 2024–2025 рр.), або 1 514 000 грн (500 прожиткових мінімумів у 2024–2025 рр.).',
    },
    {
        q: 'Яка допомога передбачена при смерті військовослужбовця?',
        a: 'Родичі можуть отримати: витрати на поховання, нараховане грошове забезпечення (зарплату), компенсацію за невикористані відпустки та єдину грошову допомогу у розмірі від 1 514 000 до 15 000 000 грн.',
    },
    {
        q: 'Хто має право на виплату 15 мільйонів?',
        a: "Діти (незалежно від віку, у т.ч. повнолітні), дружина, батьки, усиновлювачі, онуки (якщо батьки онуків померли), жінка, з якою військовий проживав однією сім'єю без реєстрації шлюбу, та утриманці.",
    },
    {
        q: 'Що отримує дружина загиблого військового?',
        a: 'Дружина отримує грошове забезпечення військового, компенсацію за невикористані дні відпустки, витрати на поховання та єдину грошову допомогу від 1 514 000 до 15 000 000 грн.',
    },
    {
        q: 'Як розподіляються 15 мільйонів?',
        a: 'Сума ділиться порівну між усіма отримувачами, крім випадку оформлення особистого розпорядження. Виплата поетапна: 1/5 — у першу чергу, решта — рівними частинами протягом 40 місяців.',
    },
    {
        q: 'Скільки чекати на єдину грошову допомогу?',
        a: 'Мінімум 6 місяців з моменту подання заяви. На практиці — 4–6 місяців для виплат 500 та 750 прожиткових мінімумів.',
    },
    {
        q: 'Скільки 750 прожиткових мінімумів у 2025 році?',
        a: '750 прожиткових мінімумів у 2024–2025 роках становить 2 271 000 грн. 500 прожиткових мінімумів — 1 514 000 грн.',
    },
    {
        q: 'Чи мають повнолітні діти право на ЄГД?',
        a: 'Так. З 29.03.2024 повнолітні діти мають безумовне право на ЄГД незалежно від дати смерті батька. Доводити факт утримання не потрібно. Відмова з таких підстав є незаконною.',
    },
];

function FaqItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="faq-item">
            <button className="faq-q" onClick={() => setOpen(!open)}>
                {q}
                <span className={`faq-arrow${open ? ' open' : ''}`}>▼</span>
            </button>
            {open && <div className="faq-a">{a}</div>}
        </div>
    );
}

export default function Money() {
    return (
        <div className="viplata-page">
            <style>{styles}</style>

            {/* NAV */}
            <nav className="toc">
                <div className="toc-inner">
                    <a href="#s1">Які виплати</a>
                    <a href="#s2">Розміри</a>
                    <a href="#s3">Хто має право</a>
                    <a href="#s4">Куди звертатись</a>
                    <a href="#s5">Документи</a>
                    <a href="#s6">Строки</a>
                    <a href="#s7">Відмова</a>
                    <a href="#s8">Юридична допомога</a>
                    <a href="#s9">Часті питання</a>
                    <a href="#s10">Висновки</a>
                </div>
            </nav>

            <div className="container">
                {/* SECTION 1 */}
                <section className="section" id="s1">
                    <div className="section-header">
                        <h2>
                            Які виплати передбачені родичам загиблого
                            військового?
                        </h2>
                    </div>
                    <p>
                        Виплати родичам загиблого військовослужбовця поділяються
                        на дві групи:
                    </p>
                    <div className="card-grid">
                        <div className="card">
                            <h3>Перша група — виплати самого військового</h3>
                            <p>
                                Кошти, що належали військовому, але не були ним
                                отримані за життя. Розмір залежить від посади,
                                звання, вислуги та використання відпусток.
                            </p>
                            <ul
                                style={{
                                    marginTop: 12,
                                    fontSize: 14,
                                    color: 'var(--gray)',
                                }}
                            >
                                <li>Грошове забезпечення (зарплата)</li>
                                <li>Одноразові додаткові виплати</li>
                                <li>Компенсація за невикористані відпустки</li>
                            </ul>
                        </div>
                        <div className="card">
                            <h3>Друга група — компенсаційні виплати</h3>
                            <p>
                                Призначаються родичам загиблого та називаються{' '}
                                <strong>Єдиною грошовою допомогою (ЄГД)</strong>
                                . До призначення та виплати залучені Міноборони,
                                МВС, Адміністрація ДПСУ.
                            </p>
                        </div>
                    </div>
                    <div className="alert">
                        <strong>Важливо</strong>
                        Кошти на банківському рахунку загиблого, що були
                        нараховані і виплачені ще за його життя, підлягають
                        розподілу у порядку спадкування.
                    </div>
                </section>

                <hr className="divider" />

                {/* SECTION 2 */}
                <section className="section" id="s2">
                    <div className="section-header">
                        <h2>Розміри виплат за загибель (смерть) військового</h2>
                    </div>
                    <p>
                        Єдина грошова допомога у разі загибелі передбачена у
                        таких розмірах:
                    </p>
                    <table className="amount-table">
                        <thead>
                            <tr>
                                <th>Розмір виплати</th>
                                <th>Умова призначення</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="big-amount">
                                        15 000 000 грн
                                    </div>
                                    <div className="year-row">
                                        Не може бути меншою за цей розмір
                                    </div>
                                </td>
                                <td>
                                    Загибель або смерть, пов'язана із захистом
                                    Батьківщини в умовах воєнного стану; смерть
                                    протягом 1 року після звільнення, якщо
                                    причиною є травма/поранення/хвороба,
                                    пов'язані із захистом Батьківщини
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="big-amount">
                                        750 прожиткових мінімумів
                                    </div>
                                    <div
                                        className="year-row"
                                        style={{ color: 'var(--blue)' }}
                                    >
                                        2022 — 1&nbsp;860&nbsp;750 грн
                                    </div>
                                    <div
                                        className="year-row"
                                        style={{ color: 'var(--blue)' }}
                                    >
                                        2023 — 2&nbsp;013&nbsp;000 грн
                                    </div>
                                    <div
                                        className="year-row"
                                        style={{ color: 'var(--blue)' }}
                                    >
                                        2024–2025 — 2&nbsp;271&nbsp;000 грн
                                    </div>
                                </td>
                                <td>
                                    Смерть при виконанні обов'язків військової
                                    служби; смерть внаслідок хвороби, пов'язаної
                                    з виконанням обов'язків; смерть протягом 1
                                    року після звільнення через травму/хворобу,
                                    пов'язані з виконанням обов'язків
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="big-amount">
                                        500 прожиткових мінімумів
                                    </div>
                                    <div
                                        className="year-row"
                                        style={{ color: 'var(--blue)' }}
                                    >
                                        2022 — 1&nbsp;240&nbsp;500 грн
                                    </div>
                                    <div
                                        className="year-row"
                                        style={{ color: 'var(--blue)' }}
                                    >
                                        2023 — 1&nbsp;342&nbsp;000 грн
                                    </div>
                                    <div
                                        className="year-row"
                                        style={{ color: 'var(--blue)' }}
                                    >
                                        2024–2025 — 1&nbsp;514&nbsp;000 грн
                                    </div>
                                </td>
                                <td>
                                    Смерть під час проходження служби (не
                                    пов'язана з бойовими діями); смерть
                                    внаслідок хвороби, що виникла у зв'язку з
                                    проходженням служби; смерть протягом 1 року
                                    після звільнення через травму/хворобу,
                                    отримані при проходженні служби
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="alert">
                        <strong>Порядок виплати 15 мільйонів</strong>
                        Виплата 15 млн грн здійснюється поетапно: спочатку 1/5
                        від загальної суми, решта — рівними частинами протягом
                        наступних 40 місяців.
                    </div>
                    <div className="payment-flow">
                        <div className="pf-item">
                            <div className="pf-num">⅕</div>
                            <div className="pf-label">
                                Перша виплата
                                <br />
                                (3&nbsp;000&nbsp;000 грн)
                            </div>
                        </div>
                        <div className="pf-item">
                            <div className="pf-num">40</div>
                            <div className="pf-label">
                                Місяців рівних
                                <br />
                                платежів
                            </div>
                        </div>
                        <div className="pf-item">
                            <div className="pf-num">41</div>
                            <div className="pf-label">
                                Загальний строк
                                <br />
                                усіх виплат
                            </div>
                        </div>
                    </div>
                </section>

                <hr className="divider" />

                {/* SECTION 3 */}
                <section className="section" id="s3">
                    <div className="section-header">
                        <h2>Хто має право на виплату?</h2>
                    </div>
                    <p>
                        За чинним законодавством право на ЄГД мають такі особи:
                    </p>
                    <ul className="category-list">
                        <li>
                            <span className="cat-num">1</span>
                            <div>
                                <strong>Діти військового</strong> — як
                                неповнолітні, так і <em>повнолітні</em>{' '}
                                (незалежно від того, чи перебували на утриманні,
                                чи були дієздатними, чи проживали разом).
                                Включає усиновлених дітей, дітей, зачатих за
                                життя та народжених після смерті. Позбавлення
                                батьківських прав не скасовує право дитини на
                                ЄГД.
                            </div>
                        </li>
                        <li>
                            <span className="cat-num">2</span>
                            <div>
                                <strong>Дружина (чоловік) військового</strong> —
                                особа, що перебувала в зареєстрованому шлюбі.
                                Також має право особа, що не перебувала в
                                зареєстрованому шлюбі, але проживала з
                                військовим однією сім'єю (факт «громадянського
                                шлюбу» доводиться в судовому порядку).
                            </div>
                        </li>
                        <li>
                            <span className="cat-num">3</span>
                            <div>
                                <strong>Батьки та усиновлювачі</strong> — мати і
                                батько військового, а також особи, що усиновили
                                його. Виняток — якщо їх позбавлено батьківських
                                прав.
                            </div>
                        </li>
                        <li>
                            <span className="cat-num">4</span>
                            <div>
                                <strong>Онуки військового</strong> — за умови,
                                що на момент смерті військового батьки онуків
                                померли. Вік онуків значення не має.
                            </div>
                        </li>
                        <li>
                            <span className="cat-num">5</span>
                            <div>
                                <strong>Утриманці військового</strong> — особи,
                                що перебували на повному утриманні загиблого.
                            </div>
                        </li>
                    </ul>
                    <div className="alert">
                        <strong>Особисте розпорядження</strong>
                        Якщо військовий оформив нотаріальне особисте
                        розпорядження — ЄГД виплачується тим особам, яких він
                        обрав сам. Проте існують пільгові категорії, які мають
                        право на виплату незалежно від змісту розпорядження:
                        неповнолітні діти, діти з інвалідністю,
                        батьки-пенсіонери або з інвалідністю, дружина-пенсіонер
                        або з інвалідністю.
                    </div>
                    <div className="alert">
                        <strong>Незаконні вимоги ТЦК</strong>
                        Вимоги ТЦК та СП до повнолітніх дітей щодо доведення
                        факту перебування на утриманні військового для отримання
                        ЄГД є <strong>незаконними</strong> і не ґрунтуються на
                        законі.
                    </div>
                    <p>
                        Виплата за загибель ділиться порівну між усіма
                        отримувачами, крім випадку нотаріально оформленої
                        відмови особи, яка має на неї право.
                    </p>
                </section>

                <hr className="divider" />

                {/* SECTION 4 */}
                <section className="section" id="s4">
                    <div className="section-header">
                        <h2>Куди звертатись? Порядок подання заяви</h2>
                    </div>
                    <p>
                        Якщо військовослужбовець проходив службу у Збройних
                        Силах України — заява на ЄГД подається до будь-якого{' '}
                        <strong>
                            територіального центру комплектування та соціальної
                            підтримки (ТЦК та СП)
                        </strong>
                        . Строк звернення — <strong>3 роки</strong> з моменту
                        смерті.
                    </p>
                    <div className="alert">
                        <strong>Служба в інших формуваннях</strong>
                        Для Нацгвардії, СБУ, ДПСУ — заяву подають безпосередньо
                        у воїнську частину або формування, де проходив службу
                        військовий. Строки розгляду відрізняються (Нацгвардія —
                        3 місяці; ДПСУ — 15 днів на висновок і 1 місяць на
                        рішення).
                    </div>
                    <div className="steps">
                        {[
                            {
                                n: 1,
                                title: 'Подання заяви',
                                text: "ТЦК та СП приймає заяву з додатками. Відповідальний службовець засвідчує правильність копій підписом. При поштовому відправленні — копії обов'язково нотаріально засвідчені.",
                            },
                            {
                                n: 2,
                                title: 'Перевірка документів',
                                text: 'ТЦК та СП перевіряє комплектність документів. За необхідності — направляє запити у воїнську частину або ВЛК.',
                            },
                            {
                                n: 3,
                                title: 'Передача до обласного ТЦК та СП',
                                text: 'Законодавчо — 7 робочих днів. На практиці може затягнутись до місяця.',
                            },
                            {
                                n: 4,
                                title: 'Передача документів до Міністерства оборони',
                                text: 'Обласний ТЦК складає висновок про наявність або відсутність підстав для призначення ЄГД і направляє його разом із заявою до МОУ.',
                            },
                            {
                                n: 5,
                                title: 'Розгляд профільною комісією МОУ',
                                text: 'Відповідальні особи МОУ обробляють пакет і передають на розгляд Департаменту соціального забезпечення.',
                            },
                            {
                                n: 6,
                                title: 'Прийняття рішення та повідомлення заявника',
                                text: 'Департамент проводить колегіальні засідання і приймає рішення: призначити виплату, відмовити або повернути на доопрацювання. Оформляється витяг із протоколу.',
                            },
                            {
                                n: 7,
                                title: 'Виплата коштів',
                                text: 'Здійснюється протягом 5 днів з моменту надходження коштів до обласного ТЦК та СП.',
                            },
                        ].map(({ n, title, text }) => (
                            <div className="step" key={n}>
                                <div className="step-num">{n}</div>
                                <div className="step-body">
                                    <h4>{title}</h4>
                                    <p>{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <hr className="divider" />

                {/* SECTION 5 */}
                <section className="section" id="s5">
                    <div className="section-header">
                        <h2>Необхідні документи для оформлення виплати</h2>
                    </div>
                    <ul className="doc-list">
                        <li>
                            <span>
                                <strong>
                                    Документи, що посвідчують особу заявника
                                </strong>{' '}
                                — паспорт, ідентифікаційний номер, відомості про
                                зареєстроване місце проживання.
                            </span>
                        </li>
                        <li>
                            <span>
                                <strong>
                                    Документи, що підтверджують родинний зв'язок
                                    із загиблим
                                </strong>{' '}
                                — свідоцтво про шлюб, свідоцтва про народження,
                                витяги з РАЦС, рішення суду тощо.
                            </span>
                        </li>
                        <li>
                            <span>
                                <strong>
                                    Документи, що підтверджують дату та
                                    обставини смерті
                                </strong>{' '}
                                — свідоцтво про смерть (РАЦС), лікарське
                                свідоцтво про смерть, витяг з наказу про
                                виключення зі списків особового складу,
                                матеріали службового розслідування, висновок
                                судмедексперта, повідомлення родині.
                            </span>
                        </li>
                        <li>
                            <span>
                                <strong>
                                    Документи про наявність/відсутність інших
                                    родичів
                                </strong>{' '}
                                — свідоцтва про смерть, розірвання шлюбу, витяги
                                з РАЦС тощо.
                            </span>
                        </li>
                        <li>
                            <span>
                                <strong>
                                    Довідка про банківські реквізити заявника.
                                </strong>
                            </span>
                        </li>
                        <li>
                            <span>
                                <strong>
                                    Згода на обробку персональних даних.
                                </strong>
                            </span>
                        </li>
                        <li>
                            <span>
                                <strong>
                                    Довідка про несудимість заявника.
                                </strong>
                            </span>
                        </li>
                    </ul>
                    <div className="alert">
                        <strong>Порада</strong>
                        Уважно перевіряйте наявність усіх документів до подачі.
                        Неповний пакет значно збільшує терміни отримання
                        виплати. При особистому поданні копії засвідчуються
                        підписом посадовця ТЦК — при поштовому обов'язково
                        нотаріально.
                    </div>
                </section>

                <hr className="divider" />

                {/* SECTION 6 */}
                <section className="section" id="s6">
                    <div className="section-header">
                        <h2>Строки отримання виплат і можливі затримки</h2>
                    </div>
                    <p>
                        Виплати у розмірі 500 та 750 прожиткових мінімумів
                        здійснюються <strong>одноразово</strong> всією сумою без
                        поділу на частини.
                    </p>
                    <div className="card-grid" style={{ margin: '20px 0' }}>
                        <div
                            className="card"
                            style={{ borderColor: '#000000', borderWidth: 2 }}
                        >
                            <h3>Практичний строк</h3>
                            <p>
                                З моменту подання заяви до отримання виплати —
                                як правило, <strong>від 4 до 6 місяців</strong>.
                            </p>
                        </div>
                        <div
                            className="card"
                            style={{ borderColor: '#000000', borderWidth: 2 }}
                        >
                            <h3>Виплата 15 млн грн</h3>
                            <p>
                                Поетапно: 1/5 суми — у перший місяць, решта —
                                рівними частинами протягом 40 місяців (41 місяць
                                загалом).
                            </p>
                        </div>
                    </div>
                    <div className="alert">
                        <strong>Затримки</strong>
                        На практиці передача документів між інстанціями нерідко
                        затягується. Рекомендується відстежувати рух заяви і у
                        разі понаднормових затримок звертатись за юридичною
                        допомогою.
                    </div>
                </section>

                <hr className="divider" />

                {/* SECTION 7 */}
                <section className="section" id="s7">
                    <div className="section-header">
                        <h2>Як діяти у разі відмови у виплаті?</h2>
                    </div>
                    <p>
                        У разі отримання відмови необхідно проаналізувати її
                        суть і аргументи. Якщо рішення є незаконним — право на
                        ЄГД можна захистити в судовому порядку. Нижче —
                        найпоширеніші підстави для відмови:
                    </p>

                    {[
                        {
                            n: 1,
                            title: 'Відмова через наявність алкоголю в крові або сечі військового',
                            body: "Після смерті обов'язково проводиться токсикологічна експертиза. Якщо виявлений алкоголь — нерідко відмовляють у виплаті.",
                            verdicts: [
                                {
                                    type: 'legal',
                                    text: "❌ Така відмова є НЕЗАКОННОЮ, якщо попри стан сп'яніння смерть настала з причин, не пов'язаних із вживанням алкоголю (мінно-вибухова травма, поранення, інсульт, інфаркт тощо). Захист — судовий порядок.",
                                },
                                {
                                    type: 'fight',
                                    text: "✅ Відмова є законною лише якщо смерть є прямим наслідком дій у стані сп'яніння.",
                                },
                            ],
                        },
                        {
                            n: 2,
                            title: 'Відмова у 15 млн, якщо військовий помер у лікарні або від хвороби (не від травми)',
                            body: 'Якщо військовий помер не від прямого ураження ворогом, а від хвороби (серцева недостатність, інсульт, інфаркт, пневмонія) — родичам незаконно обмежують виплату і призначають лише 750 прожиткових мінімумів.',
                            verdicts: [
                                {
                                    type: 'legal',
                                    text: "⚠️ Якщо у довідці ВЛК вказано «Так, пов'язано із захистом Батьківщини» або «пов'язано з виконанням обов'язків» — родичі мають право на 15 млн грн. Збільшення розміру виплати відстоюється в суді.",
                                },
                            ],
                        },
                        {
                            n: 3,
                            title: 'Відмова якщо військовий помер вдома або в лікарні після звільнення зі служби',
                            body: 'Якщо з моменту звільнення до смерті минуло більше 1 року — у виплаті відмовлять. Але таку відмову можна оскаржити, якщо смерть спричинена проходженням служби або участю в бойових діях.',
                            verdicts: [
                                {
                                    type: 'fight',
                                    text: '✅ Якщо не минув 1 рік з моменту звільнення — виплата відбувається у безспірному порядку. Суперечки можуть стосуватись лише розміру (15 млн або менше).',
                                },
                            ],
                        },
                        {
                            n: 4,
                            title: 'Відмова повнолітнім дітям загиблого військового',
                            body: 'Повнолітні діти включені до переліку отримувачів ЄГД лише з 29.03.2024, але ця норма має ретроспективну дію — тобто застосовується незалежно від дати смерті батька.',
                            verdicts: [
                                {
                                    type: 'legal',
                                    text: '❌ Не потрібно доводити факт перебування на утриманні. Будь-яка відмова є незаконною і підлягає оскарженню в суді.',
                                },
                            ],
                        },
                    ].map(({ n, title, body, verdicts }) => (
                        <div className="situation" key={n}>
                            <div className="situation-header">
                                <span className="sit-num">Ситуація {n}</span>
                                {title}
                            </div>
                            <div className="situation-body">
                                {body}
                                {verdicts.map((v, i) => (
                                    <div
                                        key={i}
                                        className={`situation-verdict verdict-${v.type}`}
                                        style={i > 0 ? { marginTop: 8 } : {}}
                                    >
                                        {v.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>

                <hr className="divider" />

                {/* SECTION 8 */}
                <section className="section" id="s8">
                    <div className="section-header">
                        <h2>Юридична допомога при проблемах з виплатою</h2>
                    </div>
                    <p>Юридичний супровід отримання виплат може включати:</p>
                    <ul className="category-list">
                        {[
                            'Консультування щодо наявності права на ЄГД та її розміру',
                            'Збір повного пакету документів, у т.ч. шляхом адвокатських запитів, рекомендації щодо засвідчення',
                            'Підготовка та подача заяви у ТЦК та СП',
                            'Контроль передачі заяви до вищих органів',
                            'Комунікація з представниками МОУ',
                            'Судове оскарження відмови у виплаті ЄГД',
                            'Судове оскарження зниженого розміру ЄГД (наприклад, замість 15 млн грн призначили 750 прожиткових мінімумів)',
                        ].map((item, i) => (
                            <li key={i}>
                                <div>{item}</div>
                            </li>
                        ))}
                    </ul>
                    <div className="alert">
                        <strong>Реальний кейс</strong>
                        Повнолітній син загиблого військового отримав 7,5 млн
                        гривень ЄГД за допомогою юристів. Дружина військового,
                        який помер від інсульту, в суді відстояла доплату до 15
                        млн грн (справа № 500/6892/24).
                    </div>
                </section>

                <hr className="divider" />

                {/* SECTION 9 */}
                <section className="section" id="s9">
                    <div className="section-header">
                        <h2>Часті запитання</h2>
                    </div>
                    {faqData.map((item, i) => (
                        <FaqItem key={i} q={item.q} a={item.a} />
                    ))}
                </section>

                <hr className="divider" />

                {/* SECTION 10 */}
                <section className="section" id="s10">
                    <div className="conclusion">
                        <h2>Висновки: що робити, щоб отримати ЄГД?</h2>
                        <p>
                            Виплата за загибель військового — це право родичів
                            на майнову компенсацію за втрату близької людини.
                            Попри бюрократичні складнощі, ці виплати реально
                            отримати.
                        </p>
                        <ul className="checklist">
                            <li>
                                Визначте, до якої категорії отримувачів ви
                                належите
                            </li>
                            <li>Зберіть повний пакет необхідних документів</li>
                            <li>Подайте заяву в ТЦК та СП (строк — 3 роки)</li>
                            <li>Відстежуйте рух документів між інстанціями</li>
                            <li>
                                У разі відмови — не зволікайте, оскаржте рішення
                                в суді
                            </li>
                            <li>
                                За потреби зверніться до юристів для захисту
                                своїх прав
                            </li>
                        </ul>
                        <p
                            style={{
                                fontSize: 14,
                                color: 'rgba(255,255,255,0.55)',
                                marginTop: 16,
                            }}
                        >
                            Ваша обізнаність у правах на соціальні гарантії від
                            держави — запорука належного відшкодування за
                            моральну втрату.
                        </p>
                    </div>
                </section>
            </div>

            <footer>
                <p>
                    Інформаційна сторінка про виплати родинам загиблих
                    військовослужбовців. Матеріал носить інформаційний характер
                    і не є юридичною консультацією.
                </p>
            </footer>
        </div>
    );
}
