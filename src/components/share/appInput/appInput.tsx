import classes from './appInput.module.scss';
import type { FC } from 'react';
import classNames from '@/shared/lib/classNames';

interface IAppInput {
    value: string;
    name: string;
    placeholder: string;
    onChange: (value: string) => void;
}

export const AppInput: FC<IAppInput> = ({
    value,
    name,
    placeholder,
    type,
    onChange,
                                            additionalStyles
}) => {
    const handleChange = (target) => {
        const { name, value } = target;
        return onChange(name, value);
    };
    return (
        <div className={classNames(classes.appInput, {}, [additionalStyles])}>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={(e) => handleChange(e.target)}
            />
        </div>
    );
};
