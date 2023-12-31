import { Response, Request, NextFunction } from "express";

import { HttpStatus, zodValidate, parseControllerArgs } from "../utils";
import { AnyFunction, ExpressCallbackFunction, ValidationSchema } from "../types";
import { UnProcessableError } from "../errors";


export class ControllerHandler {

    handle = (controllerFn: AnyFunction, schema: ValidationSchema | undefined = {}): ExpressCallbackFunction => {
        return async (req: Request, res: Response, next: NextFunction) => {
            const controllerArgs = parseControllerArgs.parse(req);
            const { input, params, query } = controllerArgs;
    
            try {
                if (schema) {
                    const { querySchema, paramsSchema, inputSchema } = schema;
                    
                    try {
                        if (inputSchema)
                            zodValidate(inputSchema, input);
                        if (querySchema)
                            zodValidate(querySchema, query);
                        if (paramsSchema)
                            zodValidate(paramsSchema, params);
                    } catch (error : any) {                        
                        throw new UnProcessableError(
                            error.message.replaceAll('\"', '')
                        );
                    }
                }
                
                const controllerResult = await controllerFn(controllerArgs);
                if (!controllerResult) {
                    res.status(HttpStatus.OK).send({ status: true });
                    return;
                };
    
                const { code, ...data } = controllerResult;
                res.status(code ?? HttpStatus.OK).send(data);
            } catch (error) {
                next(error)
            }
        }
    
    }

}

