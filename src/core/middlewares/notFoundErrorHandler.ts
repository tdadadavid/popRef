import { NextFunction, Request, Response } from "express";
import { RouteNotFoundError } from "../errors";



class NotFoundErrorHandler {
    handle = (req: Request, _: Response, next: NextFunction) => {
        next(new RouteNotFoundError(`request path "${req.path}" not found.`))
    }
}

export default new NotFoundErrorHandler;