import * as moment from "moment";

import { ControllerArgs, HttpStatus, UnAuthorizedError, compareHashedData, computeExpiryDate, config, generateToken } from "../../core";
import { User, UserRoles } from "../../users";


export class SignIn {
    constructor(
        private readonly db: typeof User,
        private readonly dbUserRoles: typeof UserRoles
    ) {}


    sign = async ({input}: ControllerArgs) => {

        const { email, password } = input;

        const user = (await this.db.scope('withPassword')
            .findOne({ where: { email } }))?.toJSON();
        if (!user) throw new UnAuthorizedError('Invalid login credentials');

        const userRole = await this.dbUserRoles.findOne({
            where: {
                role_id: user.role,
            }
        })

        const isValid = await compareHashedData(password, user.password!);
        if (!isValid) throw new UnAuthorizedError('Invalid login credentials');

        const now = Date.now();
        const accessTokenExpiresIn = moment(now).add(parseInt(config.auth.accessTokenExpiresIn), 'minutes');
        const accessToken = generateToken(
            { id: user.id, role: userRole.name },
            config.auth.accessTokenSecret,
            accessTokenExpiresIn.unix().toString()
        );
        
        const refreshTokenExpiresIn = moment(now).add(parseInt(config.auth.refreshTokenExpiresIn), 'hours')
        const refreshToken = generateToken(
            { id: user.id, role: userRole.name },
            config.auth.refreshTokenSecret,
            refreshTokenExpiresIn.unix().toString()
        );

        delete user.password;


        return {
            code: HttpStatus.CREATED,
            message: "User signed in successfully",
            data: {
                user,
                tokens: {
                    accessToken,
                    accessTokenExpiresIn: accessTokenExpiresIn.toString(),
                    refreshToken,
                    refreshTokenExpiresIn: refreshTokenExpiresIn.toString(),
                }
            },
        }
    }


}