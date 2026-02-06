import loading from "@icons/loading.gif";
import classes from "./loading.module.scss";

export const Loading = () => {
        return (
            <div className={classes.loading}>
                <img src={loading} alt="loading" />
            </div>
        )
}
