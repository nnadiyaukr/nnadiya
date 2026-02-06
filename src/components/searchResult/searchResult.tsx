import classes from './searchResult.module.scss';

export const SearchResult = ({ data }) => {
    return (
        <div className={classes.result}>
            <div className="_container-default">
                <div className={classes.row}>
                    {data.map(({ id, name }) => (
                        <div className={classes.item} key={id}>
                            {name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
