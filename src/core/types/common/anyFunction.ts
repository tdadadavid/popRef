import { ZodTypeAny } from "zod";

export type AnyFunction = (...args: any[]) => any;

//TODO: work on creating the typed version.
export type TypedFunction = <T extends ZodTypeAny>(...args: T['_input']['shape']) => any;