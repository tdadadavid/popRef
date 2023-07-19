import { ControllerArgs, HttpStatus } from "../../../core";
import { UserRoles } from "../..";


export class CreateRole {
    constructor(private readonly dbUserRoles: typeof UserRoles){}

    create = async ({ input }: ControllerArgs) => {

        const userRoles = await this.dbUserRoles.create({
            name: input.name,
        });

        return {
            code: HttpStatus.CREATED,
            message: "Role created",
            data: userRoles,
        }
    }
}