import classes from './directions.module.scss';

import { directionsConfig } from '@config/directions.config';
import { Link } from 'react-router';

export const Directions = () => {
    const { title, items } = directionsConfig;
    return (
        <div className={classes.directions}>
            <div className="_container-default">
                <div className={classes.title}>
                    Ми працюємо у двох напрямках
                </div>
                <div className={classes.row}>
                    {items.map(
                        ({
                            id,
                            img,
                            imgAlt,
                            subtitle,
                            description,
                            link,
                            linkLabel,
                        }) => (
                            <div key={id} className={classes.column}>
                                <div className={classes.item}>
                                    <div className={classes.img}>
                                        <img src={img} alt={imgAlt} />
                                    </div>
                                    <div className={classes.subtitle}>
                                        {subtitle}
                                    </div>
                                    <div className={classes.body}>
                                        <div className={classes.description}>
                                            {description}
                                        </div>
                                        <Link
                                            to={link}
                                            className={classes.link}
                                        >
                                            {linkLabel}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};
