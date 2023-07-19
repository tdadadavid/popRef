import { HttpStatus } from "src/core";
import { UserRoles } from "../../../users/model";


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