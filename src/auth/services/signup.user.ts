import { ConflictError, ControllerArgs, HttpStatus, hashData } from "../../core";
import { User, UserRoles } from "../../users";


export class SignUp {
    constructor(
        private readonly dbUser: typeof User,
        private readonly dbRoles: typeof UserRoles
    ){}

    signUp = async ({ input }: ControllerArgs) => {
        const { email,password, role} =  input;


        const userRole = await this.dbRoles.findOne({ where: { role_id: role } });
        if(!userRole) throw new ConflictError("Role not recognized");

        const userExists = await this.dbUser.findOne({ where: { email }});
        if(userExists) throw new ConflictError(`${userRole.name} with email already exists`);

        const hashPassword = await hashData(password);
        const data = {...input, password: hashPassword, role: userRole.role_id};

        const user = await this.dbUser.create(data);

        const result = user.toJSON();
        delete result.password;

        return {
            code: HttpStatus.CREATED,
            message: "User registered successfully",
            data: result
        }
    }
}