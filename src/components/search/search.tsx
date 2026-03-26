import classes from './search.module.scss';
import { AppInput } from '@/components/share/appInput';
import { useEffect, useRef, useState } from 'react';
import { useClickAway, useDebounce } from 'react-use';
import { fetchAllByName } from '@/api/peoples';
import { SearchResult } from '@/components/searchResult';
import closeIcon from '@icons/cross.png';

export const Search = ({ handleShowSearch }) => {
    const [searchRequest, setSearchRequest] = useState({
        search: '',
    });
    const [searchResult, setSearchResult] = useState(null);
    const ref = useRef(null);
    // useClickAway(ref, () => {
    //     handleShowSearch(false);
    // });
    const handleSubmit = async () => {
        const res = await fetchAllByName(searchRequest.search);
        console.log('res', res);
        // if (!res.length) {
        //     setSearchResult(null);
        // }
        setSearchResult(res.length);
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
        console.log('searchResult', searchResult);
        console.log('searchRequest', searchRequest);
    }, [searchRequest]);

    const [, cancel] = useDebounce(
        () => {
            console.log('Отправляем запрос!');
            if (searchRequest.search === '') {
                setSearchResult(null);
            }
            if (searchRequest.search) {
                handleSubmit();
            }
        },
        700,
        [searchRequest]
    );

    return (
        <div className={classes.search}>
            <div className="_container-default">
                <div
                    className={classes.close}
                    onClick={() => handleShowSearch(false)}
                >
                    {<img src={closeIcon} alt="close" />}
                </div>
                <div className={classes.body} ref={ref}>
                    <AppInput
                        value={searchRequest.search}
                        placeholder="Введіть ПІБ людини, яку шукайте"
                        name="search"
                        onChange={handleChange}
                    />
                    <SearchResult data={searchResult} />
                </div>
            </div>
        </div>
    );
};
