//@ts-nocheck
import classes from './searchResult.module.scss';
import useUiActionsStore from '@/core/store/uiActions.store';

export const SearchResult = ({ data }) => {
    const { setShowModal } = useUiActionsStore();
    console.log('data', data);
    if (data === null) return;
    return (
        <div className={classes.result}>
            <div className="_container-default">
                <div className={classes.row}>
                    {data === 0
                        ? 'Людей не знайдено'
                        : `Знайдено людей: ${data}`}
                    {data !== 0 && (
                        <>
                            <div className={classes.loginMessage}>
                                Результати пошуку доступні лише авторизованим
                                користувачам
                            </div>
                            <div className={classes.actions}>
                                <div
                                    className={classes.login}
                                    onClick={() => setShowModal('login')}
                                >
                                    Увійти
                                </div>
                                <div
                                    className={classes.registration}
                                    onClick={() => setShowModal('signUp')}
                                >
                                    Реєстрація
                                </div>
                            </div>
                        </>
                    )}

                    {/*{data.map(({ id, name }) => (*/}
                    {/*    <div className={classes.item} key={id}>*/}
                    {/*        {name}*/}
                    {/*    </div>*/}
                    {/*))}*/}
                </div>
            </div>
        </div>
    );
};
