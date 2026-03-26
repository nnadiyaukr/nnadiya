import classes from './download.module.scss';

import googlePlayIcon from '@icons/googleplay.png';
import downloadIcon from '@icons/download.png';

export const Download = () => {
    return (
        <div className={classes.download}>
            <div className="_container-default">
                <div className={classes.row}>
                    <div className={classes.title}>Завантажити додаток</div>
                    <div className={classes.subtitle}>
                        Отримайте доступ до всіх функцій прямо з телефону.
                        Завантажте додаток зручним для вас способом.
                    </div>

                    <div className={classes.items}>
                        <div className={classes.item}>
                            <div className={classes.text}>Завантажити з</div>
                            <div className={classes.body}>
                                <div className={classes.img}>
                                    <img
                                        src={googlePlayIcon}
                                        alt="Завантажити з Google Play"
                                    />
                                </div>
                                <div className={classes.itemTitle}>
                                    Google Play
                                </div>
                            </div>
                            <div className={classes.badge}>Скоро!</div>
                        </div>
                        <div className={classes.item}>
                            <div className={classes.text}>Завантажити з</div>
                            <div className={classes.body}>
                                <div className={classes.img}>
                                    <img
                                        src={downloadIcon}
                                        alt="Завантажити з нашого сайту"
                                    />
                                </div>
                                <div className={classes.itemTitle}>
                                    Нашого сайту
                                </div>
                            </div>
                            <div className={classes.badge}>APK - Android</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
