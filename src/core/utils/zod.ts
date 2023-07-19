import { Schema } from 'zod';
import { BadRequestError } from '../errors';

export const zodValidate = (schema: Schema, obj: any) => {
    const result = schema.safeParse(obj);
    if (!result.success) throw new BadRequestError("Validation failed");
    return result.data;
}
