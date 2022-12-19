import { FC, ReactNode } from 'react';
import './FormsControls.css';

type FormControlPropsType = {
    meta: {
        touched: boolean
        error: string
    }
}

export const Element: FC<FormControlPropsType> = ({ meta: {touched, error}, ...props }) => { //* Все інше крім meta залишиться у props
    const hasError = touched && error;
    
    return (
        <div className={hasError ? 'form__control_error' : ''}>
            <div>
                {/* @ts-ignore */}
                <props.elementType {...props.input} {...props} />
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}