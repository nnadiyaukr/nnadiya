import classes from './problemsReviews.module.scss';
import reviewsConfig from '@config/reviews.config';
import locationIcon from '@icons/location.png';

export const ProblemsReviews = () => {
    return (
        <div className={classes.problemsReviews}>
            <div className={classes.title}>
                Наші волонтери допомогли більш ніж 100 людям у біді
            </div>
            <div className="_container-default">
                <div className={classes.row}>
                    {reviewsConfig.map(({ id, author, text, location }) => (
                        <div key={id} className={classes.column}>
                            <div className={classes.item}>
                                <div className={classes.text}>{text}</div>
                                <div className={classes.author}>-{author}</div>
                                <div className={classes.location}>
                                    <img
                                        src={locationIcon}
                                        alt="locationIcon"
                                    />
                                    {location}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
