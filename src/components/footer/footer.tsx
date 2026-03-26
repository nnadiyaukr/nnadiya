import classes from './footer.module.scss';

export function Footer() {
    return (
        <footer className={classes.footer}>
            <div className={classes.inner}>
                {/* TOP GRID */}
                <div className={classes.top}>
                    {/* Brand */}
                    <div>
                        <div className={classes.brandLogo}>Надія</div>

                        <p className={classes.brandDesc}>
                            Соцiальна та юридична допомога громаданам України
                        </p>

                        <div className={classes.badge}>
                            <span className={classes.badgeDot} />
                            Працюємо по всій Україні
                        </div>
                    </div>

                    {/* Nav */}
                    <FooterCol
                        title="Навігація"
                        links={[
                            { label: 'Головна', href: '/' },
                            { label: 'Про нас', href: '/about' },
                            { label: 'Напрямки', href: '/directions' },
                            { label: 'Принципи', href: '/principles' },
                            { label: 'Контакти', href: '/contacts' },
                        ]}
                    />

                    {/* Services */}
                    <FooterCol
                        title="Послуги"
                        links={[
                            { label: 'Виплати за загибель', href: '/' },
                            { label: 'Виплати за поранення', href: '/' },
                            { label: 'Судові справи', href: '/' },
                            { label: 'Консультація', href: '/' },
                            { label: 'Документи', href: '/' },
                        ]}
                    />

                    {/* Contacts */}
                    <FooterCol
                        title="Контакти"
                        links={[
                            {
                                label: 'n.nadiya.ukr@gmail.com',
                                href: 'mailto:n.nadiya.ukr@gmail.com',
                            },
                        ]}
                    />
                </div>

                {/* BOTTOM */}
                <div className={classes.bottom}>
                    <span className={classes.copy}>
                        © {new Date().getFullYear()} Надія. Всі права захищені.
                    </span>
                </div>
            </div>
        </footer>
    );
}

type FooterLink = {
    label: string;
    href: string;
    style?: React.CSSProperties;
};

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
    return (
        <div>
            <div className={classes.colTitle}>{title}</div>
            {links.map(({ label, href, style }) => (
                <a
                    key={label}
                    href={href}
                    className={classes.colLink}
                    style={style}
                >
                    {label}
                </a>
            ))}
        </div>
    );
}
