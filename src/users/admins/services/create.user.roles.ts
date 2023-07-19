import { ControllerArgs, HttpStatus } from "src/core";
import { UserRoles } from "../../../users";


export class FindRoles {
    constructor(private readonly dbUserRoles: typeof UserRoles){}

    //@ts-nocheck
    // find = async () => {

    //     const userRoles = await this.dbUserRoles.findAll();

    //     return {
    //         code: HttpStatus.CREATED,
    //         message: "All roles",
    //         data: userRoles.map((role: UserRoles) => {
    //             return {
    //                 id: role.role_id,
    //                 name: role.name,
    //                 createdAt: role.created_at,
    //             }
    //         })
    //     }
    // }
}