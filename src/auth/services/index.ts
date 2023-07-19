import { User, UserRoles } from "../../users";
import { CurrentUser } from "./current.user";
import { SignIn } from "./signIn.user";
import { SignUp } from "./signup.user";


const signIn = new SignIn(User, UserRoles);
const currentUser = new CurrentUser();
const signUp = new SignUp(User, UserRoles);

export {
    signIn,
    signUp,
    currentUser
}