import classes from './header.module.scss';
import { Logo } from '@/components/logo';
import { AuthActions } from '@/components/authActions';
import useMatchMedia from '@/core/hooks/useMatchMedia';

export const Header = () => {
    const { isDesktop } = useMatchMedia();
    return (
        <div className="_container-default">
            <div className={classes.header}>
                <Logo />
                {!isDesktop && <AuthActions />}
            </div>
        </div>
    );
};
