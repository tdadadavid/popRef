import { HttpStatus } from "../../../core";
import { UserRoles } from "../../../users";


export class ViewRoles {
    constructor(private readonly dbUserRoles: typeof UserRoles){}

    view = async () => {
        const allRoles = await this.dbUserRoles.findAll();

        return {
            code: HttpStatus.OK,
            message: "All roles",
            data: allRoles,
        }
    }
}