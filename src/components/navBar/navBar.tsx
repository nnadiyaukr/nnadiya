//@ts-nocheck
import classes from './navBar.module.scss';
import { Link } from 'react-router';
import { navConfig } from '@config/nav.config';
import { AuthActions } from '@/components/authActions';
import useMatchMedia from '@/core/hooks/useMatchMedia';

export const NavBar = ({ onSearch }) => {
    const { isDesktop } = useMatchMedia();
    return (
        <div className={classes.navBar}>
            <div className="_container-default">
                <div className={classes.row}>
                    <nav className={classes.nav}>
                        {navConfig.map(({ id, label, link }) => (
                            <Link
                                onClick={(e) => onSearch(e, link)}
                                id={id}
                                to={link}
                                className={classes.link}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                    {isDesktop && <AuthActions />}
                </div>
            </div>
        </div>
    );
};
