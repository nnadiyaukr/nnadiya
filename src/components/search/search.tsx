import classes from './search.module.scss';
import { AppInput } from '@/components/share/appInput';
import { useEffect, useRef, useState } from 'react';
import { useClickAway, useDebounce } from 'react-use';
import { fetchAllByName } from '@/api/peoples';
import { SearchResult } from '@/components/searchResult';

export const Search = ({ handleShowSearch }) => {
    const [searchRequest, setSearchRequest] = useState({
        search: '',
    });
    const [searchResult, setSearchResult] = useState(null);
    const ref = useRef(null);
    useClickAway(ref, () => {
        handleShowSearch(false);
    });
    const handleSubmit = async () => {
        const res = await fetchAllByName(searchRequest.search);
        if (!res.length) {
            setSearchResult(null);
        }
        setSearchResult(res);
        console.log('res', res);
    };
    const handleChange = (name, value) => {
        setSearchRequest((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };
    useEffect(() => {
        console.log('serachResult', searchResult);
    }, [searchResult]);

    const [, cancel] = useDebounce(
        () => {
            console.log('Отправляем запрос!');
            handleSubmit();
        },
        0,
        [searchRequest]
    );

    return (
        <div className={classes.search}>
            <div className="_container-default">
                <div
                    className={classes.close}
                    onClick={() => handleShowSearch(false)}
                >
                    X
                </div>
                <div className={classes.body} ref={ref}>
                    <AppInput
                        value={searchRequest.search}
                        placeholder="Введите ФИО человека, которого ищите"
                        name="search"
                        onChange={handleChange}
                    />
                    {searchResult && <SearchResult data={searchResult} />}
                </div>
            </div>
        </div>
    );
};
