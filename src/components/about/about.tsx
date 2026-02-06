import classes from './about.module.scss';
import img from '@img/about/01.jpg';

export const About = () => {
    return (
        <div id="about" className={classes.about}>
            <div className="_container-default">
                <div className={classes.row}>
                    <div className={classes.column}>
                        <div className={classes.img}>
                            <img src={img} alt="team" />
                        </div>
                    </div>
                    <div className={classes.column}>
                        <div className={classes.text}>
                            <div className={classes.title}>МИ</div>
                            <div className={classes.description}>
                                об'єднання добровольців із різних сфер:
                                IT-фахівці, юристи, журналісти, психологи та
                                просто небайдужі люди. Об'єднавши свої
                                професійні зв'язки, навички та особисті
                                контакти, ми створили систему взаємодопомоги.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
