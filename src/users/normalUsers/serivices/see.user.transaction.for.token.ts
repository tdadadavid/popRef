import { User } from "src/users/model";


// A project becomes a token
export class SeePersonalTransactionsForToken {
    constructor(
        private readonly dbUser: typeof User,
        
    ) {}

    see = async ({}) => {

    }
}