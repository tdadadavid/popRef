import { NextFunction, Request, Response } from "express";

import { UnAuthorizedError } from "../../core";
import { Roles } from "../user.types.enum";


export const isArtist = async () => {
    return is(Roles.ARTIST);
}

export const isAdmin = async () => {
    return is(Roles.ADMIN);
}


const is  = async (role: Roles) => {
    return (req: Request, _: Response, next: NextFunction) => {
        if(req.user.role === role) next();
        throw new UnAuthorizedError('Access denied');
    }
}