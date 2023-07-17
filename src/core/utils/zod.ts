import { SomeZodObject } from 'zod';
import { BadRequestError } from '../errors';

export const zodValidate = (schema: SomeZodObject, obj: any) => {
    const result = schema.safeParse(obj);
    if (!result.success) throw new BadRequestError("Validation failed");
    return result.data;
}
