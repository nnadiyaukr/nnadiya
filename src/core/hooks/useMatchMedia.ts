import { useLayoutEffect, useState } from 'react';

interface MatchMediaResult {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

const useMatchMedia = (): MatchMediaResult => {
    const screens = ['isMobile', 'isTablet', 'isDesktop'] as const;
    const queries = [
        '(max-width: 768px)',
        '(min-width: 769px) and (max-width: 992px)',
        '(min-width: 993px)',
    ];

    const mediaQueriesList = queries.map(matchMedia);

    const matches = (): boolean[] => mediaQueriesList.map((mql) => mql.matches);
    const [values, setValues] = useState<boolean[]>(matches);

    useLayoutEffect(() => {
        const handler = () => setValues(matches);
        mediaQueriesList.forEach((mql) =>
            mql.addEventListener('change', handler)
        );
        return () =>
            mediaQueriesList.forEach((mql) =>
                mql.removeEventListener('change', handler)
            );
    });

    return screens.reduce(
        (acc, screen, index) => ({
            ...acc,
            [screen]: values[index],
        }),
        {} as MatchMediaResult
    );
};

export default useMatchMedia;
