//@ts-nocheck
import classes from './problemsTicket.module.scss';
import { AppInput } from '@/components/share/appInput';
import { useState } from 'react';

export const ProblemsTicket = () => {
    const [data, setData] = useState({
        fullName: '',
        feedbackType: '',
        text: '',
    });

    const handleChange = (name: string, value: string): void => {
        setData((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    return (
        <div className={classes.problems}>
            <div className="_container-default">
                <div className={classes.title}>Повідомити про проблему</div>
                <form className={classes.form}>
                    <AppInput
                        value={data.fullName}
                        name="fullName"
                        placeholder="ПІБ"
                        type="text"
                        additionalStyles={classes.input}
                        onChange={handleChange}
                    />
                    <AppInput
                        value={data.feedbackType}
                        name="feedbackType"
                        placeholder="Як зв'язатися з вами?"
                        type="text"
                        additionalStyles={classes.input}
                        onChange={handleChange}
                    />
                    <AppInput
                        value={data.text}
                        name="text"
                        placeholder="Опишіть проблему"
                        type="text"
                        additionalStyles={classes.input}
                        onChange={handleChange}
                    />
                </form>
            </div>
        </div>
    );
};
