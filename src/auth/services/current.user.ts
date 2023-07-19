import { Request, Response, NextFunction } from "express";

import { verifyToken,config,ForbiddenError,TokenUser, UnAuthorizedError } from "../../core";

export class CurrentUser {

    handle = async (req: Request, res: Response, next: NextFunction) => {
        const tokenHeader = req.get('Authorization') || req.get('x-Auth-Token');
 
        if (!tokenHeader) {
            throw new UnAuthorizedError("unathorized");
        }
        const token = tokenHeader.split(' ').pop() as string;
        let tokenDetails;
        try {
            tokenDetails = verifyToken(token, config.auth.accessTokenSecret);
        } catch (err : any) {
            req.user = null;
            const error = new ForbiddenError(err.message);
            return next(error);
        }

        const user: TokenUser = tokenDetails.user;
        req.user = user;
        next();
    }
}