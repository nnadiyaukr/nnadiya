import classes from './logo.module.scss';
import img from '@img/gerb.png';

export const Logo = () => {
    return (
        <a href="/" className={classes.logo}>
            <div className={classes.text}>
                <span className={classes.primary}>На</span>
                <span className={classes.secondary}>дiя</span>
            </div>
            <div className={classes.gerb}>
                <img src={img} alt="gerb" />
            </div>
        </a>
    );
};
