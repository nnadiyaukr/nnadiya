import { authValidateSchemaConfig } from '@config/authValidateSchema.config';
import type { InitialFormStateType } from '@config/authType.config';
import { ValidationError } from 'yup';

type ValidationErrorsType = Partial<Record<keyof InitialFormStateType, string>>;

export async function validateField(field: string, data: InitialFormStateType) {
    try {
        const res = await authValidateSchemaConfig.validateAt(field, data);
        if (res) {
            return '';
        }
    } catch (e) {
        if (e instanceof ValidationError) {
            return e.message;
        }
    }
}
export async function validateAll(
    data: InitialFormStateType
): Promise<ValidationErrorsType> {
    try {
        await authValidateSchemaConfig.validate(data, {
            abortEarly: false,
        });
        return {};
    } catch (error) {
        if (error instanceof ValidationError) {
            return error.inner.reduce((acc, validationError) => {
                if (validationError.path && validationError.path in data) {
                    const fieldName =
                        validationError.path as keyof InitialFormStateType;
                    acc[fieldName] = validationError.message;
                }
                return acc;
            }, {} as ValidationErrorsType);
        }
        return {};
    }
}
