import moment from "moment";

import { ControllerArgs, HttpStatus, UnAuthorizedError, compareHashedData, computeExpiryDate, config, generateToken } from "../../core";
import { User } from "../../users";


export class SignIn {
    constructor(private readonly db: typeof User) {}


    sign = async ({input}: ControllerArgs) => {

        const { email, password } = input;

        const user = (await this.db.scope('withPassword')
            .findOne({ where: { email } }))?.toJSON();
        if (!user) throw new UnAuthorizedError('Invalid login credentials');

        if(!user.isVerified) throw new UnAuthorizedError("User is unverified");

        const isValid = await compareHashedData(password, user.password!);
        if (!isValid) throw new UnAuthorizedError('Invalid login credentials');

        const accessToken = generateToken(
            { id: user.id, role: user.role },
            config.auth.accessTokenSecret,
            config.auth.accessTokenExpiresIn
        );
        const refreshToken = generateToken(
            { id: user.id, role: user.role },
            config.auth.refreshTokenSecret,
            config.auth.refreshTokenExpiresIn
        );

        delete user.password;


        return {
            code: HttpStatus.CREATED,
            message: "User signed in successfully",
            data: {
                user,
                tokens: {
                    accessToken,
                    accessTokenExpiresIn:
                        moment(computeExpiryDate(parseInt(config.auth.accessTokenExpiresIn))).toLocaleString(),
                    refreshToken,
                    refreshTokenExpiresIn:
                        moment(computeExpiryDate(parseInt(config.auth.refreshTokenExpiresIn))).toLocaleString()
                }
            },
        }
    }


}