import classes from './principles.module.scss';
import img01 from '@icons/principles/01.png';
import img02 from '@icons/principles/02.png';
import img03 from '@icons/principles/03.png';
import img04 from '@icons/principles/04.png';

export const Principles = () => {
    return (
        <div className={classes.principles}>
            <div className="_container-default">
                <div className={classes.title}>Наші принципи</div>
                <div className={classes.row}>
                    <div className={classes.column}>
                        <div className={classes.item}>
                            <div className={classes.subtitle}>
                                Безоплатність
                            </div>
                            <div className={classes.img}>
                                <img src={img01} alt="img01" />
                            </div>
                            <div className={classes.description}>
                                Вся наша допомога є абсолютно безкоштовною.
                            </div>
                        </div>
                    </div>
                    <div className={classes.column}>
                        <div className={classes.item}>
                            <div className={classes.subtitle}>
                                Конфіденційність
                            </div>
                            <div className={classes.img}>
                                <img src={img02} alt="img02" />
                            </div>
                            <div className={classes.description}>
                                Усі особисті дані обробляються з максимальною
                                дбайливістю.
                            </div>
                        </div>
                    </div>

                    <div className={classes.column}>
                        <div className={classes.item}>
                            <div className={classes.subtitle}>Повага</div>
                            <div className={classes.img}>
                                <img src={img03} alt="img03" />
                            </div>
                            <div className={classes.description}>
                                Ми ставимося до кожної історії з граничним
                                тактом та повагою.
                            </div>
                        </div>
                    </div>
                    <div className={classes.column}>
                        <div className={classes.item}>
                            <div className={classes.subtitle}>Прозорість</div>
                            <div className={classes.img}>
                                <img src={img04} alt="img04" />
                            </div>
                            <div className={classes.description}>
                                Ми відкрито розповідаємо про принципи нашої
                                роботи.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
